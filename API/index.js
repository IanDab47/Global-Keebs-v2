const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    project: "Vite/React and Express Global Keebs",
    from: "IanDab47",
    message: "Hello Backend! 👋",
  });
});

// router.get("/src", imageRegex, (req, res) => {
//   const filePath = req.path;
//   res.redirect(303, `http://localhost:3000/src${filePath}`);
// });

module.exports = router;
