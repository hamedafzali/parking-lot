import car from "../../assets/images/car.png";
import QR from "./QR";
const Place = ({ item, onClick }) => {
  return (
    <div
      className={`app-place ${
        item.type === "path"
          ? "app-place-path"
          : !item.ticketNumber
          ? "app-place- app-place-empty"
          : "app-place-full"
      }`}
      onClick={() => {
        item && item.ticketNumber && onClick(item);
      }}
    >
      {item.type === "Parking" ? <strong>{item.no}</strong> : null}
      {item.ticketNumber ? (
        <>
          <img src={car} style={{ width: "100%" }} alt="" />
          <QR value={item.no} />
        </>
      ) : null}
    </div>
  );
};

export default Place;
