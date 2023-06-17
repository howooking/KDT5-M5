export function priceBeforeDiscount(price: number, discountRate: number) {
  return (
    Math.ceil((price * 100) / (100 - discountRate) / 1000) * 1000
  ).toLocaleString('ko-KR');
}

export function convertToMilliseconds(dateString: string) {
  // Convert string to Date object
  const date = new Date(dateString);

  // Get timestamp in milliseconds
  const timestampMs = date.getTime();

  return timestampMs;
}

export function convertToHumanReadable(dateString: string) {
  // Convert string to Date object
  const date = new Date(dateString);

  // Extract date components
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are zero-based
  const day = date.getDate();

  // Extract time components
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Format the date and time
  const formattedDate = `${year}.${month.toString().padStart(2, '0')}.${day
    .toString()
    .padStart(2, '0')}`;
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;

  // Combine the formatted date and time
  const humanReadableDateTime = `${formattedDate} / ${formattedTime}`;

  return humanReadableDateTime;
}
