// src/components/StartScreen.jsx
import XLogo from "../assets/X_color.png";
import OLogo from "../assets/O_color.png";

import XDark from "../assets/X_dark.png";
import XLight from "../assets/X_light.png";
import ODark from "../assets/O_dark.png";
import OLight from "../assets/O_light.png";

export default function StartScreen({ playerMark, onChangeMark, onStartGame }) {
    const isX = playerMark === "X";

    const xIcon = isX ? XDark : XLight;   // X 선택됨 → X_dark
    const oIcon = isX ? OLight : ODark;   // O 선택됨 → O_dark

    return (
        <div
            style={{
                width: 460,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 24,
            }}
        >
            {/* 로고 X O */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 16,
                    marginBottom: 24,
                }}
            >
                <img src={XLogo} alt="X logo" style={{ width: 32, height: 32 }} />
                <img src={OLogo} alt="O logo" style={{ width: 32, height: 32 }} />
            </div>

            {/* 마크 선택 카드 */}
            <div
                style={{
                    width: "100%",
                    background: "#1F3641",
                    boxShadow: "0px -8px 0px #10212A inset",
                    borderRadius: 15,
                    padding: "24px 24px 30px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 24,
                }}
            >
                <div
                    style={{
                        color: "#A8BFC9",
                        fontSize: 16,
                        fontFamily: "Outfit, system-ui, sans-serif",
                        fontWeight: 700,
                        letterSpacing: 1,
                        textTransform: "uppercase",
                    }}
                >
                    PICK PLAYER 1’S MARK
                </div>

                {/* X / O 토글 영역 */}
                <div
                    style={{
                        width: "100%",
                        background: "#1A2A33",
                        borderRadius: 10,
                        padding: 8,
                        display: "flex",
                        gap: 8,
                    }}
                >
                    {/* X 버튼 */}
                    <button
                        type="button"
                        onClick={() => onChangeMark("X")}
                        style={{
                            flex: 1,
                            height: 54,
                            borderRadius: 10,
                            border: "none",
                            outline: "none",
                            cursor: "pointer",
                            background: isX ? "#A8BFC9" : "transparent",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <img
                            src={xIcon}
                            alt="X mark"
                            style={{ width: 32, height: 32 }}
                        />
                    </button>

                    {/* O 버튼 */}
                    <button
                        type="button"
                        onClick={() => onChangeMark("O")}
                        style={{
                            flex: 1,
                            height: 54,
                            borderRadius: 10,
                            border: "none",
                            outline: "none",
                            cursor: "pointer",
                            background: !isX ? "#A8BFC9" : "transparent",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <img
                            src={oIcon}
                            alt="O mark"
                            style={{ width: 32, height: 32 }}
                        />
                    </button>
                </div>

                <div
                    style={{
                        color: "#A8BFC9",
                        fontSize: 14,
                        fontFamily: "Outfit, system-ui, sans-serif",
                        fontWeight: 400,
                        letterSpacing: 0.88,
                        textTransform: "uppercase",
                        opacity: 1,
                    }}
                >
                    REMEMBER : X GOES FIRST
                </div>
            </div>

            {/* NEW GAME (VS CPU) 버튼 */}
            <button
                type="button"
                onClick={() => onStartGame("cpu")}
                style={{
                    marginTop: 24,
                    width: "100%",
                    height: 67,
                    borderRadius: 15,
                    border: "none",
                    outline: "none",
                    cursor: "pointer",
                    background: "#F2B137",
                    boxShadow: "0px -8px 0px #CC8B13 inset",
                    color: "#1A2A33",
                    fontSize: 20,
                    fontFamily: "Outfit, system-ui, sans-serif",
                    fontWeight: 700,
                    letterSpacing: 1.25,
                    textTransform: "uppercase",
                }}
            >
                NEW GAME (VS CPU)
            </button>

            {/* NEW GAME (VS PLAYER) 버튼 */}
            <button
                type="button"
                onClick={() => onStartGame("pvp")}
                style={{
                    width: "100%",
                    height: 67,
                    borderRadius: 15,
                    border: "none",
                    outline: "none",
                    cursor: "pointer",
                    background: "#31C3BD",
                    boxShadow: "0px -8px 0px #118C87 inset",
                    color: "#1A2A33",
                    fontSize: 20,
                    fontFamily: "Outfit, system-ui, sans-serif",
                    fontWeight: 700,
                    letterSpacing: 1.25,
                    textTransform: "uppercase",
                }}
            >
                NEW GAME (VS PLAYER)
            </button>
        </div>
    );
}
