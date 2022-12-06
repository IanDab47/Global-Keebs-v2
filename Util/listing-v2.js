const axios = require('axios');

const apiURL = 'https://www.reddit.com/r/mechmarket/?size=30.json';

const fetchReddit = async () => {
  try {
    const response = await axios.get(apiURL);
    console.log(response.data);
  } catch (err) {
    console.warn(err);
  }
};
fetchReddit();
