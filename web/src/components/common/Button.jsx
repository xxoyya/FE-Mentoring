// src/components/common/Button.jsx
export default function Button({
                                   children,
                                   type = "button",
                                   onClick,
                                   style,
                               }) {
    return (
        <button
            type={type}
            onClick={onClick}
            style={{
                padding: "12px 16px",
                width: "100%",
                borderRadius: 8,
                border: "none",
                backgroundColor: "#201F24", // 검정 버튼
                color: "#ffffff",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                ...style,
            }}
        >
            {children}
        </button>
    );
}
