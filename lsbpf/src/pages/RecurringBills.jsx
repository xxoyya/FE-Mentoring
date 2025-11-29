import { useState } from "react";
import IconRecurringBills from "../components/icons/IconRecurringBills";
import PFASearchInput from "../components/SearchInput";
import PFASortButton from "../components/SortButton";
import IconBillPaid from "../components/icons/IconBillPaid";
import IconBillDue from "../components/icons/IconBillDue";
import JsonData from "../../data.json";

const RecurringBills = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState("Latest");

  const vendors = new Map();

  const recurringTransactions = JsonData.transactions.filter(
    (transaction) => transaction.recurring
  );

  for (const transaction of recurringTransactions) {
    if (!vendors.has(transaction.name)) {
      vendors.set(transaction.name, transaction);
    }
  }

  // Convert the Map values to an array and add `paid` and `dueSoon` fields with default values
  const uniqueVendorTransactions = Array.from(
    vendors.values(),
    (transaction) => ({
      ...transaction, // spread existing transaction details
      paid: false, // add default field `paid`
      dueSoon: false, // add default field `dueSoon`
    })
  );

  const latestTransactionDate = new Date("2024-08-19");
  const dueSoonCutOffDate = new Date(latestTransactionDate);
  dueSoonCutOffDate.setDate(latestTransactionDate.getDate() + 5);

  const updatedTransactions = uniqueVendorTransactions.map((transaction) => {
    const transactionDate = new Date(transaction.date);
    const isPaid = transactionDate.getDate() < latestTransactionDate.getDate();
    const isDueSoon =
      !isPaid && transactionDate.getDate() <= dueSoonCutOffDate.getDate();

    return {
      ...transaction,
      paid: isPaid,
      dueSoon: isDueSoon,
    };
  });

  // Search logic
  const searchedTransactions = updatedTransactions.filter((transaction) => {
    const matchesSearch = transaction.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  // Sort logic (modify to compare only day of month)
  const sortedTransactions = [...searchedTransactions].sort((a, b) => {
    const dayA = new Date(a.date).getDate(); // Extract the day from the date
    const dayB = new Date(b.date).getDate(); // Extract the day from the date

    if (sortType === "Latest") {
      return dayB - dayA; // Sort by descending day (latest)
    } else if (sortType === "Oldest") {
      return dayA - dayB; // Sort by ascending day (oldest)
    } else if (sortType === "A to Z") {
      return a.name.localeCompare(b.name);
    } else if (sortType === "Z to A") {
      return b.name.localeCompare(a.name);
    } else if (sortType === "Highest") {
      return Math.abs(b.amount) - Math.abs(a.amount); // Highest amount first (negative amounts are expenses)
    } else if (sortType === "Lowest") {
      return Math.abs(a.amount) - Math.abs(b.amount); // Lowest amount first (negative amounts are expenses)
    }
    return 0;
  });

  const totalBills = updatedTransactions.reduce(
    (acc, transaction) => acc + Math.abs(transaction.amount),
    0
  );

  const summary = updatedTransactions.reduce(
    (acc, transaction) => {
      const amount = Math.abs(transaction.amount);

      if (transaction.paid) {
        acc.paidBills.count += 1;
        acc.paidBills.totalAmount += amount;
      } else if (transaction.dueSoon) {
        acc.dueSoonBills.count += 1;
        acc.dueSoonBills.totalAmount += amount;
      } else {
        acc.upcomingBills.count += 1;
        acc.upcomingBills.totalAmount += amount;
      }

      return acc;
    },
    {
      paidBills: { count: 0, totalAmount: 0 },
      dueSoonBills: { count: 0, totalAmount: 0 },
      upcomingBills: { count: 0, totalAmount: 0 },
    }
  );

  const { paidBills, dueSoonBills, upcomingBills } = summary;

  const rows = sortedTransactions.map((transaction) => {
    const transactionDate = new Date(transaction.date);
    const dayOfMonth = transactionDate.getDate();
    const formattedDate = `Monthly - ${dayOfMonth}${getDaySuffix(dayOfMonth)}`;
    return (
      <tr key={transaction.avatar}>
        <td className="recepient">
          <img src={transaction.avatar} alt="avatar" />
          <span>{transaction.name}</span>
        </td>
        <td className="due-date">
          <span className="text-green">{formattedDate}</span>
          {transaction.paid && <IconBillPaid />}
          {transaction.dueSoon && <IconBillDue />}
        </td>
        <td className={transaction.dueSoon ? "amount text-red" : "amount"}>
          {`$${Math.abs(transaction.amount).toFixed(2)}`}
        </td>
      </tr>
    );
  });

  function getDaySuffix(day) {
    if (day >= 11 && day <= 13) {
      return "th"; // Special case for 11th, 12th, 13th
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  return (
    <div className="recurring-page">
      <h1>Recurring Bills</h1>

      <section>
        <div className="section-1">
          <div className="card dark-background">
            <div className="card-body">
              <div className="total-bills">
                <IconRecurringBills />
                <div className="info">
                  <h4>Total bills</h4>
                  <p>${totalBills}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="summary-card">
                <h3>Summary</h3>
                <div className="summaries">
                  <div className="summary">
                    <span className="name">Paid Bills</span>
                    <span className="amount">
                      {paidBills.count} (${paidBills.totalAmount.toFixed(2)})
                    </span>
                  </div>
                  <div className="summary">
                    <span className="name">Total Upcoming</span>
                    <span className="amount">
                      {upcomingBills.count} ($
                      {upcomingBills.totalAmount.toFixed(2)})
                    </span>
                  </div>
                  <div className="summary">
                    <span className="name">Due Soon</span>
                    <span className="amount">
                      {dueSoonBills.count} ($
                      {dueSoonBills.totalAmount.toFixed(2)})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-headers">
            <div className="table-filters">
              <PFASearchInput
                placeholder="Search bills"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="filter-buttons">
                <PFASortButton sortType={sortType} onSortChange={setSortType} />
              </div>
            </div>
          </div>
          <div className="card-body">
            <table>
              <thead>
                <tr>
                  <th>Bill Title</th>
                  <th>Due Date</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RecurringBills;
