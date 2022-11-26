require('dotenv').config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

const APIRouter = require('./API/index');
const loadImage = require('./API/image');

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

// BACKEND ROUTES
app.use('/src', loadImage);
app.use('/api/v1', APIRouter);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`You have entered financial 💲 discomfort on port ${PORT}`);
});
