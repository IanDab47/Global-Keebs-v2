const express = require('express');
const router = express.Router();
const listingsRoute = require('./listings');

router.use('/listings', listingsRoute);
// router.get('/listings', async (req, res) => {
//   try {
//     const list = await db.listings.findAll();
//     console.log(list);
//     res.json(list);
//   } catch (err) {
//     console.log(err);
//   }
// });

router.get('/', (req, res) => {
  res.json({
    project: 'Vite/React and Express Global Keebs',
    from: 'IanDab47',
    message: 'Hello Backend! 👋',
  });
});

module.exports = router;
