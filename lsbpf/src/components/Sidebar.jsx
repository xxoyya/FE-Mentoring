import { useState } from "react";
import { NavLink } from "react-router-dom";
import LargeLogo from "../components/icons/LargeLogo"
import SmallLogo from "./icons/SmallLogo";
import IconNavTransactions from "./icons/IconNavTransactions";
import IconNavOverview from "./icons/IconNavOverview";
import IconCaretRight from "../components/icons/IconCaretRight"
import IconCaretLeft from "../components/icons/IconCaretLeft";
import IconNavBudgets from "../components/icons/IconNavBudgets"
import IconNavPots from "../components/icons/IconNavPots"
import IconNavRecurringBills from "../components/icons/IconNavRecurringBills"

const Sidebar = () => {
  const [isClosed, setIsClosed] = useState(false);

  const toggleSidebar = () => {
    setIsClosed(!isClosed);
  }

  return (
    <nav id="sidebar" className={isClosed ? "close" : ""}>
      <div className="logo">{isClosed ? <SmallLogo /> : <LargeLogo />}</div>

      <ul className="tabs" role="list">
        <li className="sidebar-tab">
          <NavLink
            className={({ isActive }) => (isActive ? " active" : "")}
            to="/"
          >
            <IconNavOverview isActive={({ isActive }) => isActive} />
            <span className="tab-name">Overview</span>
          </NavLink>
        </li>
        <li className="sidebar-tab">
          <NavLink
            className={({ isActive }) => (isActive ? " active" : "")}
            to="/transactions"
          >
            <IconNavTransactions />
            <span className="tab-name">Transactions</span>
          </NavLink>
        </li>
        <li className="sidebar-tab">
          <NavLink
            className={({ isActive }) => (isActive ? " active" : "")}
            to="/budgets"
          >
            <IconNavBudgets />
            <span className="tab-name">Budgets</span>
          </NavLink>
        </li>
        <li className="sidebar-tab">
          <NavLink
            className={({ isActive }) => (isActive ? " active" : "")}
            to="/pots"
          >
            <IconNavPots />
            <span className="tab-name">Pots</span>
          </NavLink>
        </li>
        <li className="sidebar-tab">
          <NavLink
            className={({ isActive }) => (isActive ? " active" : "")}
            to="/recurring"
          >
            <IconNavRecurringBills />
            <span className="tab-name">Recurring bills</span>
          </NavLink>
        </li>
      </ul>

      <button onClick={toggleSidebar}>
        {isClosed ? <IconCaretRight /> : <IconCaretLeft />}
        <span
          className="tab-name"
          style={{ display: isClosed ? "none" : "block" }}
        >
          Minimize window
        </span>
      </button>
    </nav>
  );
}

export default Sidebar