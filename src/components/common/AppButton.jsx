const AppButton = ({ text, onClick }) => {
  return (
    <div className="app-button" onClick={onClick}>
      {text}
    </div>
  );
};

export default AppButton;
