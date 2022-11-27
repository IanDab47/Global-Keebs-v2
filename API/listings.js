const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', async (req, res) => {
  const list = await db.listing.findAll();
  // console.log(list);
  res.json(list);
});

module.exports = router;
