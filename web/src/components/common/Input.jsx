// src/components/common/Input.jsx
export default function Input({ label, ...props }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {label && (
                <label
                    style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#696868",
                    }}
                >
                    {label}
                </label>
            )}
            <input
                {...props}
                style={{
                    padding: "12px 20px",
                    borderRadius: 8,
                    border: "1px solid #98908B",
                    outline: "none",
                }}
            />
        </div>
    );
}
