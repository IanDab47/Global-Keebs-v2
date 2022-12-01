const express = require('express');
const router = express.Router();
const db = require('../models');
const { sequelize } = require('../models');
const { Op } = require('sequelize');

router.get('/', async (req, res) => {
  const searchValue = req.query.search || '';
  const filterValue = req.query.filter || '';
  const locationValue = req.query.location || '';

  console.log(filterValue);
  const upcoming = ['INTEREST CHECK', 'GROUP BUY'];

  const list = await db.listing.findAll({
    where: {
      self_text: { [Op.iLike]: `%${searchValue}%` },
      flair_text: {
        [Op.or]: {
          [Op.iLike]: `%${filterValue}%`,
          [Op.in]: upcoming,
        },
      },
      location: { [Op.iLike]: `${locationValue}%` },
    },
    order: [[sequelize.col('created_utc'), 'DESC']],
    limit: 30,
  });
  res.json(list);
});

module.exports = router;
