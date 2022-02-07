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

import { ticketIssued, systemInitialed } from "../../store/parking";
import getData from "../../services/parking";
const TicketMachine = () => {
  const dispatch = useDispatch();
  const parkingMap = useSelector((state) => state.parkingReducer);
  const freeplaces = getFreePlaces(parkingMap);
  const totalplaces = getALLPlaces(parkingMap);
  const selectedPlace = getSelectedPlaces(parkingMap);

  const handleClick = () => {
    const randomElement =
      freeplaces[Math.floor(Math.random() * freeplaces.length)];
    const ticketNumber = getTicket(randomElement.no);
    dispatch(
      ticketIssued({ no: randomElement.no, ticketNumber: ticketNumber })
    );
  };

  return (
    <div className="ticket-machine">
      <div className="ticket-machine-screen">
        <img src={parkingImage} alt="" />
        <div className="summary">
          <div>Total Park Place: {totalplaces.length}</div>
          <hr />
          <div>Free Park Place: {freeplaces.length}</div>
          <hr />
        </div>
        <Ticket
          ticketNumber={
            selectedPlace && selectedPlace.ticketNumber
              ? selectedPlace.ticketNumber
              : ""
          }
          price={
            selectedPlace &&
            selectedPlace.ticketNumber &&
            calculatePrice(selectedPlace.ticketNumber)
          }
        />

        <div
          className={`app-button ${
            !freeplaces.length ? "button-disabled" : null
          }`}
          onClick={handleClick}
        >
          {!freeplaces.length ? "No ticket is available" : "Get ticket"}
        </div>
        <div
          className={
            !selectedPlace ? `app-button button-disabled` : "app-button"
          }
          onClick={handleClick}
        >
          Pay fee
        </div>
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
