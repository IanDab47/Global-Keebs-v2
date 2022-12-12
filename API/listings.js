const express = require('express');
const router = express.Router();
const db = require('../models');
const { sequelize } = require('../models');
const { Op } = require('sequelize');

router.get('/', async (req, res) => {
  const pageNumber = req.query.page || 0;
  const searchValue = req.query.search || '';
  let filterValue = req.query.filter.includes(',')
    ? req.query.filter.split(',')
    : [req.query.filter] || [''];
  let locationValue = req.query.location.includes(',')
    ? req.query.location.split(',')
    : [req.query.location] || [''];

  filterValue = filterValue.map((category) => {
    return {
      flair_text: {
        [Op.iLike]: '%' + category + '%',
      },
    };
  });

  locationValue = locationValue.map((locale) => {
    return {
      location: {
        [Op.iLike]: locale + '%',
      },
    };
  });

  console.log([...filterValue, ...locationValue]);

  const list = await db.listing.findAll({
    where: {
      self_text: { [Op.iLike]: `%${searchValue}%` },
      [Op.and]: {
        [Op.and]: {
          [Op.or]: filterValue,
        },
        [Op.or]: {
          [Op.or]: locationValue,
        },
      },
    },
    order: [[sequelize.col('created_utc'), 'DESC']],
    offset: 30 * pageNumber,
    limit: 30,
  });

  // console.log(list[0]);

  res.json(list);
});

router.get('/:pageId', async (req, res) => {
  try {
    const listing = await db.listing.findOne({
      where: { page_id: req.params.pageId },
      include: [db.timestamp],
    });

    res.json(listing);
  } catch (err) {
    console.warn(err);
  }
});

module.exports = router;
