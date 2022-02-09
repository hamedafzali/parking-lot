export function formatDate(timestamp) {
  var date = new Date(parseInt(timestamp));
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return date.toLocaleDateString("de-DE", options);
}
