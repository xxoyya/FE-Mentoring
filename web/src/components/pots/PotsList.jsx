// src/components/pots/PotsList.jsx
import Card from "../common/Card";
import { pots } from "../../data/pots";

export default function PotsList() {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
            {pots.map((pot) => {
                const progress = Math.min(100, Math.round((pot.saved / pot.target) * 100));
                return (
                    <Card key={pot.id}>
                        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{pot.name}</div>
                        <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 8 }}>
                            ${pot.saved.toLocaleString()} of ${pot.target.toLocaleString()}
                        </div>
                        <div
                            style={{
                                height: 8,
                                borderRadius: 999,
                                background: "#E5E7EB",
                                overflow: "hidden",
                                marginBottom: 4,
                            }}
                        >
                            <div
                                style={{
                                    width: `${progress}%`,
                                    height: "100%",
                                    background: "#22C55E",
                                }}
                            />
                        </div>
                        <div style={{ fontSize: 11, color: "#6B7280" }}>{progress}%</div>
                    </Card>
                );
            })}
        </div>
    );
}
