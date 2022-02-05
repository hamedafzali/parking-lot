import { useDispatch, useSelector } from "react-redux";
import parkingImage from "../../assets/images/parking.jpg";
import {
  calcTicketNumber,
  getALLPlaces,
  getFreePlaces,
} from "../../utils/calc";
import Ticket from "./Ticket";
import { useState, useEffect, useCallback } from "react";
import { ticketIssued, systemInitialed } from "../../store/parking";
import getPlaces from "../../services/parking";
const TicketMachine = () => {
  const [total, setTotal] = useState([]);
  const [free, setFree] = useState([]);
  const [ticketNumber, setTicketNumber] = useState([]);
  const dispatch = useDispatch();
  let parking = useSelector((state) => state.parkingReducer);
  useEffect(() => {
    setTotal(getALLPlaces(parking));
    setFree(getFreePlaces(parking));
  }, []);

  const handleClick = () => {
    const f = getFreePlaces(parking);
    const randomElement = f[Math.floor(Math.random() * f.length)];
    const ticketNumber = calcTicketNumber(randomElement);
    setTicketNumber(ticketNumber);
    dispatch(ticketIssued({ index: randomElement, value: ticketNumber }));
    //  dispatch(ticketIssued({ index: randomElement, value: ticketNumber })).then((result) => {
    //setFree(getFreePlaces(parking));
  };

  return (
    <div className="ticket-machine">
      <div className="ticket-machine-screen">
        <img src={parkingImage} alt="" />
        <div className="summary">
          <div>Total Park Place: {total.length}</div>
          <hr />
          <div>Free Park Place: {getFreePlaces(parking).length}</div>
          <hr />
        </div>
        <Ticket timestamp={ticketNumber} ticketNumber={ticketNumber} />

        <div className="app-button" onClick={handleClick}>
          Get Ticket
        </div>
        <div
          className="app-button"
          onClick={() => {
            dispatch(systemInitialed(getPlaces()));
            setTotal(getALLPlaces(parking));
            setFree(getFreePlaces(parking));
          }}
        >
          Reset
        </div>
      </div>
    </div>
  );
};

export default TicketMachine;
