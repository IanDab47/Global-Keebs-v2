const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    project: 'Vite/React and Express Global Keebs',
    from: 'IanDab47',
    message: 'Hello Backend! 👋',
  });
});

module.exports = router;
