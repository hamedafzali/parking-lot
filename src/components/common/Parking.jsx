import Place from "./Place";

import { useEffect, useState } from "react";
import getPlaces from "../../services/parking";
const Parking = () => {
  useEffect(() => {
    handlegetPlaces();
  }, []);
  const [places, setPlaces] = useState([]);
  const handlegetPlaces = () => {
    const data = getPlaces();
    setPlaces(data);
  };
  return (
    <div className="parking-container">
      {places.map((row, rowIndex) =>
        row.map((col, colIndex) => (
          <Place type={col} no={[rowIndex, colIndex]} />
        ))
      )}
    </div>
  );
};

export default Parking;
