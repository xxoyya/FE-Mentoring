
const SummaryItem = ({ title, amount }) => {
  return (
    <div className="card">
      <div className="card-body">
        <p>{title}</p>
        <span>
          $
          {amount.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      </div>
    </div>
  );
}

export default SummaryItem