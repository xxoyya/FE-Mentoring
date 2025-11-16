// src/components/MarkSelector.jsx
export default function MarkSelector({ value, onChange }) {
    const isX = value === "X";

    const base = {
        width: 198,
        height: 54,
        borderRadius: 10,
        border: "none",
        cursor: "pointer",
        fontSize: 32,
        fontWeight: 700,
    };

    return (
        <div
            style={{
                width: 412,
                height: 72,
                background: "#1A2A33",
                borderRadius: 10,
                display: "flex",
                padding: 8,
                gap: 8,
                margin: "0 auto",
            }}
        >
            <button
                type="button"
                onClick={() => onChange("X")}
                style={{
                    ...base,
                    background: isX ? "#A8BFC9" : "transparent",
                    color: isX ? "#1A2A33" : "#A8BFC9",
                }}
            >
                X
            </button>
            <button
                type="button"
                onClick={() => onChange("O")}
                style={{
                    ...base,
                    background: !isX ? "#A8BFC9" : "transparent",
                    color: !isX ? "#1A2A33" : "#A8BFC9",
                }}
            >
                O
            </button>
        </div>
    );
}
