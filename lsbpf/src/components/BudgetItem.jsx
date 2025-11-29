import { useNavigate } from "react-router-dom";
import LargeProgressBar from "../components/LargeProgressBar";
import IconCaretRight from "../components/icons/IconCaretRight";
import BudgetEllipsisBtn from "./BudgetEllipsisBtn";
import ColoredInfo from "./ColoredInfo";

const BudgetItem = ({ budget, editBudget, deleteBudget }) => {
  const navigate = useNavigate();
  const { spentAmount, maximum, latestTransactions } = budget;
  const remaining = maximum - spentAmount;

  const latestRows = latestTransactions.map((transaction, idx) => (
    <tr key={transaction.id || idx}>
      <td className="recepient">
        <img className="avatar-hidden" src={transaction.avatar} alt="avatar" />
        <span>{transaction.name}</span>
      </td>
      <div>
        <td className="amount">- ${Math.abs(transaction.amount).toFixed(2)}</td>
        <td className="date">
          {new Date(transaction.date).toLocaleDateString()}
        </td>
      </div>
    </tr>
  ));

  const handleSeeAll = () => {
    navigate("/transactions", { state: { category: budget.category } });
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="custom-card-header flex-between">
          <div className="section-1">
            <div
              style={{
                backgroundColor: budget.theme,
              }}
            ></div>
            <h2>{budget.category}</h2>
          </div>
          <BudgetEllipsisBtn
            budget={budget}
            editBudget={editBudget}
            deleteBudget={deleteBudget}
          />
        </div>
      </div>
      <div className="card-body">
        <div className="custom-card-content">
          <section>
            <h4 className="no-bold">Maximum of ${budget.maximum.toFixed(2)}</h4>
            <LargeProgressBar budget={budget} />
            <div className="budget-info">
              <ColoredInfo
                title="Spent"
                theme={budget.theme}
                amount={budget.spentAmount}
              />
              <ColoredInfo
                title="Remaining"
                theme="#F8F4F0"
                amount={remaining}
              />
            </div>
          </section>
          <section>
            <div
              className="card"
              style={{
                backgroundColor: "#F8F4F0",
                paddingBlock: "24px",
              }}
            >
              <div className="card-body">
                <div className="flex-between">
                  <h3>Latest Spending</h3>
                  <span className="see-details" onClick={handleSeeAll}>
                    See All
                    <IconCaretRight height="12" width="15" />
                  </span>
                </div>
                <table>
                  <tbody>{latestRows}</tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default BudgetItem;
