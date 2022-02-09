import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import parkingImage from "../../assets/images/parking.jpg";
import {
  getTicket,
  getALLPlaces,
  getFreePlaces,
  getSelectedPlaces,
  calculatePrice,
} from "../../utils/calc";
import Ticket from "./Ticket";
import {
  ticketIssued,
  systemInitialed,
  ticketSettled,
  ticketSelected,
} from "../../store/parking";
import getData from "../../services/parking";
import PayButton from "./PayButton";
import AppButton from "./AppButton";
import Summary from "./Summary";
import ReceiptList from "./ReceiptList";
const TicketMachine = () => {
  const dispatch = useDispatch();
  const { parkingMap, ticket } = useSelector((state) => state.parkingReducer);
  const freeplaces = getFreePlaces(parkingMap, ticket);
  const totalplaces = getALLPlaces(parkingMap);
  const selectedPlace = getSelectedPlaces(parkingMap);
  const [topay, setTopay] = useState(0);
  const handleClick = () => {
    const randomElement =
      freeplaces[Math.floor(Math.random() * freeplaces.length)];
    const ticketNumber = getTicket(randomElement.no);
    dispatch(
      ticketIssued({ no: randomElement.no, ticketNumber: ticketNumber })
    );
    dispatch(ticketSelected(randomElement.no));
  };
  const handleTicketSettled = (type, price) => {
    dispatch(
      ticketSettled({
        no: selectedPlace.no,
        setteledTimestamp: Date.now(),
        type,
        price,
      })
    );
    dispatch(ticketSelected(0));
    setTopay(0);
  };
  return (
    <div className="ticket-machine">
      <div className="ticket-machine-screen">
        <img src={parkingImage} alt="" />

        <Summary
          totalplaces={totalplaces.length}
          freeplaces={freeplaces ? freeplaces.length : 0}
        />
        {selectedPlace && Object.keys(selectedPlace).length && ticket.length ? (
          <Ticket
            item={ticket.filter((i) => i.no === selectedPlace.no)[0]}
            scale={11}
          />
        ) : null}

        <div
          className={`app-button ${
            freeplaces && !freeplaces.length ? "button-disabled" : null
          }`}
          onClick={handleClick}
        >
          {freeplaces && !freeplaces.length
            ? "No ticket is available"
            : "Get ticket"}
        </div>

        {Object.keys(selectedPlace).length && topay ? (
          <div className="payment-container">
            <PayButton
              text="Credit"
              onClick={handleTicketSettled}
              price={
                selectedPlace &&
                ticket.length &&
                calculatePrice(
                  ticket.filter((i) => i.no === selectedPlace.no)[0]
                    .ticketNumber,
                  ticket.filter((i) => i.no === selectedPlace.no)[0]
                )
              }
            />
            <PayButton
              text="Debit"
              onClick={handleTicketSettled}
              price={
                selectedPlace &&
                ticket.length &&
                calculatePrice(
                  ticket.filter((i) => i.no === selectedPlace.no)[0]
                    .ticketNumber,
                  ticket.filter((i) => i.no === selectedPlace.no)[0]
                )
              }
            />
            <PayButton
              text="Cash"
              onClick={handleTicketSettled}
              price={
                selectedPlace &&
                ticket.length &&
                calculatePrice(
                  ticket.filter((i) => i.no === selectedPlace.no)[0]
                    .ticketNumber,
                  ticket.filter((i) => i.no === selectedPlace.no)[0]
                )
              }
            />
          </div>
        ) : (
          <AppButton text="Pay" onClick={() => setTopay(1)} />
        )}
        <AppButton
          text="Reset"
          onClick={() => {
            dispatch(systemInitialed(getData().parkingMap));
          }}
        />
      </div>
      <ReceiptList ticket={ticket} />
    </div>
  );
};

export default TicketMachine;
