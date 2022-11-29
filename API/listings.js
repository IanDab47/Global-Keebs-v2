const express = require('express');
const router = express.Router();
const db = require('../models');
const { sequelize } = require('../models');

router.get('/', async (req, res) => {
  const list = await db.listing.findAll({
    order: [[sequelize.col('created_utc'), 'DESC']],
    limit: 100,
  });
  res.json(list);
});

module.exports = router;
