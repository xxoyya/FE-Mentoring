// src/components/common/SectionHeader.jsx
export default function SectionHeader({ title, subtitle, actionText }) {
    return (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{title}</div>
                {subtitle && <div style={{ fontSize: 12, color: "#6B7280" }}>{subtitle}</div>}
            </div>
            {actionText && (
                <button
                    style={{
                        borderRadius: "999px",
                        padding: "6px 12px",
                        border: "1px solid #D1D5DB",
                        fontSize: 12,
                        background: "white",
                        cursor: "pointer",
                    }}
                >
                    {actionText}
                </button>
            )}
        </div>
    );
}
