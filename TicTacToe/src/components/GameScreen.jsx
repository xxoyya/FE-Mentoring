// src/components/GameScreen.jsx
import Board from "./Board";
import ScoreBoard from "./ScoreBoard";

export default function GameScreen({
                                       mode,
                                       playerMark,
                                       board,
                                       turn,
                                       scores,
                                       onCellClick,
                                       onRestartClick,
                                       onBackToMenu,
                                   }) {
    const isPlayerX = playerMark === "X";

    return (
        <div style={{ maxWidth: 540 }}>
            {/* 상단 바 */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 20,
                    alignItems: "center",
                }}
            >
                {/* 로고 */}
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ color: "#31C3BD", fontSize: 32, fontWeight: 700 }}>
            X
          </span>
                    <span style={{ color: "#F2B137", fontSize: 32, fontWeight: 700 }}>
            O
          </span>
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
                        color: "#A8BFC9",
                        fontWeight: 700,
                        letterSpacing: 1,
                    }}
                >
                    {turn} TURN
                </div>

                {/* 리스타트 버튼 */}
                <button
                    onClick={onRestartClick}
                    style={{
                        width: 52,
                        height: 52,
                        background: "#A8BFC9",
                        boxShadow: "0px -4px 0px #6B8997 inset",
                        borderRadius: 10,
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    ⟳
                </button>
            </div>

            {/* 보드 */}
            <Board board={board} onCellClick={onCellClick} />

            {/* 점수판 */}
            <ScoreBoard
                leftLabel={`X (${mode === "cpu" && isPlayerX ? "YOU" : "P1"})`}
                middleLabel={"TIES"}
                rightLabel={`O (${mode === "cpu" && !isPlayerX ? "CPU" : "P2"})`}
                scores={scores}
            />

            {/* (선택) 메인으로 돌아가기 버튼 하나 더 두고 싶으면 */}
            <button
                onClick={onBackToMenu}
                style={{
                    marginTop: 24,
                    border: "none",
                    background: "transparent",
                    color: "#A8BFC9",
                    cursor: "pointer",
                }}
            >
                BACK TO MENU
            </button>
        </div>
    );
}
