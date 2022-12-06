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
  const month = months[date.getMonth()].padStart(2, '0');
  const day = toString(date.getDate()).padStart(2, '0');
  const hour = toString(date.getHours()).padStart(2, '0');
  const min = toString(date.getMinutes()).padStart(2, '0');
  const sec = toString(date.getSeconds()).padStart(2, '0');
  console.log(sec, min, hour, day, month, months, year);

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
