// src/pages/PotsPage.jsx
import DashboardLayout from "../layouts/DashboardLayout";

const cardStyle = {
    background: "#FFFFFF",
    borderRadius: 12,
    padding: 32,
};

export default function PotsPage() {
    const pots = [
        {
            name: "Savings",
            color: "#277C78",
            saved: 159,
            target: 300,
        },
        {
            name: "Gift",
            color: "#82C9D7",
            saved: 40,
            target: 100,
        },
        {
            name: "Concert Ticket",
            color: "#626070",
            saved: 110,
            target: 150,
        },
        {
            name: "New Laptop",
            color: "#F2CDAC",
            saved: 10,
            target: 900,
        },
    ];

    return (
        <DashboardLayout activeMenu="pots">
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
                    Pots
                </h1>

                <div style={{ ...cardStyle, display: "flex", flexDirection: "column", gap: 24 }}>
                    {/* 상단 요약 */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: 24,
                            alignItems: "center",
                        }}
                    >
                        <div
                            style={{
                                padding: 16,
                                borderRadius: 12,
                                background: "#F8F4F0",
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
                                    background: "#277C78",
                                }}
                            />
                            <div>
                                <div
                                    style={{ fontSize: 14, color: "#696868", marginBottom: 4 }}
                                >
                                    Total Saved
                                </div>
                                <div
                                    style={{ fontSize: 32, fontWeight: 700, color: "#201F24" }}
                                >
                                    $850
                                </div>
                            </div>
                        </div>

                        <button
                            style={{
                                marginLeft: "auto",
                                padding: "12px 20px",
                                borderRadius: 8,
                                border: "1px solid #98908B",
                                background: "#FFFFFF",
                                fontSize: 14,
                                color: "#201F24",
                            }}
                        >
                            + Add new pot
                        </button>
                    </div>

                    {/* Pot 리스트 */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                            gap: 16,
                        }}
                    >
                        {pots.map((pot) => {
                            const ratio = Math.min(pot.saved / pot.target, 1);
                            return (
                                <div
                                    key={pot.name}
                                    style={{
                                        padding: 20,
                                        borderRadius: 12,
                                        background: "#F8F4F0",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 12,
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 8,
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: 8,
                                                    height: 8,
                                                    borderRadius: "50%",
                                                    background: pot.color,
                                                }}
                                            />
                                            <span
                                                style={{
                                                    fontSize: 14,
                                                    fontWeight: 700,
                                                    color: "#201F24",
                                                }}
                                            >
                        {pot.name}
                      </span>
                                        </div>
                                        <span style={{ fontSize: 12, color: "#696868" }}>
                      Target ${pot.target}
                    </span>
                                    </div>

                                    {/* progress bar */}
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
                                                background: pot.color,
                                            }}
                                        />
                                    </div>

                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            fontSize: 12,
                                            color: "#696868",
                                        }}
                                    >
                                        <span>Saved</span>
                                        <span>
                      ${pot.saved.toFixed(2)} ({Math.round(ratio * 100)}%)
                    </span>
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
