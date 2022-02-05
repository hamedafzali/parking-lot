import QRCode from "qrcode.react";
import { useEffect } from "react";
import { useState } from "react";

const QR = ({ value, scale = 50 }) => {
  const [size, setSize] = useState(0);
  useEffect(() => setSize(getWindowDimensions().width / scale), []);
  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  };
  return (
    <QRCode
      value={value}
      size={size}
      imageSettings={{
        //src: logo,
        excavate: true,
      }}
    />
  );
};

export default QR;
