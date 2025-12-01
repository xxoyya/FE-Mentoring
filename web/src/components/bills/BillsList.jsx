// src/components/bills/BillsList.jsx
import Card from "../common/Card";
import { bills } from "../../data/bills";

export default function BillsList() {
    return (
        <Card>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Upcoming bills</div>
            <table style={{ width: "100%", fontSize: 12, borderCollapse: "collapse" }}>
                <thead>
                <tr style={{ textAlign: "left", color: "#6B7280" }}>
                    <th style={{ paddingBottom: 8 }}>Name</th>
                    <th style={{ paddingBottom: 8 }}>Amount</th>
                    <th style={{ paddingBottom: 8 }}>Due date</th>
                    <th style={{ paddingBottom: 8 }}>Status</th>
                </tr>
                </thead>
                <tbody>
                {bills.map((bill) => (
                    <tr key={bill.id}>
                        <td style={{ padding: "6px 0" }}>{bill.name}</td>
                        <td style={{ padding: "6px 0" }}>${bill.amount}</td>
                        <td style={{ padding: "6px 0" }}>{bill.dueDate}</td>
                        <td style={{ padding: "6px 0" }}>{bill.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Card>
    );
}
