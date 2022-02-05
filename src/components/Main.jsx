import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getPlaces from "../services/parking";
import { systemInitialed } from "../store/parking";
import Parking from "./common/Parking";
import TicketMachine from "./common/TicketMachine";

const Main = () => {
  const dispatch = useDispatch();
  let parkPlaces = useSelector((state) => state.parkingReducer);
  useEffect(() => {
    if (!parkPlaces.length) dispatch(systemInitialed(getPlaces()));
  }, []);

  return (
    <div className="app-container">
      <Parking />
      <TicketMachine />
    </div>
  );
};

export default Main;
