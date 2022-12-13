const axios = require('axios');
require('dotenv').config();

const options = {
  headers: {
    Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
  },
};

const fetchAlbumImages = async (albumHash) => {
  const url = `https://api.imgur.com/3/album/${albumHash}`;
  const response = await axios.get(url, options);

  const dataArray = await response.data.data.images.map((image) => image.link);
  return dataArray;
};

const fetchImgurImage = async (imageHash) => {
  const url = `https://api.imgur.com/3/image/${imageHash}`;
  const response = await axios.get(url, options);

  return [response.data.data.link];
};

const grabImgurId = async (link) => {
  const re_albumHash = /.+gallery\/|.+\/a\//;
  const albumHash = link.replace(re_albumHash, '');

  if (!albumHash.includes('http')) return await fetchAlbumImages(albumHash);

  const re_imageHash = /.+com\//;
  const imageHash = link.replace(re_imageHash, '');

  return await fetchImgurImage(imageHash);
};

const fetchImageLinks = async (link) => {
  const array = await grabImgurId(link);

  return array || [''];
};

module.exports = {
  fetchImageLinks,
};
