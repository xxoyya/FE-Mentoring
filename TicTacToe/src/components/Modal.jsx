// src/components/Modal.jsx
export default function Modal({
                                  modal,
                                  playerMark,
                                  onNextRound,
                                  onQuit,
                                  onConfirmRestart,
                                  onCancelRestart,
                              }) {
    if (!modal.type) return null;

    const isRestart = modal.type === "restart";
    const isTie = modal.type === "tie";
    const winner = modal.winner;

    let title = "";
    let subtitle = "";

    if (isRestart) {
        title = "RESTART GAME?";
    } else if (isTie) {
        title = "ROUND TIED";
    } else if (winner) {
        const youWon = winner === playerMark;
        title = youWon ? "YOU WON!" : "OH NO, YOU LOST…";
        subtitle = `${winner} TAKES THE ROUND`;
    }

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.6)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    width: 1000,
                    maxWidth: "100%",
                    background: "#1F3641",
                    padding: "32px 40px",
                    boxShadow: "0px -8px 0px #10212A inset",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 16,
                }}
            >
                {isRestart ? null : (
                    <div
                        style={{
                            color: "#A8BFC9",
                            fontSize: 14,
                            letterSpacing: 0.88,
                            textTransform: "uppercase",
                        }}
                    >
                        {isTie ? "" : modal.winner === playerMark ? "YOU WON!" : "OH NO, YOU LOST…"}
                    </div>
                )}

                <div
                    style={{
                        color: "#A8BFC9",
                        fontSize: 24,
                        fontWeight: 700,
                        letterSpacing: 1.5,
                        textTransform: "uppercase",
                        marginBottom: 16,
                    }}
                >
                    {isRestart ? "RESTART GAME?" : isTie ? "ROUND TIED" : subtitle}
                </div>

                <div style={{ display: "flex", gap: 16 }}>
                    {/* 왼쪽 버튼 */}
                    <button
                        style={{
                            width: 140,
                            height: 52,
                            borderRadius: 10,
                            border: "none",
                            cursor: "pointer",
                            background: "#A8BFC9",
                            boxShadow: "0px -4px 0px #6B8997 inset",
                            color: "#1A2A33",
                            fontWeight: 700,
                            letterSpacing: 1,
                        }}
                        onClick={isRestart ? onCancelRestart : onQuit}
                    >
                        {isRestart ? "NO, CANCEL" : "QUIT"}
                    </button>

                    {/* 오른쪽 버튼 */}
                    <button
                        style={{
                            width: 140,
                            height: 52,
                            borderRadius: 10,
                            border: "none",
                            cursor: "pointer",
                            background: "#F2B137",
                            boxShadow: "0px -4px 0px #CC8B13 inset",
                            color: "#1A2A33",
                            fontWeight: 700,
                            letterSpacing: 1,
                        }}
                        onClick={isRestart ? onConfirmRestart : onNextRound}
                    >
                        {isRestart ? "YES, RESTART" : "NEXT ROUND"}
                    </button>
                </div>
            </div>
        </div>
    );
}
