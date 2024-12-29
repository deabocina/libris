export const getFormattedDate = (publishedDate: string) => {
  const pbDate = new Date(publishedDate);

  const day = pbDate.getDate().toString().padStart(2, "0");
  const month = (pbDate.getMonth() + 1).toString().padStart(2, "0");
  const year = pbDate.getFullYear();

  return `${day}.${month}.${year}.`;
};
