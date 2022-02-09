import { calculatePrice, getTicketStatus } from "../../utils/calc";
import QR from "./QR";
import { formatDate } from "./../../utils/convert";

const Ticket = ({ item, scale }) => {
  if (!item && item.length) return <div className="ticket-container"></div>;
  return (
    <div className="ticket-container">
      {item.ticketNumber && (
        <>
          <div
            className="ticket-right"
            onClick={() =>
              item && item.setteledTimestamp
                ? getTicketStatus(item) < 16
                  ? window.alert(
                      `Exit is Permitted in ${
                        15 - getTicketStatus(item)
                      } minutes`
                    )
                  : window.alert("Exit is Forbidden")
                : null
            }
          >
            <div>
              {item && item.setteledTimestamp
                ? "Parking Receipt"
                : "Parking Ticket"}
            </div>
            <div>{formatDate(item.ticketNumber.substring(3, 16))}</div>

            <div>Ticket Number: {item.ticketNumber}</div>
            <div>Parking Number: {item.ticketNumber.substring(1, 3)}</div>
            {item.setteledTimestamp ? (
              <div>Pay Date: {formatDate(item.setteledTimestamp)}</div>
            ) : null}

            <div className="ticket-price">
              {item.price
                ? `Payed €${item.price} by ${item.type} `
                : `Price €${calculatePrice(item.ticketNumber, item)}`}
            </div>
          </div>
          {scale && <QR value={item.ticketNumber} scale={scale} />}
        </>
      )}
    </div>
  );
};

export default Ticket;
