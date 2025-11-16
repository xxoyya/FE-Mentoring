// src/components/ScoreBoard.jsx
export default function ScoreBoard({
                                       leftLabel,
                                       middleLabel,
                                       rightLabel,
                                       scores,
                                   }) {
    return (
        <div style={{ display: "flex", gap: 20 }}>
            <ScoreBox
                bg="#31C3BD"
                label={leftLabel}
                value={scores.X}
            />
            <ScoreBox bg="#A8BFC9" label={middleLabel} value={scores.ties} />
            <ScoreBox bg="#F2B137" label={rightLabel} value={scores.O} />
        </div>
    );
}

function ScoreBox({ bg, label, value }) {
    return (
        <div
            style={{
                flex: 1,
                height: 72,
                background: bg,
                borderRadius: 15,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "#1A2A33",
            }}
        >
            <div
                style={{
                    fontSize: 14,
                    fontWeight: 400,
                    letterSpacing: 0.88,
                }}
            >
                {label}
            </div>
            <div
                style={{
                    fontSize: 24,
                    fontWeight: 700,
                    letterSpacing: 1.5,
                    marginTop: 4,
                }}
            >
                {value}
            </div>
        </div>
    );
}
