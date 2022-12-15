require('dotenv').config();
const express = require('express');
const db = require('../models');
const { Op } = require('sequelize');
const {
  fetchImgurImage,
  fetchAlbumImages,
  createTimestampFile,
} = require('../Util/imgur');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Hiya! This route is working.' });
});

router.get('/oauth/callback', (req, res) => {});

router.get('/image/:hash/:listingId', async (req, res) => {
  const hash = req.params.hash || 'BAD REQUEST';
  const listingId = req.params.listingId || 'BAD REQUEST';

  // Send Error if bad request
  (hash === 'BAD REQUEST' || listingId === 'BAD REQUEST') &&
    res.json({ message: hash });

  try {
    const imageModel = await db.timestamp.findOne({
      where: {
        url: { [Op.like]: '%' + hash },
        type: 'IMAGE',
      },
    });
    if (imageModel.status === 'OPENED') return res.send({ imageModel });

    // Grab image file from imgur post
    const imageFile = await fetchImgurImage(hash);

    // Update listing with new file
    const timestampModel = await createTimestampFile(imageFile.url);
    const listingModel = await db.listing.findByPk(listingId);
    listingModel.addTimestamp(timestampModel);

    res.json({ imageFile });
  } catch (err) {
    console.warn('ERROR DURING IMAGE REQUEST', err);
    res.send({ message: 'ERROR DURING IMAGE REQUEST: ' + err });
  }
});

router.get('/album/:hash/:listingId', async (req, res) => {
  const hash = decodeURIComponent(req.params.hash) || 'BAD REQUEST';
  const listingId = req.params.listingId || 'BAD REQUEST';
  // Send Error if bad request
  (hash === 'BAD REQUEST' || listingId === 'BAD REQUEST') &&
    res.json({ message: hash });

  try {
    // Check if album is opened
    const albumModel = await db.timestamp.findOne({
      where: {
        url: { [Op.like]: '%' + hash },
        type: 'ALBUM',
      },
    });
    if (albumModel.status === 'OPENED') return res.send({ albumModel });

    // Grab image files from imgur album
    const imageFiles = await fetchAlbumImages(hash);

    // Update listing with new files
    const timestampModels = await Promise.all(
      imageFiles.map((imageFile) => createTimestampFile(imageFile.url))
    );
    const listingModel = await db.listing.findByPk(listingId);
    timestampModels.map((timestampModel) =>
      listingModel.addTimestamp(timestampModel)
    );

    res.send({ imageFiles });
    // res.send({ imageFiles, albumModel, timestampModels }); // Test send
  } catch (err) {
    console.warn('ERROR DURING ALBUM REQUEST', err);
    res.send({ message: 'ERROR DURING ALBUM REQUEST: ' + err });
  }
});

module.exports = router;
