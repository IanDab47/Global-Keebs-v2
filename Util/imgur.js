require('dotenv').config();
const axios = require('axios');
const db = require('../models');

const options = {
  headers: {
    Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
  },
};

const createTimestampFile = async (url) => {
  try {
    const [timestamp, created] = await db.timestamp.findOrCreate({
      where: {
        url: url,
      },
      defaults: {
        type: 'FILE',
        status: 'NONE',
      },
    });

    const [columns, [newTimestamp]] = !created
      ? await db.listing.update({
          type: 'FILE',
          status: 'NONE',
          where: {
            url: url,
          },
        })
      : [0, timestamp];

    return newTimestamp;
  } catch (err) {
    console.warn('ERROR DURING TIMESTAMP FILE CREATION:', err);
  }
};

const fetchAlbumImages = async (albumHash) => {
  try {
    const url = `https://api.imgur.com/3/album/${albumHash}`;
    const response = await axios.get(url, options);

    return response.data.data.images.map((image) => image.link);
  } catch (err) {
    console.warn('ERROR DURING ALBUM API REQ:', err);
  }
};

const fetchImgurImage = async (imageHash) => {
  try {
    const url = `https://api.imgur.com/3/image/${imageHash}`;
    const response = await axios.get(url, options);

    return [response.data.data.link];
  } catch (err) {
    console.warn('ERROR DURING IMAGE API REQ:', err);
  }
};

const grabImgurId = (link, type) => {
  const re_albumHash = /.+gallery\/|.+\/a\//;
  const re_imageHash = /.+com\//;

  const hash =
    type === 'IMAGE'
      ? link.replace(re_imageHash, '')
      : link.replace(re_albumHash, '');

  return hash;
};

module.exports = {
  grabImgurId,
  fetchAlbumImages,
  fetchImgurImage,
  createTimestampFile,
};
