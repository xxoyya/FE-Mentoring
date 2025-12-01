// src/components/budgets/BudgetsChart.jsx
import Card from "../common/Card";
import { budgets } from "../../data/budgets";

export default function BudgetsChart() {
    return (
        <Card>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Budgets</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {budgets.map((b) => {
                    const used = Math.min(100, Math.round((b.spent / b.limit) * 100));
                    return (
                        <div key={b.id}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    fontSize: 12,
                                    marginBottom: 4,
                                }}
                            >
                                <span>{b.name}</span>
                                <span>
                  ${b.spent} / ${b.limit}
                </span>
                            </div>
                            <div
                                style={{
                                    height: 8,
                                    borderRadius: 999,
                                    background: "#E5E7EB",
                                    overflow: "hidden",
                                }}
                            >
                                <div
                                    style={{
                                        width: `${used}%`,
                                        height: "100%",
                                        background: used > 90 ? "#F97316" : "#3B82F6",
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
}
