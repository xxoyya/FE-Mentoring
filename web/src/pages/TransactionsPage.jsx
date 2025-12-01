// src/pages/TransactionsPage.jsx
import DashboardLayout from "../layouts/DashboardLayout";

const cardStyle = {
    background: "#FFFFFF",
    borderRadius: 12,
    padding: 32,
};

const labelStyle = {
    fontSize: 12,
    color: "#696868",
    marginBottom: 8,
};

const pillStyle = {
    padding: "8px 16px",
    borderRadius: 8,
    border: "1px solid #98908B",
    fontSize: 14,
    color: "#201F24",
    background: "#FFFFFF",
};

export default function TransactionsPage() {
    return (
        <DashboardLayout activeMenu="transactions">
            <div
                style={{
                    padding: 32,
                    display: "flex",
                    flexDirection: "column",
                    gap: 24,
                }}
            >
                {/* 페이지 타이틀 */}
                <h1
                    style={{
                        fontSize: 32,
                        fontWeight: 700,
                        color: "#201F24",
                    }}
                >
                    Transactions
                </h1>

                {/* 검색 + 필터 바 */}
                <div style={{ ...cardStyle, padding: 24, gap: 24 }}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: 24,
                            alignItems: "center",
                        }}
                    >
                        {/* 검색창 */}
                        <div style={{ width: 320 }}>
                            <div style={labelStyle}>Search</div>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 12,
                                    padding: "12px 20px",
                                    borderRadius: 8,
                                    border: "1px solid #98908B",
                                }}
                            >
                                <input
                                    placeholder="Search transaction"
                                    style={{
                                        border: "none",
                                        outline: "none",
                                        flex: 1,
                                        fontSize: 14,
                                        color: "#201F24",
                                    }}
                                />
                                <span style={{ fontSize: 16 }}>🔍</span>
                            </div>
                        </div>

                        {/* 오른쪽 필터 2개 */}
                        <div
                            style={{
                                display: "flex",
                                gap: 24,
                                alignItems: "center",
                                marginLeft: "auto",
                            }}
                        >
                            {/* Sort by */}
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <span style={{ fontSize: 14, color: "#696868" }}>Sort by</span>
                                <button style={pillStyle}>
                                    Latest <span style={{ marginLeft: 8 }}>▾</span>
                                </button>
                            </div>

                            {/* Category */}
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <span style={{ fontSize: 14, color: "#696868" }}>Category</span>
                                <button style={pillStyle}>
                                    All Transactions <span style={{ marginLeft: 8 }}>▾</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* 테이블 헤더 */}
                    <div
                        style={{
                            marginTop: 24,
                            padding: "12px 16px",
                            borderBottom: "1px solid #F2F2F2",
                            display: "flex",
                            gap: 32,
                            color: "#696868",
                            fontSize: 12,
                        }}
                    >
                        <div style={{ flex: 1 }}>Recipient / Sender</div>
                        <div style={{ width: 120 }}>Category</div>
                        <div style={{ width: 120 }}>Transaction Date</div>
                        <div style={{ width: 200, textAlign: "right" }}>Amount</div>
                    </div>

                    {/* 예시 행들 */}
                    {[
                        {
                            name: "Emma Richardson",
                            category: "General",
                            date: "19 Aug 2024",
                            amount: "+$75.50",
                            positive: true,
                        },
                        {
                            name: "Savory Bites Bistro",
                            category: "Dining Out",
                            date: "19 Aug 2024",
                            amount: "-$55.50",
                        },
                        {
                            name: "Daniel Carter",
                            category: "General",
                            date: "18 Aug 2024",
                            amount: "-$42.30",
                        },
                    ].map((tx, idx) => (
                        <div key={idx}>
                            <div
                                style={{
                                    padding: "12px 16px",
                                    display: "flex",
                                    gap: 32,
                                    alignItems: "center",
                                }}
                            >
                                {/* 이름 */}
                                <div
                                    style={{
                                        flex: 1,
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 16,
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: "50%",
                                            background: "#F8F4F0",
                                        }}
                                    />
                                    <div
                                        style={{
                                            fontSize: 14,
                                            fontWeight: 700,
                                            color: "#201F24",
                                        }}
                                    >
                                        {tx.name}
                                    </div>
                                </div>

                                {/* 카테고리 */}
                                <div
                                    style={{
                                        width: 120,
                                        fontSize: 12,
                                        color: "#696868",
                                    }}
                                >
                                    {tx.category}
                                </div>

                                {/* 날짜 */}
                                <div
                                    style={{
                                        width: 120,
                                        fontSize: 12,
                                        color: "#696868",
                                    }}
                                >
                                    {tx.date}
                                </div>

                                {/* 금액 */}
                                <div
                                    style={{
                                        width: 200,
                                        textAlign: "right",
                                        fontSize: 14,
                                        fontWeight: 700,
                                        color: tx.positive ? "#277C78" : "#201F24",
                                    }}
                                >
                                    {tx.amount}
                                </div>
                            </div>
                            {idx !== 2 && (
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

                    {/* 페이지네이션 */}
                    <div
                        style={{
                            marginTop: 24,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <button style={pillStyle}>
                            <span style={{ marginRight: 8 }}>◀</span> Prev
                        </button>

                        <div style={{ display: "flex", gap: 8 }}>
                            {[1, 2, 3, 4, 5].map((n) => (
                                <button
                                    key={n}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 8,
                                        border: n === 2 ? "none" : "1px solid #98908B",
                                        background: n === 2 ? "#201F24" : "#FFFFFF",
                                        color: n === 2 ? "#FFFFFF" : "#201F24",
                                        fontSize: 14,
                                    }}
                                >
                                    {n}
                                </button>
                            ))}
                        </div>

                        <button style={pillStyle}>
                            Next <span style={{ marginLeft: 8 }}>▶</span>
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
