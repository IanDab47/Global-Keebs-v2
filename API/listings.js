const express = require('express');
const router = express.Router();
const db = require('../models');
const { sequelize } = require('../models');
const { Op } = require('sequelize');

router.get('/', async (req, res) => {
  const searchValue = req.query.search || '';
  const filterValue = req.query.filter || '';
  const locationValue = req.query.location || '';

  const upcoming = ['group buy', 'interest check'];

  const list = await db.listing.findAll({
    where: {
      self_text: { [Op.iLike]: `%${searchValue}%` },
      flair_text: { [Op.iLike]: `%${filterValue}%` },
      location: { [Op.iLike]: `${locationValue}%` },
    },
    order: [[sequelize.col('created_utc'), 'DESC']],
    limit: 30,
  });
  res.json(list);
});

module.exports = router;
