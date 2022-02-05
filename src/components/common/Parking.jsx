import Place from "./Place";
import { useSelector } from "react-redux";

const Parking = () => {
  let parkPlaces = useSelector((state) => state.parkingReducer);

  return (
    <div className="parking-container">
      {parkPlaces.map((item, index) => (
        <Place item={item} no={index} />
      ))}
    </div>
  );
};

export default Parking;
