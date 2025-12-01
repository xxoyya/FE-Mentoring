// src/pages/BudgetsPage.jsx
import DashboardLayout from "../layouts/DashboardLayout";

const cardStyle = {
    background: "#FFFFFF",
    borderRadius: 12,
    padding: 32,
};

export default function BudgetsPage() {
    const categories = [
        { name: "Entertainment", color: "#277C78", spent: 50, limit: 100 },
        { name: "Bills", color: "#82C9D7", spent: 750, limit: 800 },
        { name: "Dining Out", color: "#F2CDAC", spent: 75, limit: 150 },
        { name: "Personal Care", color: "#626070", spent: 100, limit: 200 },
    ];

    return (
        <DashboardLayout activeMenu="budgets">
            <div
                style={{
                    padding: 32,
                    display: "flex",
                    flexDirection: "column",
                    gap: 24,
                }}
            >
                <h1
                    style={{
                        fontSize: 32,
                        fontWeight: 700,
                        color: "#201F24",
                    }}
                >
                    Budgets
                </h1>

                <div style={{ ...cardStyle, display: "flex", gap: 32 }}>
                    {/* 왼쪽: 도넛 차트 느낌의 요약 (대충 모양만) */}
                    <div
                        style={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 16,
                        }}
                    >
                        {/* 바깥 원 */}
                        <div
                            style={{
                                position: "relative",
                                width: 220,
                                height: 220,
                                borderRadius: "50%",
                                background:
                                    "conic-gradient(#277C78 0 20%, #82C9D7 20% 80%, #F2CDAC 80% 90%, #626070 90% 100%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            {/* 안쪽 흰 원 */}
                            <div
                                style={{
                                    width: 140,
                                    height: 140,
                                    borderRadius: "50%",
                                    background: "#FFFFFF",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 4,
                                }}
                            >
                                <div
                                    style={{ fontSize: 32, fontWeight: 700, color: "#201F24" }}
                                >
                                    $338
                                </div>
                                <div style={{ fontSize: 12, color: "#696868" }}>
                                    of $975 limit
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 오른쪽: 카테고리 리스트 */}
                    <div
                        style={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            gap: 16,
                        }}
                    >
                        {categories.map((c) => {
                            const ratio = Math.min(c.spent / c.limit, 1);
                            return (
                                <div
                                    key={c.name}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 16,
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 4,
                                            height: 40,
                                            borderRadius: 8,
                                            background: c.color,
                                        }}
                                    />
                                    <div style={{ flex: 1 }}>
                                        <div
                                            style={{
                                                fontSize: 12,
                                                color: "#696868",
                                                marginBottom: 4,
                                            }}
                                        >
                                            {c.name}
                                        </div>
                                        <div
                                            style={{
                                                height: 8,
                                                borderRadius: 999,
                                                background: "#E4E1DC",
                                                overflow: "hidden",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: `${ratio * 100}%`,
                                                    height: "100%",
                                                    background: c.color,
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            width: 100,
                                            textAlign: "right",
                                            fontSize: 14,
                                            fontWeight: 700,
                                            color: "#201F24",
                                        }}
                                    >
                                        ${c.spent.toFixed(2)}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
