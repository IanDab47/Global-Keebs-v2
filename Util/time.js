const convUnix = (timestamp) => {
  const date = new Date(timestamp * 1000);

  const year = date.getFullYear();
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  return { sec, min, hour, day, month, months, year };
};

const makeDate = (timestamp) => {
  const time = convUnix(timestamp);

  return `${time.month} ${time.day}, ${time.year} - ${time.hour}:${time.min}:${time.sec}`;
};

const ageCheck = (timestamp) => {
  const twoMonths = 5270400000; // two months in milliseconds
  return timestamp * 1000 >= Date.now() - twoMonths ? true : false;
};

exports.convUnix = convUnix;
exports.makeDate = makeDate;
exports.ageCheck = ageCheck;
