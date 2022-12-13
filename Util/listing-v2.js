const axios = require('axios');
const db = require('../models');
const time = require('./time');

const apiURL = 'https://www.reddit.com/r/mechmarket/new/.json?limit=100';

const getLocation = (title, flair) => {
  const re_local = /\[([^\]]+)\]/;
  const titleText = re_local.exec(title) || ['ha', null];
  const location = !titleText[1]
    ? ''
    : !flair.toLowerCase().includes('buy') &&
      !flair.toLowerCase().includes('sell') &&
      !flair.toLowerCase().includes('trad')
    ? flair
    : titleText[1];

  return location;
};

const replacePattern = (patterns, text, fill = '', filter = null) => {
  let newText = text;
  filter
    ? patterns.map(
        (pattern) =>
          (newText =
            pattern !== undefined &&
            pattern.includes(filter) &&
            pattern.includes('(')
              ? newText.replace(pattern, fill)
              : newText)
      )
    : patterns.map((pattern) => (newText = newText.replace(pattern[0], fill)));

  return newText;
};

const findTimestamps = (text) => {
  const re_imgur = /\(http([^)]+)\)|http.+imgu\S+/g;
  let timestamps = [];

  let timestampFetch = [...text.matchAll(re_imgur)];

  // Filter for imgur links
  timestampFetch.map((timestamp) =>
    timestamp.map((pattern) =>
      pattern !== undefined &&
      pattern.includes('imgu') &&
      !pattern.includes('http')
        ? timestamps.push('http' + pattern)
        : null
    )
  );

  // Remove timestamp from text
  const [self_text] =
    timestampFetch.length > 0
      ? timestampFetch.map((timestamp) =>
          replacePattern(timestamp, text, '', 'img')
        )
      : [text];

  return { self_text, timestamps };
};

const formatSelfText = (text) => {
  // Find and remove timestamps from text
  let { self_text, timestamps } = findTimestamps(text);

  // Remove all &amp; patterns
  const re_linePattern = /&amp\S;|&amp;|&\S+;/g;
  const checkLinePattern = [self_text.matchAll(re_linePattern)];
  self_text =
    checkLinePattern.length > 0
      ? replacePattern(checkLinePattern, self_text)
      : self_text;

  // Replace all '\n' with <br>
  self_text = self_text.replaceAll('\n', '<br>');

  return { self_text, timestamps };
};

const saveData = async (data) => {
  const author = data.author;
  const author_ref = data.author_fullname;
  const created_utc = data.created_utc;
  const downs = data.downs;
  const flair_text = data.link_flair_text.toUpperCase() || 'N/A';
  const location = getLocation(data.title, flair_text);
  const page_id = data.id || null;
  const page_name = data.name;
  const { self_text, timestamps } = formatSelfText(data.selftext);
  const title = data.title;
  const ups = data.ups;
  const upvote_ratio = data.upvote_ratio;
  const url = data.url;

  // Custom Date format
  const date = time.makeDate(created_utc);

  try {
    const timestampPromises = timestamps.map(async (timestamp) => {
      const type =
        timestamp.includes('.jpg') ||
        timestamp.includes('.jpeg') ||
        timestamp.includes('.png') ||
        timestamp.includes('.mp4')
          ? 'FILE'
          : !timestamp.includes('/gallery/') && !timestamp.includes('/a/')
          ? 'IMAGE'
          : 'ALBUM';

      try {
        const [createdTimestamp, created] = await db.timestamp.findOrCreate({
          where: {
            url: timestamp,
          },
          defaults: {
            type: type,
            status: timestamp === 'FILE' ? 'NONE' : 'CLOSED',
          },
        });

        const [updatedColumnsAmount, [updatedTimestamp]] = !created
          ? await db.timestamp.update(
              {
                url: timestamp,
                type: type,
                status: timestamp === 'FILE' ? 'NONE' : 'CLOSED',
              },
              {
                where: {
                  id: createdTimestamp.id,
                },
                returning: true,
              }
            )
          : [0, [createdTimestamp]];

        return updatedTimestamp;
      } catch (err) {
        console.warn('ERROR DURING FETCH CREATION OF TIMESTAMP:', err);
      }
    });

    const timestampModels = await Promise.all(timestampPromises);

    const [newListing, created] = await db.listing.findOrCreate({
      where: {
        page_id: page_id,
      },
      defaults: {
        author: author,
        author_ref: author_ref,
        created_utc: created_utc,
        date: date,
        downs: downs,
        flair_text: flair_text,
        location: location,
        page_name: page_name,
        self_text: self_text,
        title: title,
        ups: ups,
        upvote_ratio: upvote_ratio,
        url: url,
      },
    });

    const [columnsUpdated, [updatedListing]] = !created
      ? await db.listing.update(
          {
            author: author,
            author_ref: author_ref,
            created_utc: created_utc,
            date: date,
            downs: downs,
            flair_text: flair_text,
            location: location,
            page_name: page_name,
            self_text: self_text,
            title: title,
            ups: ups,
            upvote_ratio: upvote_ratio,
            url: url,
          },
          {
            where: {
              page_id: page_id,
            },
            returning: true,
          }
        )
      : [0, [newListing]];

    timestampModels.length &&
      timestampModels.map(async (timestampModel) => {
        await updatedListing.addTimestamp(timestampModel);
      });
  } catch (err) {
    console.warn('ERROR DURING FETCH MODEL CREATION', err);
  }
};

const nextPage = async (nextId) => {
  try {
    await fetchReddit('major', `${apiURL}&after=${nextId}`);
  } catch (err) {
    console.warn('ERROR RETRIEVING NEXT PAGE:', err);
  }
};

const fetchReddit = async (
  type = 'major',
  url = 'https://www.reddit.com/r/mechmarket/new/.json?limit=100'
) => {
  // DISPLAY API URL INFO IN LOG
  console.log(url);

  try {
    const response = await axios.get(url);
    const nextId = response.data.data.after;

    await response.data.data.children.map(async (listing, i) => {
      try {
        // Check if listing is valid
        listing.data.link_flair_text !== null ||
        listing.data.link_flair_text !== undefined
          ? await saveData(listing.data)
          : null;

        // Load next page if available
        if (
          i === response.data.data.dist - 1 &&
          (response.data.data.after === null || type === 'minor')
        ) {
          return console.log('Finished Requests!');
        } else if (i === response.data.data.dist - 1) {
          nextPage(nextId);
        }
      } catch (err) {
        console.warn(err);
      }
    });

    return;
  } catch (err) {
    console.warn('ERROR FETCHING DATA:', err);
  }
};

const minorFetch = () => {
  fetchReddit('minor');
};

module.exports = {
  fetchReddit,
  minorFetch,
};
