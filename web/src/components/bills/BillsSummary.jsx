// src/components/bills/BillsSummary.jsx
export default function BillsSummary() {
    return (
        <div
            style={{
                padding: 32,
                background: "#FFFFFF",
                borderRadius: 12,
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
                <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#201F24" }}>
                    Recurring Bills
                </h2>
                <span style={{ fontSize: 14, color: "#696868" }}>See Details</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div
                    style={{
                        background: "#F8F4F0",
                        padding: 16,
                        borderRadius: 8,
                        borderLeft: "4px solid #277C78",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <span style={{ color: "#696868" }}>Paid Bills</span>
                    <span style={{ fontWeight: 700, color: "#201F24" }}>$190.00</span>
                </div>

                <div
                    style={{
                        background: "#F8F4F0",
                        padding: 16,
                        borderRadius: 8,
                        borderLeft: "4px solid #F2CDAC",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <span style={{ color: "#696868" }}>Total Upcoming</span>
                    <span style={{ fontWeight: 700, color: "#201F24" }}>$194.98</span>
                </div>

                <div
                    style={{
                        background: "#F8F4F0",
                        padding: 16,
                        borderRadius: 8,
                        borderLeft: "4px solid #82C9D7",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <span style={{ color: "#696868" }}>Due Soon</span>
                    <span style={{ fontWeight: 700, color: "#201F24" }}>$59.98</span>
                </div>
            </div>
        </div>
    );
}
