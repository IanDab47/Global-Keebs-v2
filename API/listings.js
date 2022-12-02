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
  let locationValue = req.query.location.includes(',')
    ? req.query.location.split(',')
    : [req.query.location] || [''];
  locationValue = locationValue.map((locale) => locale + '%');

  // console.log(
  //   locationValue + '%',
  //   ...locationValue.map((locale) => locale + '%')
  // );

  const list = await db.listing.findAll({
    where: {
      self_text: { [Op.iLike]: `%${searchValue}%` },
      [Op.or]: filterValue.map((category) => {
        return {
          location: {
            [Op.iLike]: '%' + category + '%',
          },
        };
      }),
      [Op.or]: locationValue.map((locale) => {
        return {
          location: {
            [Op.iLike]: locale + '%',
          },
        };
      }),
    },
    order: [[sequelize.col('created_utc'), 'DESC']],
    limit: 30,
  });

  console.log(list[0]);

  res.json(list);
});

module.exports = router;
