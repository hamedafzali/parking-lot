export function getFreePlaces(parkingMap, ticket) {
  if (!ticket || !ticket.length)
    return parkingMap.filter((i) => i.type === "Parking");
  const activeTickets = ticket.filter((i) => !i.setteledTimestamp);
  const res = [];
  parkingMap
    .filter((i) => i.type === "Parking")
    .forEach((p) => {
      if (!activeTickets.filter((t) => p.no === t.no).length) res.push(p);
    });

  return res;
}
export function getALLPlaces(arr) {
  return arr.filter((item) => item.type === "Parking");
}
export function getSelectedPlaces(arr) {
  const selected = arr.filter((item) => item.selected === true)[0];
  return !selected ? [] : selected;
}
export function getTicket(parkingNo) {
  const ticketNumber = `${parkingNo.toString().padStart(3, "0")}${Date.now()}`;
  return ticketNumber;
}
export function calculatePrice(barcode, item) {
  if (item.setteledTimestamp) return 0;
  const diff = Date.now() - barcode.substring(3, 16);
  const baseAmount = 2;
  var diffHrs = Math.floor((diff % 86400000) / 3600000) + 1;
  return diffHrs * baseAmount;
}
export function getTicketStatus(item) {
  const diff = Date.now() - item.setteledTimestamp;
  var diffMins =
    Math.floor((diff % 86400000) / 3600000) * 60 +
    Math.floor(((diff % 86400000) % 3600000) / 60000);
  return diffMins;
}
