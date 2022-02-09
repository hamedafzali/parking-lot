import Ticket from "./Ticket";

const ReceiptList = ({ ticket }) => {
  return (
    <div className="ticket-machine-ticketlist">
      {ticket.map((i) =>
        i.setteledTimestamp ? <Ticket key={i.ticketNumber} item={i} /> : null
      )}
    </div>
  );
};

export default ReceiptList;
