const LargeProgressBar = ({ budget }) => {
  const { spentAmount, maximum } = budget
  const newWidth = (spentAmount / maximum) * 100
  
  return (
    <div className="large-progress-bar">
      <span
        className="progress"
        style={{
          backgroundColor: budget.theme,
          width: `${newWidth}%`,
        }}
      ></span>
    </div>
  );
};

export default LargeProgressBar;
