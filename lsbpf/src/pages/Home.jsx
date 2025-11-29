import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import SummaryItem from "../components/SummaryItem";
import JsonData from "../../data.json";
import IconCaretRight from "../components/icons/IconCaretRight";
import PotIcon from "../components/icons/PotIcon";
import ColoredInfo from "../components/ColoredInfo";
import PFADoughnut from "../components/Doughnut";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()
  const { balance } = useContext(AuthContext);
  const income = JsonData.balance.income;
  const expenses = JsonData.balance.expenses;
  const totalSaved = JsonData.pots.reduce((acc, pot) => acc + pot.total, 0);

  const latestTransactions = JsonData.transactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const transactions = latestTransactions.map((transaction) => (
    <tr key={transaction}>
      <td className="recepient">
        <img src={transaction.avatar} alt="avatar" />
        <span>{transaction.name}</span>
      </td>
      <div>
        <td
          className="amount"
          style={{
            color: transaction.amount > 0 ? "hsl(177, 52%, 32%)" : "",
          }}
        >
          {transaction.amount > 0
            ? `+ $${Math.abs(transaction.amount).toFixed(2)}`
            : `- $${Math.abs(transaction.amount).toFixed(2)}`}
        </td>
        <td className="date">
          {new Date(transaction.date).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </td>
      </div>
    </tr>
  ));

  return (
    <div className="overview-page">
      <h1>Overview</h1>
      <section className="summary">
        <SummaryItem title="Current Balance" amount={balance} />
        <SummaryItem title="Income" amount={income} />
        <SummaryItem title="Expenses" amount={expenses} />
      </section>

      <section className="content">
        {/* Pot Card */}
        <div className="card">
          <div className="card-body">
            <div className="flex-between">
              <h2>Pots</h2>
              <span className="see-details" onClick={() => navigate("/pots")}>
                See Details
                <IconCaretRight height="12" width="15" />
              </span>
            </div>
            <div className="info">
              <div className="card">
                <div className="card-body">
                  <PotIcon />
                  <div className="saved">
                    <p>Total Saved</p>
                    <p>${totalSaved}</p>
                  </div>
                </div>
              </div>
              <div className="info-colors">
                {JsonData.pots.map((pot) => (
                  <ColoredInfo
                    key={pot.id}
                    title={pot.name}
                    amount={pot.total}
                    theme={pot.theme}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Card */}
        <div className="card">
          <div className="card-body">
            <div className="flex-between">
              <h2>Transactions</h2>
              <span
                className="see-details"
                onClick={() => navigate("/transactions")}
              >
                View All
                <IconCaretRight height="12" width="15" />
              </span>
            </div>
            <table>
              <tbody>{transactions}</tbody>
            </table>
          </div>
        </div>

        {/* Budgets Card */}
        <div className="card">
          <div className="card-body">
            <div className="flex-between">
              <h2>Budgets</h2>
              <span
                className="see-details"
                onClick={() => navigate("/budgets")}
              >
                View All
                <IconCaretRight height="12" width="15" />
              </span>
            </div>
            <PFADoughnut />
          </div>
        </div>

        {/* Bills Card */}
        <div className="card">
          <div className="card-body">
            <div className="flex-between">
              <h2>Recurring Bills</h2>
              <span
                className="see-details"
                onClick={() => navigate("/recurring")}
              >
                See Details
                <IconCaretRight height="12" width="15" />
              </span>
            </div>
            <div className="content">
              <div className="card">
                <div className="card-body">
                  <div className="flex-between">
                    <h4>Paid Bills</h4>
                    <p>$190.00</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-body">
                  <div className="flex-between">
                    <h4>Total Upcoming</h4>
                    <p>$194.98</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-body">
                  <div className="flex-between">
                    <h4>Due Soon</h4>
                    <p>$59.98</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
