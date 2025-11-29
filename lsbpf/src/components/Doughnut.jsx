import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

ChartJS.register(ArcElement, Tooltip, Legend);

const PFADoughnut = () => {
  const { enrichedBudgets } = useContext(AuthContext);

  return (
    <div className="chart-container">
      <Doughnut
        data={{
          labels: enrichedBudgets.map((budget) => budget.category),
          datasets: [
            {
              label: "Spent $",
              data: enrichedBudgets.map((budget) => budget.spentAmount),
              backgroundColor: enrichedBudgets.map((budget) => budget.theme),
              hoverBackgroundColor: enrichedBudgets.map(
                (budget) => budget.theme
              ),
              borderColor: enrichedBudgets.map((budget) => budget.theme),
            },
          ],
        }}
        options={{
          cutout: "70%",
          animation: false,
        }}
      />
    </div>
  );
};

export default PFADoughnut;
