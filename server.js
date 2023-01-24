require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const APIRouter = require('./API/index');
const loadImage = require('./API/image');
const { fetchReddit, minorFetch } = require('./Util/listing-v2');

// Major Fetch
fetchReddit();
setInterval(minorFetch, 300_000);

// // ACCESS FRONTEND
// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

const PORT = process.env.PORT || 5000;

async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === 'production'
) {
  const app = express();
  const DEV_INDEX_PATH = root + '/';
  const PROD_INDEX_PATH = root + '/dist';

  if (isProd) {
    app.use('/', express.static(PROD_INDEX_PATH));
  } else {
    app.use('/', express.static(DEV_INDEX_PATH));
  }

  console.log('Production ENV is: ', isProd);

  app.use(cors({ credentials: true, origin: true }));
  app.use(morgan('dev'));

  // BACKEND ROUTES
  app.use('/src', loadImage);
  app.use('/api/v1', APIRouter);

  // ACCESS FRONTEND
  app.get('/*', (_req, res) => {
    const htmlFile = path.join(
      __dirname,
      'src',
      isProd ? 'index.html' : 'dev.html'
    );

    res.sendFile(htmlFile);
  });

  return { app };
}

createServer().then(({ app }) =>
  app.listen(PORT, () => {
    console.log(`You have entered financial 💲 discomfort on port ${PORT}`);
  })
);

module.exports = createServer;
