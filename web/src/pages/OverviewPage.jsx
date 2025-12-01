// src/pages/OverviewPage.jsx
import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";

import PotsSummary from "../components/pots/PotsSummary";
import BudgetsSummary from "../components/budgets/BudgetsSummary";
import BillsSummary from "../components/bills/BillsSummary";
import TransactionsPreview from "../components/transactions/TransactionsPreview";

import "./OverviewPage.css";

export default function OverviewPage() {
    return (
        <DashboardLayout activeMenu="overview">
            <div className="overview-page">
                {/* 타이틀 */}
                <header className="overview-header">
                    <h1>Overview</h1>
                </header>

                {/* 상단 3개 카드 (Balance / Income / Expenses) */}
                <section className="overview-top">
                    <div className="summary-card summary-card--dark">
                        <span className="summary-label">Current Balance</span>
                        <span className="summary-value">$4,836.00</span>
                    </div>
                    <div className="summary-card">
                        <span className="summary-label">Income</span>
                        <span className="summary-value summary-value--light">
              $3,814.25
            </span>
                    </div>
                    <div className="summary-card">
                        <span className="summary-label">Expenses</span>
                        <span className="summary-value summary-value--light">
              $1,700.50
            </span>
                    </div>
                </section>

                {/* 메인 2열 : 왼쪽(Pots + Transactions), 오른쪽(Budgets + Bills) */}
                <section className="overview-main">
                    <div className="overview-column">
                        <PotsSummary />
                        <TransactionsPreview />
                    </div>
                    <div className="overview-column">
                        <BudgetsSummary />
                        <BillsSummary />
                    </div>
                </section>
            </div>
        </DashboardLayout>
    );
}
