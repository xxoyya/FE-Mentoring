// src/pages/BillsPage.jsx
import DashboardLayout from "../layouts/DashboardLayout";

const cardStyle = {
    background: "#FFFFFF",
    borderRadius: 12,
    padding: 32,
};

export default function BillsPage() {
    const bills = [
        {
            name: "Spotify",
            status: "Paid",
            due: "01 Aug 2024",
            amount: 9.99,
            color: "#277C78",
        },
        {
            name: "Electricity",
            status: "Upcoming",
            due: "05 Aug 2024",
            amount: 85.5,
            color: "#F2CDAC",
        },
        {
            name: "Internet",
            status: "Due Soon",
            due: "02 Aug 2024",
            amount: 59.98,
            color: "#82C9D7",
        },
    ];

    return (
        <DashboardLayout activeMenu="bills">
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
                    Recurring Bills
                </h1>

                <div style={{ ...cardStyle, display: "flex", flexDirection: "column", gap: 24 }}>
                    {/* 상단 요약 카드들 */}
                    <div
                        style={{
                            display: "flex",
                            gap: 16,
                            flexWrap: "wrap",
                        }}
                    >
                        <SummaryCard
                            label="Paid Bills"
                            value="$190.00"
                            borderColor="#277C78"
                        />
                        <SummaryCard
                            label="Total Upcoming"
                            value="$194.98"
                            borderColor="#F2CDAC"
                        />
                        <SummaryCard
                            label="Due Soon"
                            value="$59.98"
                            borderColor="#82C9D7"
                        />
                    </div>

                    {/* Bills 리스트 */}
                    <div
                        style={{
                            borderRadius: 12,
                            border: "1px solid #F2F2F2",
                            overflow: "hidden",
                        }}
                    >
                        {/* 헤더 */}
                        <div
                            style={{
                                padding: "12px 16px",
                                background: "#F8F4F0",
                                display: "flex",
                                fontSize: 12,
                                color: "#696868",
                            }}
                        >
                            <div style={{ flex: 1 }}>Bill</div>
                            <div style={{ width: 160 }}>Status</div>
                            <div style={{ width: 160 }}>Due Date</div>
                            <div style={{ width: 160, textAlign: "right" }}>Amount</div>
                        </div>

                        {bills.map((b, idx) => (
                            <div key={b.name}>
                                <div
                                    style={{
                                        padding: "12px 16px",
                                        display: "flex",
                                        alignItems: "center",
                                        fontSize: 14,
                                        gap: 16,
                                    }}
                                >
                                    {/* 이름 */}
                                    <div style={{ flex: 1, display: "flex", gap: 12 }}>
                                        <div
                                            style={{
                                                width: 32,
                                                height: 32,
                                                borderRadius: "50%",
                                                background: "#F8F4F0",
                                            }}
                                        />
                                        <div style={{ fontWeight: 700, color: "#201F24" }}>
                                            {b.name}
                                        </div>
                                    </div>

                                    {/* 상태 */}
                                    <div
                                        style={{
                                            width: 160,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 8,
                                        }}
                                    >
                    <span
                        style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: b.color,
                        }}
                    />
                                        <span style={{ fontSize: 12, color: "#696868" }}>
                      {b.status}
                    </span>
                                    </div>

                                    {/* 마감일 */}
                                    <div
                                        style={{
                                            width: 160,
                                            fontSize: 12,
                                            color: "#696868",
                                        }}
                                    >
                                        {b.due}
                                    </div>

                                    {/* 금액 */}
                                    <div
                                        style={{
                                            width: 160,
                                            textAlign: "right",
                                            fontWeight: 700,
                                            color: "#201F24",
                                        }}
                                    >
                                        ${b.amount.toFixed(2)}
                                    </div>
                                </div>

                                {idx !== bills.length - 1 && (
                                    <div
                                        style={{
                                            height: 1,
                                            background: "#F2F2F2",
                                            margin: "0 16px",
                                        }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

function SummaryCard({ label, value, borderColor }) {
    return (
        <div
            style={{
                flex: 1,
                minWidth: 220,
                padding: 20,
                borderRadius: 8,
                background: "#F8F4F0",
                borderLeft: `4px solid ${borderColor}`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: 14,
            }}
        >
            <span style={{ color: "#696868" }}>{label}</span>
            <span style={{ fontWeight: 700, color: "#201F24" }}>{value}</span>
        </div>
    );
}
