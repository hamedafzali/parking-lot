import QR from "./QR";

const Ticket = ({ timestamp, ticketNumber }) => {
  var date = new Date(timestamp);

  return (
    <div className="ticket-container">
      <div className="ticket-right">
        <div>Parking Ticket</div>
        <div>Date:{timestamp}</div>
        {/* <div>Time:{date.getTime()}</div> */}
        <div>Gate:One</div>
      </div>

      <QR value={ticketNumber} scale={12} />
    </div>
  );
};

export default Ticket;
