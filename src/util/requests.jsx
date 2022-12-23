import axios from 'axios';



const checkForExistingURL = (linkArr, url) => {
  let urlExists = false;

  linkArr.map((data) => {
    data.url.includes(url) ? (urlExists = true) : null;
  });

  return urlExists;
};



export const fetchImageFiles = async (timestamps) => {
  const arrayOfLinks = [];

  try {
    const imageFiles = await Promise.all(
      timestamps.map(async (timestamp) => {
        const splitURL = timestamp.url.split('/');
        const hash = encodeURIComponent(
          splitURL[splitURL.length - 1] || splitURL[splitURL.length - 2]
        );

        try {
          const imagePromise =
            timestamp.type === 'FILE'
              ? {
                  data: { url: timestamp.url, type: 'FILE' },
                }
              : timestamp.type === 'IMAGE'
              ? await axios.get(
                  `/api/v1/imgur/image/${hash}/${timestamp.listingId}`
                )
              : await axios.get(
                  `/api/v1/imgur/album/${hash}/${timestamp.listingId}`
                );

          return imagePromise;
        } catch (err) {
          console.warn('ERROR DURING TIMESTAMP MAP:', err);
        }
      })
    );

    imageFiles.map((file) =>
      typeof file.data.url === 'string'
        ? !checkForExistingURL(arrayOfLinks, file.data.url) &&
          arrayOfLinks.push(file.data)
        : file.data.albumModel || file.data.imageModel
        ? null
        : file.data.imageFile
        ? !checkForExistingURL(arrayOfLinks, file.data.imageFile.url) &&
          arrayOfLinks.push(file.data.imageFile)
        : file.data.imageFiles.map((fetchedFile) =>
            !checkForExistingURL(arrayOfLinks, fetchedFile.url)
              ? arrayOfLinks.push(fetchedFile)
              : null
          )
    );

    return arrayOfLinks;
  } catch (err) {
    console.warn('ERROR DURING IMAGE FETCH:', err);
  }
};
