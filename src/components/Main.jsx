import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getData from "../services/parking";
import { systemInitialed } from "../store/parking";
import Parking from "./common/Parking";
import TicketMachine from "./common/TicketMachine";

const Main = () => {
  const { parkingMap } = getData();
  const dispatch = useDispatch();
  let parkPlaces = useSelector((state) => state.parkingReducer);
  useEffect(() => {
    if (!parkPlaces.length) dispatch(systemInitialed(parkingMap));
  }, [dispatch, parkPlaces.length, parkingMap]);

  return (
    <div className="app-container">
      <Parking parkingMap={parkingMap} />
      <TicketMachine />
    </div>
  );
};

export default Main;
