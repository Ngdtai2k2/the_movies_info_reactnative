import translate from 'translate';

export const calculateAge = (birthday, deathday) => {
  const birthdate = new Date(birthday);
  // Sử dụng ngày mất nếu có, ngược lại sử dụng ngày hiện tại
  const currentDate = deathday !== null ? new Date(deathday) : new Date(); 
  const age = currentDate.getFullYear() - birthdate.getFullYear();
  const monthDifference = currentDate.getMonth() - birthdate.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthdate.getDate())) {
    //nếu chưa qua sinh nhật thì tuổi sẽ giảm đi 1
    return age - 1;
  } else {
    return age;
  }
}

export async function translateEnglishToVietnamese(text, setTranslated) {
  const translatedText = await translate(text, { to: 'vi' });
  setTranslated(translatedText);
}