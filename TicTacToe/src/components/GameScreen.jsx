// src/components/GameScreen.jsx
import { useState } from "react";

// 로고 / 마크 아이콘
import XColor from "../assets/X_color.png";
import OColor from "../assets/O_color.png";
import XColorBig from "../assets/X_color_big.png";
import OColorBig from "../assets/O_color_big.png";
import XEmpty from "../assets/X_empty.png";
import OEmpty from "../assets/O_empty.png";
import XDark from "../assets/X_dark.png";
import ODark from "../assets/O_dark.png";

// 리스타트 버튼
import RedoIcon from "../assets/redo.png";

export default function GameScreen({
                                       mode,             // "cpu" | "pvp"
                                       playerMark,       // "X" | "O"  (플레이어1 마크)
                                       board,            // [9]
                                       turn,             // 현재 턴 "X" | "O"
                                       scores,           // { X, O, ties }
                                       onCellClick,
                                       onRestartClick,
                                       onBackToMenu,     // 지금은 안 쓰지만 prop은 그대로 둠
                                   }) {
    const [hoverIndex, setHoverIndex] = useState(null);

    // --------- 라벨 텍스트 ---------
    const isCpuMode = mode === "cpu";

    const xLabel = isCpuMode
        ? playerMark === "X"
            ? "X (YOU)"
            : "X (CPU)"
        : playerMark === "X"
            ? "X (P1)"
            : "X (P2)";

    const oLabel = isCpuMode
        ? playerMark === "O"
            ? "O (YOU)"
            : "O (CPU)"
        : playerMark === "O"
            ? "O (P1)"
            : "O (P2)";

    // CPU 턴일 땐 hover 프리뷰 안 보이게
    const isPlayerTurn = turn === playerMark || !isCpuMode;

    // --------- 스타일 공통 ---------
    const cellSize = 140;

    const cellStyle = {
        width: cellSize,
        height: cellSize,
        background: "#1F3641",
        boxShadow: "0px -8px 0px #10212A inset",
        borderRadius: 15,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "transform 0.1s ease, box-shadow 0.1s ease",
    };

    const headerTextStyle = {
        fontFamily: "Outfit, system-ui, sans-serif",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "1px",
        color: "#A8BFC9",
    };

    const buttonTextStyle = {
        fontFamily: "Outfit, system-ui, sans-serif",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "1px",
        color: "#1A2A33",
    };

    return (
        <div
            style={{
                width: 600,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 24,
            }}
        >
            {/* 헤더 : 로고 / TURN / 다시하기 */}
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                {/* XO 로고 */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
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

                {/* TURN 박스 */}
                <div
                    style={{
                        width: 140,
                        height: 52,
                        background: "#1F3641",
                        boxShadow: "0px -4px 0px #10212A inset",
                        borderRadius: 10,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 12,
                    }}
                >
                    <img
                        src={turn === "X" ? XDark : ODark}
                        alt={`${turn} turn icon`}
                        style={{ width: 24, height: 24 }}
                    />
                    <span style={headerTextStyle}>TURN</span>
                </div>

                {/* 다시하기 버튼 */}
                <button
                    onClick={onRestartClick}
                    style={{
                        width: 52,
                        height: 52,
                        background: "#A8BFC9",
                        boxShadow: "0px -4px 0px #6B8997 inset",
                        borderRadius: 10,
                        border: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        padding: 0,
                    }}
                >
                    <img
                        src={RedoIcon}
                        alt="Restart game"
                        style={{ width: 24, height: 24 }}
                    />
                </button>
            </div>

            {/* 보드 */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(3, ${cellSize}px)`,
                    gap: 20,
                    marginTop: 8,
                    marginBottom: 8,
                }}
            >
                {board.map((cell, index) => {
                    // 이 칸에 실제로 보여줄 아이콘 결정
                    let iconSrc = null;

                    if (cell === "X") iconSrc = XColorBig;
                    else if (cell === "O") iconSrc = OColorBig;
                    else if (
                        cell === null &&
                        hoverIndex === index &&
                        isPlayerTurn
                    ) {
                        iconSrc = turn === "X" ? XEmpty : OEmpty;
                    }

                    const isClickable =
                        cell === null && (!isCpuMode || turn === playerMark);

                    return (
                        <div
                            key={index}
                            style={{
                                ...cellStyle,
                                cursor: isClickable ? "pointer" : "default",
                            }}
                            onClick={() =>
                                isClickable && onCellClick(index)
                            }
                            onMouseEnter={() =>
                                setHoverIndex(index)
                            }
                            onMouseLeave={() => setHoverIndex(null)}
                        >
                            {iconSrc && (
                                <img
                                    src={iconSrc}
                                    alt={cell || turn}
                                    style={{
                                        width: 64,
                                        height: 64,
                                        objectFit: "contain",
                                    }}
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* 점수판 */}
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 8,
                }}
            >
                {/* X 카드 */}
                <div
                    style={{
                        width: 140,
                        height: 72,
                        background: "#31C3BD",
                        borderRadius: 15,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <div
                        style={{
                            fontFamily: "Outfit, system-ui, sans-serif",
                            fontSize: 14,
                            fontWeight: 400,
                            letterSpacing: "0.88px",
                            color: "#1A2A33",
                        }}
                    >
                        {xLabel}
                    </div>
                    <div
                        style={{
                            fontFamily: "Outfit, system-ui, sans-serif",
                            fontSize: 24,
                            fontWeight: 700,
                            letterSpacing: "1.5px",
                            color: "#1A2A33",
                        }}
                    >
                        {scores.X}
                    </div>
                </div>

                {/* TIES 카드 */}
                <div
                    style={{
                        width: 140,
                        height: 72,
                        background: "#A8BFC9",
                        borderRadius: 15,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <div
                        style={{
                            fontFamily: "Outfit, system-ui, sans-serif",
                            fontSize: 14,
                            fontWeight: 400,
                            letterSpacing: "0.88px",
                            color: "#1A2A33",
                        }}
                    >
                        TIES
                    </div>
                    <div
                        style={{
                            fontFamily: "Outfit, system-ui, sans-serif",
                            fontSize: 24,
                            fontWeight: 700,
                            letterSpacing: "1.5px",
                            color: "#1A2A33",
                        }}
                    >
                        {scores.ties}
                    </div>
                </div>

                {/* O 카드 */}
                <div
                    style={{
                        width: 140,
                        height: 72,
                        background: "#F2B137",
                        borderRadius: 15,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <div
                        style={{
                            fontFamily: "Outfit, system-ui, sans-serif",
                            fontSize: 14,
                            fontWeight: 400,
                            letterSpacing: "0.88px",
                            color: "#1A2A33",
                        }}
                    >
                        {oLabel}
                    </div>
                    <div
                        style={{
                            fontFamily: "Outfit, system-ui, sans-serif",
                            fontSize: 24,
                            fontWeight: 700,
                            letterSpacing: "1.5px",
                            color: "#1A2A33",
                        }}
                    >
                        {scores.O}
                    </div>
                </div>
            </div>
        </div>
    );
}
