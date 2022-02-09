const PayButton = ({ text, onClick, price }) => {
  return (
    <div className="payment-item" onClick={() => onClick(text, price)}>
      <div>{text}</div>
      <div>€{price}</div>
    </div>
  );
};

export default PayButton;
