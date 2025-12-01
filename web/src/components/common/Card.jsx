// src/components/common/Card.jsx
export default function Card({ children, style }) {
    return (
        <div
            style={{
                background: "#FFFFFF",
                borderRadius: "24px",
                padding: "20px",
                boxShadow: "0 10px 20px rgba(15, 23, 42, 0.08)",
                border: "1px solid #E5E7EB",
                ...style,
            }}
        >
            {children}
        </div>
    );
}
