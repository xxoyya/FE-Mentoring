// src/components/Modal.jsx
import X_BIG from "../assets/X_color_big.png";
import O_BIG from "../assets/O_color_big.png";

export default function Modal({
                                  modal,
                                  playerMark,
                                  onNextRound,
                                  onQuit,
                                  onConfirmRestart,
                                  onCancelRestart,
                              }) {
    if (!modal.type) return null;

    const isWin = modal.type === "win" && modal.winner === playerMark;
    const isLose = modal.type === "win" && modal.winner !== playerMark;
    const isTie = modal.type === "tie";
    const isRestart = modal.type === "restart";

    const getBigIcon = () => {
        if (!modal.winner) return null;
        return modal.winner === "X" ? X_BIG : O_BIG;
    };

    // 공통 오버레이 + 전체 가로 바
    const Overlay = ({ children }) => (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 20,
                fontFamily: "Outfit, system-ui, sans-serif",
            }}
        >
            <div
                style={{
                    width: "100%",
                    background: "#1F3641",
                    boxShadow: "0px -8px 0px #10212A inset",
                    padding: "40px 0",
                }}
            >
                <div
                    style={{
                        maxWidth: 500,
                        margin: "0 auto",
                        minHeight: 220,                      // ⭐ 세로 높이 고정
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",            // ⭐ 항상 세로 중앙 정렬
                        alignItems: "center",
                        gap: 20,
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );


    // ──────────────── 무승부 모달 ────────────────
    if (isTie) {
        return (
            <Overlay>
                <div
                    style={{
                        color: "#A8BFC9",
                        fontSize: 40,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: 1.5,
                    }}
                >
                    ROUND TIED
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 16,
                        marginTop: 8,
                    }}
                >
                    <button
                        onClick={onQuit}
                        style={{
                            width: 80,
                            height: 52,
                            borderRadius: 10,
                            background: "#A8BFC9",
                            boxShadow: "0px -4px 0px #6B8997 inset",
                            border: "none",
                            fontSize: 16,
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: 1,
                            color: "#1A2A33",
                            cursor: "pointer",
                        }}
                    >
                        Quit
                    </button>
                    <button
                        onClick={onNextRound}
                        style={{
                            width: 150,
                            height: 52,
                            borderRadius: 10,
                            background: "#F2B137",
                            boxShadow: "0px -4px 0px #CC8B13 inset",
                            border: "none",
                            fontSize: 16,
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: 1,
                            color: "#1A2A33",
                            cursor: "pointer",
                        }}
                    >
                        Next Round
                    </button>
                </div>
            </Overlay>
        );
    }

    // ──────────────── 재시작 모달 ────────────────
    if (isRestart) {
        return (
            <Overlay>
                <div
                    style={{
                        color: "#A8BFC9",
                        fontSize: 40,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: 1.5,
                        marginBottom: 8,
                    }}
                >
                    RESTART GAME?
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 16,
                        marginTop: 8,
                    }}
                >
                    <button
                        onClick={onCancelRestart}
                        style={{
                            width: 140,
                            height: 52,
                            borderRadius: 10,
                            background: "#A8BFC9",
                            boxShadow: "0px -4px 0px #6B8997 inset",
                            border: "none",
                            fontSize: 16,
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: 1,
                            color: "#1A2A33",
                            cursor: "pointer",
                        }}
                    >
                        No, cancel
                    </button>
                    <button
                        onClick={onConfirmRestart}
                        style={{
                            width: 170,
                            height: 52,
                            borderRadius: 10,
                            background: "#F2B137",
                            boxShadow: "0px -4px 0px #CC8B13 inset",
                            border: "none",
                            fontSize: 16,
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: 1,
                            color: "#1A2A33",
                            cursor: "pointer",
                        }}
                    >
                        Yes, restart
                    </button>
                </div>
            </Overlay>
        );
    }

    // ──────────────── 승/패 모달 ────────────────
    return (
        <Overlay>
            <div
                style={{
                    color: "#A8BFC9",
                    fontSize: 16,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                }}
            >
                {isWin ? "YOU WON!" : "OH NO, YOU LOST..."}
            </div>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 24,
                }}
            >
                <img
                    src={getBigIcon()}
                    alt="winner"
                    style={{ width: 60, height: 60 }}
                />
                <span
                    style={{
                        color: "#F2B137",
                        fontSize: 40,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: 2.5,
                    }}
                >
          TAKES THE ROUND
        </span>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 16,
                    marginTop: 8,
                }}
            >
                <button
                    onClick={onQuit}
                    style={{
                        width: 80,
                        height: 52,
                        borderRadius: 10,
                        background: "#A8BFC9",
                        boxShadow: "0px -4px 0px #6B8997 inset",
                        border: "none",
                        fontSize: 16,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        color: "#1A2A33",
                        cursor: "pointer",
                    }}
                >
                    Quit
                </button>
                <button
                    onClick={onNextRound}
                    style={{
                        width: 150,
                        height: 52,
                        borderRadius: 10,
                        background: "#F2B137",
                        boxShadow: "0px -4px 0px #CC8B13 inset",
                        border: "none",
                        fontSize: 16,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        color: "#1A2A33",
                        cursor: "pointer",
                    }}
                >
                    Next Round
                </button>
            </div>
        </Overlay>
    );
}
