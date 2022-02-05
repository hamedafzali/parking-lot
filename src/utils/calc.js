export function getFreePlaces(arr) {
  const res = arr.map((item, index) => item === 1 && index);
  return res.filter((i) => i !== false);
}
export function getALLPlaces(arr) {
  const res = arr.map((item, index) => item !== 0 && index);
  return res.filter((i) => i !== false);
}
export function calcTicketNumber(parkingNo) {
  const ticketNumber = `${parkingNo.toString().padStart(3, "0")}${Date.now()}`;
  return ticketNumber;
}
