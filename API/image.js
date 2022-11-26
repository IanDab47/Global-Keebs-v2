const express = require('express');
const router = express.Router();

const imageRegex = /\/.+\.(svg|png|jpg|png|jpeg)$/;

router.get(imageRegex, (req, res) => {
  const filePath = req.path;
  res.redirect(303, `http://localhost:3000/src${filePath}`);
});

module.exports = router;
