import QR from "./QR";

const Ticket = ({ ticketNumber, price }) => {
  const timestamp = ticketNumber.substring(3, 16);
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

  if (!ticketNumber.length) return <div className="ticket-container"></div>;
  return (
    <div className="ticket-container">
      {ticketNumber.length && (
        <>
          <div className="ticket-right">
            <div>Parking Ticket</div>
            <div>{date.toLocaleDateString("de-DE", options)}</div>

            <div>Ticket Number: {ticketNumber}</div>
            <div>Parking Number: {ticketNumber.substring(1, 3)}</div>

            <div className="ticket-price">Price: €{price}</div>
          </div>

          <QR value={ticketNumber} scale={11} />
        </>
      )}
    </div>
  );
};

export default Ticket;
