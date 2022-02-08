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
    if (!parkPlaces.parkingMap && !parkPlaces.parkingMap.length)
      dispatch(systemInitialed(parkingMap));
  }, [dispatch, parkPlaces.parkingMap, parkingMap]);

  return (
    <>
      <div className="app-container">
        <Parking />
        <TicketMachine />
      </div>
      <button onClick={() => dispatch(systemInitialed(parkingMap))}>
        reset
      </button>
    </>
  );
};

export default Main;
