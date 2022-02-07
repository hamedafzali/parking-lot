import Place from "./Place";
import { useDispatch, useSelector } from "react-redux";
import { ticketSelected } from "../../store/parking";

const Parking = () => {
  let parkPlaces = useSelector((state) => state.parkingReducer);
  const dispatch = useDispatch();
  const clickHanler = (item) => {
    dispatch(ticketSelected(item.no));
  };
  return (
    <div className="parking-container">
      {parkPlaces.map((item) => (
        <Place item={item} onClick={clickHanler} />
      ))}
    </div>
  );
};

export default Parking;
