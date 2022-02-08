import { useDispatch, useSelector } from "react-redux";
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
import { useState } from "react";
const TicketMachine = () => {
  const dispatch = useDispatch();
  const { parkingMap, ticket } = useSelector((state) => state.parkingReducer);
  const freeplaces = getFreePlaces(parkingMap, ticket);
  const totalplaces = getALLPlaces(parkingMap);
  const selectedPlace = getSelectedPlaces(parkingMap);
  console.log("test", selectedPlace, selectedPlace.length, ticket.length);
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
    console.log(type, price);
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
        <div className="summary">
          <div>Total Park Place: {totalplaces.length}</div>
          <hr />
          <div>Free Park Place: {freeplaces ? freeplaces.length : 0}</div>
          <hr />
        </div>
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

        {selectedPlace && topay ? (
          <div className="payment-container">
            <div
              className="payment-item"
              onClick={() =>
                handleTicketSettled(
                  "debit",
                  calculatePrice(
                    ticket.filter((i) => i.no === selectedPlace.no)[0]
                      .ticketNumber
                  )
                )
              }
            >
              <div>Credit</div>
              <div>
                €
                {selectedPlace &&
                  selectedPlace.ticketNumber &&
                  calculatePrice(selectedPlace.ticketNumber)}
              </div>
            </div>
            <div
              className="payment-item"
              onClick={() =>
                handleTicketSettled(
                  "debit",
                  calculatePrice(
                    ticket.filter((i) => i.no === selectedPlace.no)[0]
                      .ticketNumber
                  )
                )
              }
            >
              <div>Debit</div>
              <div>
                €
                {selectedPlace &&
                  selectedPlace.ticketNumber &&
                  calculatePrice(selectedPlace.ticketNumber)}
              </div>
            </div>
            <div
              className="payment-item"
              onClick={() =>
                handleTicketSettled(
                  "cash",
                  calculatePrice(
                    ticket.filter((i) => i.no === selectedPlace.no)[0]
                      .ticketNumber
                  )
                )
              }
            >
              <div>Cash</div>
              <div>
                €
                {selectedPlace &&
                  selectedPlace.ticketNumber &&
                  calculatePrice(selectedPlace.ticketNumber)}
              </div>
            </div>
          </div>
        ) : (
          <div
            className={
              !selectedPlace ? `app-button button-disabled` : "app-button"
            }
            onClick={() => setTopay(1)}
          >
            Pay fee
          </div>
        )}

        <div
          className="app-button"
          onClick={() => {
            dispatch(systemInitialed(getData().parkingMap));
          }}
        >
          Reset
        </div>
      </div>
      <div className="ticket-machine-ticketlist">
        {ticket.map((i) => (i.setteledTimestamp ? <Ticket item={i} /> : null))}
      </div>
    </div>
  );
};

export default TicketMachine;
