// src/App.jsx
import { useState, useEffect } from "react";
import Layout from "./components/Layout";
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";
import Modal from "./components/Modal";

const emptyBoard = Array(9).fill(null);

function App() {
    // 화면: "menu" | "game"
    const [screen, setScreen] = useState("menu");

    // X / O 중 플레이어1 마크
    const [playerMark, setPlayerMark] = useState("X"); // "X" or "O"

    // "cpu" | "pvp"
    const [mode, setMode] = useState(null);

    // 게임 상태
    const [board, setBoard] = useState(emptyBoard);
    const [turn, setTurn] = useState("X");
    const [scores, setScores] = useState({ X: 0, O: 0, ties: 0 });

    // 모달 상태: { type: "win" | "lose" | "tie" | "restart" | null, winner?: "X"|"O" }
    const [modal, setModal] = useState({ type: null, winner: null });

    // ✅ 게임 시작 버튼 눌렀을 때
    const handleStartGame = (selectedMode) => {
        setMode(selectedMode);       // "cpu" or "pvp"
        setScreen("game");
        setBoard(emptyBoard);
        setTurn("X");                // 항상 X부터
        setModal({ type: null, winner: null });
    };

    // ✅ 보드 클릭
    const handleCellClick = (index) => {
        if (board[index] || modal.type) return; // 이미 채워져 있거나 모달 떠 있으면 무시

        const nextBoard = [...board];
        nextBoard[index] = turn;
        setBoard(nextBoard);

        const winner = getWinner(nextBoard);
        const isBoardFull = nextBoard.every((cell) => cell !== null);

        // 승리/무승부 체크
        if (winner) {
            setScores((prev) => ({ ...prev, [winner]: prev[winner] + 1 }));
            setModal({
                type: "win",
                winner,
            });
            return;
        } else if (isBoardFull) {
            setScores((prev) => ({ ...prev, ties: prev.ties + 1 }));
            setModal({ type: "tie", winner: null });
            return;
        }

        // 턴 교체
        const nextTurn = turn === "X" ? "O" : "X";
        setTurn(nextTurn);
    };

    // ✅ CPU 모드: 내 턴 끝나고 CPU 턴이면 랜덤 위치 선택
    useEffect(() => {
        if (mode !== "cpu") return;
        if (modal.type) return;

        const isPlayerTurn = turn === playerMark;
        if (isPlayerTurn) return;

        // CPU 턴
        const emptyIndexes = board
            .map((cell, idx) => (cell === null ? idx : null))
            .filter((x) => x !== null);

        if (emptyIndexes.length === 0) return;

        const timeout = setTimeout(() => {
            const randomIndex =
                emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
            handleCellClick(randomIndex);
        }, 400); // 살짝 딜레이

        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [turn, board, mode, playerMark, modal.type]);

    // ✅ 다음 라운드 (점수 유지, 보드만 리셋)
    const handleNextRound = () => {
        setBoard(emptyBoard);
        setTurn("X");
        setModal({ type: null, winner: null });
    };

    // ✅ 게임 전체 리셋 (점수까지)
    const handleRestartGame = () => {
        setModal({ type: "restart", winner: null });
    };

    const confirmRestart = () => {
        setBoard(emptyBoard);
        setTurn("X");
        setScores({ X: 0, O: 0, ties: 0 });
        setModal({ type: null, winner: null });
    };

    const cancelRestart = () => {
        setModal({ type: null, winner: null });
    };

    // ✅ 메인 메뉴로 돌아가기
    const goToMenu = () => {
        setScreen("menu");
        setMode(null);
        setBoard(emptyBoard);
        setTurn("X");
        setModal({ type: null, winner: null });
    };

    return (
        <Layout>
            {screen === "menu" && (
                <StartScreen
                    playerMark={playerMark}
                    onChangeMark={setPlayerMark}
                    onStartGame={handleStartGame}
                />
            )}

            {screen === "game" && (
                <GameScreen
                    mode={mode}
                    playerMark={playerMark}
                    board={board}
                    turn={turn}
                    scores={scores}
                    onCellClick={handleCellClick}
                    onRestartClick={handleRestartGame}
                    onBackToMenu={goToMenu}
                />
            )}

            <Modal
                modal={modal}
                playerMark={playerMark}
                onNextRound={handleNextRound}
                onQuit={goToMenu}
                onConfirmRestart={confirmRestart}
                onCancelRestart={cancelRestart}
            />
        </Layout>
    );
}

// ✅ 승리 체크 함수
function getWinner(board) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
}

export default App;
