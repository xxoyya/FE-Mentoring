// src/components/budgets/BudgetsSummary.jsx
import React from "react";
import "./BudgetsSummary.css";

export default function BudgetsSummary() {
    const totalLimit = 975;
    const usedTotal = 338;

    const categories = [
        { id: 1, name: "Entertainment", amount: 50, colorClass: "legend-dot--green" },
        { id: 2, name: "Bills", amount: 750, colorClass: "legend-dot--cyan" },
        { id: 3, name: "Dining Out", amount: 75, colorClass: "legend-dot--yellow" },
        { id: 4, name: "Personal Care", amount: 100, colorClass: "legend-dot--navy" },
    ];

    return (
        <div className="card budgets-card">
            {/* 상단 헤더 */}
            <div className="section-header budgets-header" style = {{ marginBottom: "50px" }}>
                <span className="section-title">Budgets</span>
                <div className="section-link">
                    <span>See Details</span>
                    <span className="chevron">&#8250;</span>
                </div>
            </div>

            {/* 본문: 왼쪽 도넛, 오른쪽 범례 */}
            <div className="budgets-body" style = {{ marginBottom: "30px" }}>
                {/* 도넛 */}
                <div className="budgets-donut-wrapper">
                    <div className="budgets-donut-outer">
                        {/* 연한 색 안쪽 링 */}
                        <div className="budgets-donut-middle" />
                        {/* 흰색 가운데 + 텍스트 */}
                        <div className="budgets-donut-inner">
                            <div className="budgets-donut-center">
                                <span className="budgets-amount">${usedTotal}</span>
                                <span className="budgets-caption">of ${totalLimit} limit</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 범례 */}
                <ul className="budgets-legend">
                    {categories.map((c) => (
                        <li key={c.id}>
                            <div className="legend-left">
                                <span className={`legend-dot ${c.colorClass}`} />

                                <div className="legend-text">
                                    <span className="legend-name">{c.name}</span>
                                    <span className="legend-amount">
                    ${c.amount.toFixed(2)}
                  </span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
