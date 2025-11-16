// src/components/StartScreen.jsx
import { useState } from "react";
import XColor from "../assets/X_color.png";
import OColor from "../assets/O_color.png";
import XDark from "../assets/X_dark.png";
import ODark from "../assets/O_dark.png";
import XLight from "../assets/X_light.png";
import OLight from "../assets/O_light.png";

const CARD_WIDTH = 460;
const INNER_WIDTH = 412; // 선택 바 & 버튼 공통 너비

export default function StartScreen({
                                        playerMark,
                                        onChangeMark,
                                        onStartGame,
                                    }) {
    const [hoverButton, setHoverButton] = useState(null); // "cpu" | "pvp" | null

    const titleTextStyle = {
        fontFamily: "Outfit, system-ui, sans-serif",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "1px",
        color: "#A8BFC9",
    };

    const buttonBase = {
        width: "100%",
        height: 67,
        borderRadius: 15,
        border: "none",
        cursor: "pointer",
        fontFamily: "Outfit, system-ui, sans-serif",
        fontWeight: 700,
        fontSize: 20,
        letterSpacing: "1.25px",
        textTransform: "uppercase",
    };

    const getCpuButtonStyle = () => {
        const isHover = hoverButton === "cpu";
        return {
            ...buttonBase,
            background: isHover ? "#FFC860" : "#F2B137",
            boxShadow: "0px -8px 0px #CC8B13 inset",
            color: "#1A2A33",
        };
    };

    const getPvpButtonStyle = () => {
        const isHover = hoverButton === "pvp";
        return {
            ...buttonBase,
            background: isHover ? "#65E9E4" : "#31C3BD",
            boxShadow: "0px -8px 0px #118C87 inset",
            color: "#1A2A33",
        };
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 32,
            }}
        >
            {/* XO 로고 */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 12,
                }}
            >
                <img
                    src={XColor}
                    alt="X logo"
                    style={{ width: 32, height: 32 }}
                />
                <img
                    src={OColor}
                    alt="O logo"
                    style={{ width: 32, height: 32 }}
                />
            </div>

            {/* 큰 카드: PICK PLAYER 1'S MARK */}
            <div
                style={{
                    width: CARD_WIDTH,
                    background: "#1F3641",
                    borderRadius: 15,
                    boxShadow: "0px 8px 0px #10212A",
                    padding: "32px 24px 32px 24px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 24,
                }}
            >
                {/* 타이틀 */}
                <div style={{ ...titleTextStyle, fontSize: 16 }}>
                    PICK PLAYER 1’S MARK
                </div>

                {/* X / O 선택 바 */}
                <div
                    style={{
                        width: INNER_WIDTH,
                        height: 72,
                        background: "#1A2A33",
                        borderRadius: 10,
                        padding: 8,
                        display: "flex",
                        gap: 8,
                    }}
                >
                    {/* X 버튼 */}
                    <button
                        onClick={() => onChangeMark("X")}
                        style={{
                            flex: 1,
                            border: "none",
                            borderRadius: 10,
                            cursor: "pointer",
                            background:
                                playerMark === "X" ? "#A8BFC9" : "transparent",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <img
                            src={playerMark === "X" ? XDark : XLight}
                            alt="X"
                            style={{ width: 32, height: 32 }}
                        />
                    </button>

                    {/* O 버튼 */}
                    <button
                        onClick={() => onChangeMark("O")}
                        style={{
                            flex: 1,
                            border: "none",
                            borderRadius: 10,
                            cursor: "pointer",
                            background:
                                playerMark === "O" ? "#A8BFC9" : "transparent",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <img
                            src={playerMark === "O" ? ODark : OLight}
                            alt="O"
                            style={{ width: 32, height: 32 }}
                        />
                    </button>
                </div>

                {/* REMEMBER : X GOES FIRST */}
                <div
                    style={{
                        fontFamily: "Outfit, system-ui, sans-serif",
                        fontWeight: 400,
                        fontSize: 14,
                        letterSpacing: "0.88px",
                        color: "#A8BFC9",
                        textTransform: "uppercase",
                    }}
                >
                    REMEMBER : X GOES FIRST
                </div>
            </div>

            {/* 🔽 카드 밖, 선택바와 같은 너비(INNER_WIDTH)를 가진 버튼 그룹 */}
            <div
                style={{
                    width: CARD_WIDTH + 50,
                    display: "flex",
                    flexDirection: "column",
                    gap: 20,
                    marginTop: 4,
                }}
            >
                {/* NEW GAME (VS CPU) */}
                <button
                    style={getCpuButtonStyle()}
                    onMouseEnter={() => setHoverButton("cpu")}
                    onMouseLeave={() => setHoverButton(null)}
                    onClick={() => onStartGame("cpu")}
                >
                    NEW GAME (VS CPU)
                </button>

                {/* NEW GAME (VS PLAYER) */}
                <button
                    style={getPvpButtonStyle()}
                    onMouseEnter={() => setHoverButton("pvp")}
                    onMouseLeave={() => setHoverButton(null)}
                    onClick={() => onStartGame("pvp")}
                >
                    NEW GAME (VS PLAYER)
                </button>
            </div>
        </div>
    );
}
