// Change date format to YYYY-MM-DD from object
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

// Change date string order to DD/MM/YYYY
export function changeDateStrOrder(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

// Change date string order to YYYY-MM-DD
export function changeDateToYYYMMDD(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
}

// Change date format to DD/MM/YYYY from string

export function changeDateFromString(dateString: string) {
  const date = new Date(dateString);

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
}
