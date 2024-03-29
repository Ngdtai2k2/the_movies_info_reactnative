import translate from 'translate';

export async function translateEnglishToVietnamese(text, setTranslated) {
  const translatedText = await translate(text, { to: 'vi' });
  setTranslated(translatedText);
}

export const calculateAge = (birthday, deathday) => {
  const birthdate = new Date(birthday);
  const currentDate = deathday ? new Date(deathday) : new Date(); 
  const age = currentDate.getFullYear() - birthdate.getFullYear();
  const monthDifference = currentDate.getMonth() - birthdate.getMonth();

  return (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthdate.getDate()))
    ? age - 1
    : age;
}
