// src/components/Board.jsx
export default function Board({ board, onCellClick }) {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 140px)",
                gridTemplateRows: "repeat(3, 140px)",
                gap: 20,
                marginBottom: 24,
            }}
        >
            {board.map((cell, idx) => (
                <button
                    key={idx}
                    onClick={() => onCellClick(idx)}
                    style={{
                        width: 140,
                        height: 140,
                        background: "#1F3641",
                        boxShadow: "0px -8px 0px #10212A inset",
                        borderRadius: 15,
                        border: "none",
                        cursor: cell ? "default" : "pointer",
                        fontSize: 72,
                        fontWeight: 700,
                        color: cell === "X" ? "#31C3BD" : "#F2B137",
                    }}
                >
                    {cell}
                </button>
            ))}
        </div>
    );
}
