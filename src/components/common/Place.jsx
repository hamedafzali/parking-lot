import car from "../../assets/images/car.png";
const Place = ({ type, no }) => {
  return (
    <div
      className={`app-place ${
        type === 0
          ? "app-place-path"
          : type === 1
          ? "app-place-empty"
          : "app-place-full"
      }`}
    >
      {type !== 0 ? <strong>{`${no[0]}-${no[1]}`}</strong> : null}
      {type === 2 ? <img src={car} style={{ width: "100%" }} /> : null}
    </div>
  );
};

export default Place;
