const Summary = ({ totalplaces, freeplaces }) => {
  return (
    <div className="summary">
      <div>Total Park Place: {totalplaces}</div>
      <hr />
      <div>Free Park Place: {freeplaces}</div>
      <hr />
    </div>
  );
};

export default Summary;
