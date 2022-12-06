require('dotenv').config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const APIRouter = require('./API/index');
const loadImage = require('./API/image');
const checkListings = require('./Util/listing');

const app = express();

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

// Major Fetch
checkListings()
setInterval(checkListings, 60_000);

// BACKEND ROUTES
app.use('/src', loadImage);
app.use('/api/v1', APIRouter);

// ACCESS FRONTEND
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`You have entered financial 💲 discomfort on port ${PORT}`);
});
