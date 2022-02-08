import Place from "./Place";
import { useDispatch, useSelector } from "react-redux";
import { ticketSelected } from "../../store/parking";

const Parking = () => {
  let { parkingMap, ticket } = useSelector((state) => state.parkingReducer);
  const dispatch = useDispatch();
  const clickHanler = (item) => {
    dispatch(ticketSelected(item.no));
  };

  if (!parkingMap || !parkingMap.length) return <h1>There is no park place</h1>;
  return (
    <div className="parking-container">
      {parkingMap.map((item) => (
        <Place
          item={item}
          onClick={clickHanler}
          ticket={ticket.filter(
            (t) => item.no === t.no && !t.setteledTimestamp
          )}
        />
      ))}
    </div>
  );
};

export default Parking;
