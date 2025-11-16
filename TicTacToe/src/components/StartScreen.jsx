// src/components/StartScreen.jsx
import MarkSelector from "./MarkSelector";

export default function StartScreen({ playerMark, onChangeMark, onStartGame }) {
    return (
        <div style={{ width: 460, margin: "0 auto", maxWidth: 460 }}>
            {/* XO 로고는 편한대로 */}
            <div
                style={{
                    display: "flex",
                    gap: 8,
                    marginBottom: 40,
                    alignItems: "center",
                }}
            >
                <span style={{ color: "#31C3BD", fontSize: 32, fontWeight: 700 }}>X</span>
                <span style={{ color: "#F2B137", fontSize: 32, fontWeight: 700 }}>O</span>
            </div>

            {/* 마크 선택 카드 */}
            <div
                style={{
                    width: 460,
                    height: 205,
                    background: "#1F3641",
                    boxShadow: "0px -8px 0px #10212A inset",
                    borderRadius: 15,
                    padding: "24px",
                    marginBottom: 24,
                }}
            >
                <div
                    style={{
                        textAlign: "center",
                        color: "#A8BFC9",
                        fontSize: 16,
                        fontWeight: 700,
                        letterSpacing: 1,
                        textTransform: "uppercase",
                        marginBottom: 24,
                    }}
                >
                    PICK PLAYER 1’S MARK
                </div>

                <MarkSelector value={playerMark} onChange={onChangeMark} />

                <div
                    style={{
                        textAlign: "center",
                        color: "#A8BFC9",
                        fontSize: 14,
                        fontWeight: 400,
                        letterSpacing: 0.88,
                        marginTop: 20,
                    }}
                >
                    REMEMBER : X GOES FIRST
                </div>
            </div>

            {/* 버튼 두 개 */}
            <button
                style={primaryButtonStyle("#F2B137", "#CC8B13")}
                onClick={() => onStartGame("cpu")}
            >
                NEW GAME (VS CPU)
            </button>

            <button
                style={{ ...primaryButtonStyle("#31C3BD", "#118C87"), marginTop: 20 }}
                onClick={() => onStartGame("pvp")}
            >
                NEW GAME (VS PLAYER)
            </button>
        </div>
    );
}

const primaryButtonStyle = (bg, shadow) => ({
    width: 460,
    height: 67,
    borderRadius: 15,
    border: "none",
    cursor: "pointer",
    background: bg,
    boxShadow: `0px -8px 0px ${shadow} inset`,
    color: "#1A2A33",
    fontSize: 20,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 1.25,
    marginTop: 0,
});
