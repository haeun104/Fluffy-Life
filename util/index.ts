export function getFormattedDate(date: Date) {
  let year = date.getFullYear();
  let month = String(date.getMonth() + 1);
  if (month.length < 2) {
    month = `0${month}`;
  }
  let day = String(date.getDate());
  if (day.length < 2) {
    day = `0${day}`;
  }

  return `${year}-${month}-${day}`;
}

export function changeDateStrOrder(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
