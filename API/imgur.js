const express = require('express');
const db = require('../models');
const {
  grabImgurId,
  fetchImgurImage,
  fetchAlbumImages,
  createTimestampFile,
} = require('../Util/imgur');
const router = express.Router();

router.get('/image/:url/:listingId', async (req, res) => {
  const url = req.params.url || 'BAD REQUEST';
  const listingId = req.params.listingId || 'BAD REQUEST';

  // Send Error if bad request
  (url === 'BAD REQUEST' || listingId == 'BAD REQUEST') &&
    res.json({ message: url });

  try {
    // Grab image file from imgur post
    const imageHash = grabImgurId(url);
    const imageFile = await fetchImgurImage(imageHash);

    // Update listing with new file
    const timestampModel = await createTimestampFile(imageFile);
    const listingModel = await db.listing.findByPk(listingId);
    listingModel.addTimestamp(timestampModel);

    res.json({ message: 'SUCCESS!' });
  } catch (err) {
    console.warn('ERROR DURING IMAGE REQUEST', err);
  }
});

router.get('/album/:url/:listingId', async (req, res) => {
  const url = req.params.url || 'BAD REQUEST';
  const listingId = req.params.listingId || 'BAD REQUEST';

  // Send Error if bad request
  (url === 'BAD REQUEST' || listingId == 'BAD REQUEST') &&
    res.json({ message: url });

  try {
    // Grab image files from imgur album
    const albumHash = grabImgurId(url);
    const imageFiles = await fetchAlbumImages(albumHash);

    // Update listing with new files
    const timestampModels = await Promise.all(
      imageFiles.map((imageFile) => createTimestampFile(imageFile))
    );
    const listingModel = await db.listing.findByPk(listingId);
    timestampModels.map((timestampModel) =>
      listingModel.addTimestamp(timestampModel)
    );

    res.json({ message: 'SUCCESS!' });
  } catch (err) {
    console.warn('ERROR DURING ALBUM REQUEST', err);
  }
});

module.exports = router;
