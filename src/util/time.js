export const setTime = () => Date.now();

export const timeSincePost = (currTime, time) => {
  let timeString = '';
  const timeDiff = Math.floor((currTime - time * 1000) / 1000);

  // conv timeDiff to each unit of time
  const sec = timeDiff % 60;
  const min = Math.floor(timeDiff / 60) % 60;
  const hour = Math.floor(timeDiff / (60 * 60)) % 24;
  const day = Math.floor(timeDiff / (60 * 60 * 24)) % 30;
  const month = Math.floor(timeDiff / (60 * 60 * 24 * 30)) % 12;

  // return string based on time
  if (month > 0) {
    if (month === 1) return (timeString = `${month} month ago`);
    return (timeString = `${month} months ago`);
  }
  if (day > 0) {
    if (day === 1) return (timeString = `${day} day ago`);
    return (timeString = `${day} days ago`);
  }
  if (hour > 0) {
    if (hour === 1) return (timeString = `${hour} hour ago`);
    return (timeString = `${hour} hours ago`);
  }
  if (min > 0) {
    if (min === 1) return (timeString = `${min} minute ago`);
    return (timeString = `${min} minutes ago`);
  }
  if (sec > 0) {
    if (sec === 1) return (timeString = `${sec} second ago`);
    return (timeString = `${sec} seconds ago`);
  }

  return 'Bad Time 💀';
};
