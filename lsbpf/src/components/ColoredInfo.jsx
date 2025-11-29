const ColoredInfo = ({ title, theme, amount }) => {
  return (
    <div
      className="colored-info"
      style={{
        "--colored-info-theme": theme,
      }}
    >
      <span>{title}</span>
      <span>${Number(amount)}</span>
    </div>
  );
};

export default ColoredInfo;
