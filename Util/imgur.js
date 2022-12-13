const axios = require('axios');
require('dotenv').config();

const options = {
  headers: {
    Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
  },
};

const fetchAlbumImages = async (albumHash) => {
  const url = `https://api.imgur.com/3/album/${albumHash}/images`;
  const response = await axios.get(url);

  return response.data.data.map((image) => image.link);
};

module.exports = fetchAlbumImages;
