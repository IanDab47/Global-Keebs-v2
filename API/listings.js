const express = require('express');
const router = express.Router();
const db = require('../models');
const { sequelize } = require('../models');
const { Op } = require('sequelize');

router.get('/', async (req, res) => {
  const searchValue = req.query.search || '';
  const filterValue = req.query.filter.includes(',')
    ? req.query.filter.split(',')
    : [req.query.filter] || [''];
  const locationValue = req.query.location.includes(',')
    ? req.query.location.split(',')
    : [req.query.location] || [''];

  const list = await db.listing.findAll({
    where: {
      self_text: { [Op.iLike]: `%${searchValue}%` },
      [Op.or]: filterValue.map((category) => {
        return {
          flair_text: {
            [Op.iLike]: '%' + category + '%',
          },
        };
      }),
      [Op.and]: locationValue.map((locale) => {
        return {
          location: {
            [Op.iLike]: locale + '%',
          },
        };
      }),
    },
    order: [[sequelize.col('created_utc'), 'DESC']],
    offset: 30,
    limit: 30,
  });

  console.log(list[0]);

  res.json(list);
});

module.exports = router;
