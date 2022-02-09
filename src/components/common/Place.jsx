import car from "../../assets/images/car.png";
const Place = ({ item, onClick, ticket }) => {
  return (
    <div
      className={`app-place ${
        item.type === "path" || item.type === "enter" || item.type === "exit"
          ? `app-place-path ${
              item.type === "enter"
                ? "path-enter"
                : item.type === "exit"
                ? "path-exit "
                : null
            }`
          : !ticket.length
          ? "app-place- app-place-empty"
          : item.selected
          ? "app-place-selected "
          : "app-place-full"
      }`}
      onClick={() => {
        ticket.length && ticket[0].ticketNumber && onClick(item);
      }}
    >
      {item.type === "Parking" ? <strong>{item.no}</strong> : null}
      {ticket.length ? (
        <>
          <img src={car} style={{ width: "100%" }} alt="" />
        </>
      ) : null}
    </div>
  );
};

export default Place;
