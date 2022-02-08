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
} from "../../store/parking";
import getData from "../../services/parking";
import { useState } from "react";
const TicketMachine = () => {
  const dispatch = useDispatch();
  const { parkingMap, ticket } = useSelector((state) => state.parkingReducer);
  const freeplaces = getFreePlaces(parkingMap, ticket);
  const totalplaces = getALLPlaces(parkingMap);
  const selectedPlace = getSelectedPlaces(parkingMap);
  console.log("selectedPlace", selectedPlace);
  const [topay, setTopay] = useState(0);
  const handleClick = () => {
    const randomElement =
      freeplaces[Math.floor(Math.random() * freeplaces.length)];
    const ticketNumber = getTicket(randomElement.no);
    dispatch(
      ticketIssued({ no: randomElement.no, ticketNumber: ticketNumber })
    );
  };
  const handleTicketSettled = (type) => {
    dispatch(
      ticketSettled({
        no: selectedPlace.no,
        setteled: { timestamp: Date.now(), type },
      })
    );
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
        <Ticket
          ticketNumber={
            ticket &&
            selectedPlace &&
            ticket.filter((i) => i.no === selectedPlace.no)[0].ticketNumber
          }
          price={
            ticket &&
            selectedPlace &&
            calculatePrice(
              ticket.filter((i) => i.no === selectedPlace.no)[0].ticketNumber
            )
          }
        />

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

        {topay ? (
          <div className="payment-container">
            <div
              className="payment-item"
              onClick={() => handleTicketSettled("debit")}
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
              onClick={() => handleTicketSettled("debit")}
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
              onClick={() => () => handleTicketSettled("cash")}
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
    </div>
  );
};

export default TicketMachine;
