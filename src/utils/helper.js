
export const getRandomKey = (dataVideo, type, setKey) => {
  const keys = dataVideo.results
    .filter((video) => video.type === type)
    .map((video) => video.key);

  if (keys.length > 0) {
    const randomIndex = Math.floor(Math.random() * keys.length);
    const randomKey = keys[randomIndex];

    setKey([randomKey]);
  } else {
    setKey([]);
  }
};

export const calculateAge = (birthday, deathday) => {
  const birthdate = new Date(birthday);
  const currentDate = deathday !== null ? new Date(deathday) : new Date(); // Sử dụng ngày mất nếu có, ngược lại sử dụng ngày hiện tại
  const age = currentDate.getFullYear() - birthdate.getFullYear();
  const monthDifference = currentDate.getMonth() - birthdate.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthdate.getDate())) {
    //nếu chưa qua sinh nhật thì tuổi sẽ giảm đi 1
    return age - 1;
  } else {
    return age;
  }
}
