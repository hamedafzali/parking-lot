import car from "../../assets/images/car.png";
import QR from "./QR";
const Place = ({ item, no }) => {
  return (
    <div
      className={`app-place ${
        item === 0
          ? "app-place-path"
          : item === 1
          ? "app-place-empty"
          : "app-place-full"
      }`}
    >
      {item !== 0 ? <strong>{no}</strong> : null}
      {item && item !== 0 && item !== 1 ? (
        <>
          <img src={car} style={{ width: "100%" }} alt="" />
          <QR value={item} />
        </>
      ) : null}
    </div>
  );
};

export default Place;
