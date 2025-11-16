// src/components/StartScreen.jsx
import { useState } from "react";
import XColor from "../assets/X_color.png";
import OColor from "../assets/O_color.png";
import XDark from "../assets/X_dark.png";
import ODark from "../assets/O_dark.png";
import XLight from "../assets/X_light.png";
import OLight from "../assets/O_light.png";

export default function StartScreen({ playerMark, onChangeMark, onStartGame }) {
    const [hoverBtn, setHoverBtn] = useState(null); // "cpu" | "pvp" | null

    const headerTextStyle = {
        fontFamily: "Outfit, system-ui, sans-serif",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "1px",
        color: "#A8BFC9",
    };

    const smallTextStyle = {
        fontFamily: "Outfit, system-ui, sans-serif",
        fontWeight: 400,
        fontSize: 14,
        letterSpacing: "0.88px",
        color: "#A8BFC9",
    };

    const buttonTextStyle = {
        fontFamily: "Outfit, system-ui, sans-serif",
        fontWeight: 700,
        fontSize: 20,
        textTransform: "uppercase",
        letterSpacing: "1.25px",
        color: "#1A2A33",
    };

    const outerWidth = 460;
    const buttonHeight = 67;

    const isXSelected = playerMark === "X";

    return (
        <div
            style={{
                width: outerWidth,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 32,
            }}
        >
            {/* 로고 */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 16,
                }}
            >
                <img src={XColor} alt="X logo" style={{ width: 32, height: 32 }} />
                <img src={OColor} alt="O logo" style={{ width: 32, height: 32 }} />
            </div>

            {/* 마크 선택 카드 */}
            <div
                style={{
                    width: "100%",
                    background: "#1F3641",
                    boxShadow: "0px -8px 0px #10212A inset",
                    borderRadius: 15,
                    padding: "24px 24px 32px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 24,
                }}
            >
                <div style={headerTextStyle}>PICK PLAYER 1’S MARK</div>

                {/* X / O 선택 바 */}
                <div
                    style={{
                        width: "100%",
                        height: 72,
                        background: "#1A2A33",
                        borderRadius: 10,
                        display: "flex",
                        padding: 8,
                        gap: 8,
                    }}
                >
                    {/* X 버튼 */}
                    <button
                        onClick={() => onChangeMark("X")}
                        style={{
                            flex: 1,
                            borderRadius: 10,
                            border: "none",
                            cursor: "pointer",
                            background: isXSelected ? "#A8BFC9" : "transparent",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 0,
                        }}
                    >
                        <img
                            src={isXSelected ? XDark : XLight}
                            alt="X mark"
                            style={{ width: 32, height: 32 }}
                        />
                    </button>

                    {/* O 버튼 */}
                    <button
                        onClick={() => onChangeMark("O")}
                        style={{
                            flex: 1,
                            borderRadius: 10,
                            border: "none",
                            cursor: "pointer",
                            background: !isXSelected ? "#A8BFC9" : "transparent",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 0,
                        }}
                    >
                        <img
                            src={!isXSelected ? ODark : OLight}
                            alt="O mark"
                            style={{ width: 32, height: 32 }}
                        />
                    </button>
                </div>

                <div style={smallTextStyle}>REMEMBER : X GOES FIRST</div>
            </div>

            {/* 버튼 영역 */}
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 20,
                }}
            >
                {/* NEW GAME (VS CPU) */}
                <button
                    onClick={() => onStartGame("cpu")}
                    onMouseEnter={() => setHoverBtn("cpu")}
                    onMouseLeave={() => setHoverBtn(null)}
                    style={{
                        width: "100%",
                        height: buttonHeight,
                        borderRadius: 15,
                        border: "none",
                        cursor: "pointer",
                        background:
                            hoverBtn === "cpu" ? "#FFC860" : "#F2B137",
                        boxShadow:
                            hoverBtn === "cpu"
                                ? "0px -8px 0px #CC8B13 inset"
                                : "0px -8px 0px #CC8B13 inset",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <span style={buttonTextStyle}>NEW GAME (VS CPU)</span>
                </button>

                {/* NEW GAME (VS PLAYER) */}
                <button
                    onClick={() => onStartGame("pvp")}
                    onMouseEnter={() => setHoverBtn("pvp")}
                    onMouseLeave={() => setHoverBtn(null)}
                    style={{
                        width: "100%",
                        height: buttonHeight,
                        borderRadius: 15,
                        border: "none",
                        cursor: "pointer",
                        background:
                            hoverBtn === "pvp" ? "#65E9E4" : "#31C3BD",
                        boxShadow:
                            hoverBtn === "pvp"
                                ? "0px -8px 0px #118C87 inset"
                                : "0px -8px 0px #118C87 inset",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <span style={buttonTextStyle}>NEW GAME (VS PLAYER)</span>
                </button>
            </div>
        </div>
    );
}
