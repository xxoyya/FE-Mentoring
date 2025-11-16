import { useEffect, useState } from "react";
import "./App.css";

const LINES = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function checkWinner(board) {
    for (const [a, b, c] of LINES) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return { winner: board[a], line: [a, b, c] };
        }
    }
    if (board.every((cell) => cell)) {
        return { winner: null, line: [] }; // tie
    }
    return { winner: undefined, line: [] }; // game continues
}

function Chip({ label }) {
    return (
        <div className="chip">
            <span className="chip-label">{label}</span>
        </div>
    );
}

function PrimaryButton({ color = "yellow", children, ...props }) {
    return (
        <button className={`primary-btn primary-btn--${color}`} {...props}>
            {children}
        </button>
    );
}

function SecondaryButton({ variant = "yellow", children, ...props }) {
    return (
        <button className={`secondary-btn secondary-btn--${variant}`} {...props}>
            {children}
        </button>
    );
}

function Modal({ type, winnerMark, onQuit, onNextRound, onCancel, onRestart }) {
    if (!type) return null;

    let title = "";
    let subtitle = "";
    let showNext = false;
    let showRestart = false;

    if (type === "roundResult") {
        showNext = true;
        if (winnerMark) {
            title = winnerMark === "X" ? "PLAYER 1 WINS!" : "PLAYER 2 WINS!";
            subtitle = `${winnerMark} TAKES THE ROUND`;
        } else {
            title = "";
            subtitle = "ROUND TIED";
        }
    } else if (type === "restart") {
        showRestart = true;
        subtitle = "RESTART GAME?";
    }

    return (
        <div className="modal-backdrop">
            <div className="modal">
                {title && <p className="modal-title">{title}</p>}
                <p className="modal-subtitle">{subtitle}</p>
                <div className="modal-actions">
                    {type === "roundResult" && (
                        <>
                            <SecondaryButton variant="gray" onClick={onQuit}>
                                QUIT
                            </SecondaryButton>
                            <PrimaryButton color="yellow" onClick={onNextRound}>
                                NEXT ROUND
                            </PrimaryButton>
                        </>
                    )}
                    {type === "restart" && (
                        <>
                            <SecondaryButton variant="gray" onClick={onCancel}>
                                NO, CANCEL
                            </SecondaryButton>
                            <PrimaryButton color="yellow" onClick={onRestart}>
                                YES, RESTART
                            </PrimaryButton>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

function Board({ board, winningLine, onClickCell }) {
    return (
        <div className="board">
            {board.map((cell, idx) => {
                const isWinner = winningLine.includes(idx);
                return (
                    <button
                        key={idx}
                        className={`cell ${isWinner ? "cell--winner" : ""}`}
                        onClick={() => onClickCell(idx)}
                    >
                        {cell && <span className={`cell-mark cell-mark--${cell}`}>{cell}</span>}
                    </button>
                );
            })}
        </div>
    );
}

function ScorePanel({ gameType, scores }) {
    // scores = { X: number, O: number, ties: number }
    return (
        <div className="score-bar">
            <div className="score-card score-card--teal">
                <p className="score-label">
                    X {gameType === "cpu" ? "(YOU)" : "(P1)"}
                </p>
                <p className="score-value">{scores.X}</p>
            </div>
            <div className="score-card score-card--light">
                <p className="score-label">TIES</p>
                <p className="score-value">{scores.ties}</p>
            </div>
            <div className="score-card score-card--yellow">
                <p className="score-label">
                    O {gameType === "cpu" ? "(CPU)" : "(P2)"}
                </p>
                <p className="score-value">{scores.O}</p>
            </div>
        </div>
    );
}

function TurnChip({ currentPlayer }) {
    return (
        <div className="turn-chip">
            <span className={`turn-icon turn-icon--${currentPlayer}`}>{currentPlayer}</span>
            <span className="turn-text">TURN</span>
        </div>
    );
}

function Header({ currentPlayer, onRestartClick }) {
    return (
        <header className="game-header">
            <div className="logo">
                <span className="logo-x">X</span>
                <span className="logo-o">O</span>
            </div>
            <TurnChip currentPlayer={currentPlayer} />
            <button className="restart-btn" onClick={onRestartClick}>
                ↻
            </button>
        </header>
    );
}

function StartScreen({ onStartCpu, onStartPvp }) {
    return (
        <div className="start-screen">
            <div className="logo logo--center">
                <span className="logo-x">X</span>
                <span className="logo-o">O</span>
            </div>

            <div className="pick-card">
                <p className="pick-title">PICK PLAYER 1’S MARK</p>
                <div className="pick-toggle">
                    <button className="pick-option pick-option--active">X</button>
                    <button className="pick-option">O</button>
                </div>
                <p className="pick-helper">REMEMBER : X GOES FIRST</p>
            </div>

            <PrimaryButton color="yellow" onClick={onStartCpu}>
                NEW GAME (VS CPU)
            </PrimaryButton>
            <PrimaryButton color="teal" onClick={onStartPvp}>
                NEW GAME (VS PLAYER)
            </PrimaryButton>
        </div>
    );
}

function App() {
    const [screen, setScreen] = useState("menu"); // 'menu' | 'game'
    const [gameType, setGameType] = useState("cpu"); // 'cpu' | 'pvp'
    const [board, setBoard] = useState(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState("X");
    const [scores, setScores] = useState({ X: 0, O: 0, ties: 0 });
    const [modalType, setModalType] = useState(null); // 'roundResult' | 'restart' | null
    const [roundWinner, setRoundWinner] = useState(null); // 'X' | 'O' | null
    const [winningLine, setWinningLine] = useState([]);
    const [isCpuTurn, setIsCpuTurn] = useState(false);

    const isCpuGame = gameType === "cpu";
    const humanMark = "X";
    const cpuMark = "O";

    const resetBoard = () => {
        setBoard(Array(9).fill(null));
        setWinningLine([]);
        setCurrentPlayer("X");
        setIsCpuTurn(isCpuGame && cpuMark === "X"); // 거의 없지만 일단
    };

    const startGame = (type) => {
        setGameType(type);
        setScores({ X: 0, O: 0, ties: 0 });
        resetBoard();
        setScreen("game");
    };

    const handleCellClick = (index) => {
        if (board[index]) return;
        if (modalType) return;
        if (isCpuGame && isCpuTurn) return;

        const nextBoard = [...board];
        nextBoard[index] = currentPlayer;
        playTurn(nextBoard, currentPlayer);
    };

    const playTurn = (nextBoard, playerWhoPlayed) => {
        setBoard(nextBoard);
        const result = checkWinner(nextBoard);

        if (result.winner !== undefined) {
            // game finished (win or tie)
            if (result.winner) {
                setWinningLine(result.line);
                setScores((prev) => ({
                    ...prev,
                    [result.winner]: prev[result.winner] + 1,
                }));
            } else {
                setScores((prev) => ({ ...prev, ties: prev.ties + 1 }));
            }
            setRoundWinner(result.winner ?? null);
            setModalType("roundResult");
            return;
        }

        // game continues
        const nextPlayer = playerWhoPlayed === "X" ? "O" : "X";
        setCurrentPlayer(nextPlayer);

        if (isCpuGame) {
            if (nextPlayer === cpuMark) {
                setIsCpuTurn(true);
            } else {
                setIsCpuTurn(false);
            }
        }
    };

    // CPU move
    useEffect(() => {
        if (!isCpuGame || !isCpuTurn || modalType) return;

        const timeout = setTimeout(() => {
            setBoard((prevBoard) => {
                const empties = prevBoard
                    .map((cell, idx) => (cell ? null : idx))
                    .filter((idx) => idx !== null);
                if (empties.length === 0) return prevBoard;

                const choice =
                    empties[Math.floor(Math.random() * empties.length)];
                const nextBoard = [...prevBoard];
                nextBoard[choice] = cpuMark;
                playTurn(nextBoard, cpuMark);
                return nextBoard;
            });
            setIsCpuTurn(false);
        }, 450);

        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCpuTurn, isCpuGame, modalType]);

    const handleNextRound = () => {
        setModalType(null);
        setRoundWinner(null);
        resetBoard();
    };

    const handleQuit = () => {
        setModalType(null);
        setRoundWinner(null);
        setScreen("menu");
        setBoard(Array(9).fill(null));
        setScores({ X: 0, O: 0, ties: 0 });
        setWinningLine([]);
    };

    const openRestartModal = () => {
        setModalType("restart");
    };

    const handleRestartCancel = () => {
        setModalType(null);
    };

    const handleRestartConfirm = () => {
        setModalType(null);
        setRoundWinner(null);
        setScores({ X: 0, O: 0, ties: 0 });
        resetBoard();
    };

    return (
        <div className="app">
            {screen === "menu" && (
                <StartScreen
                    onStartCpu={() => startGame("cpu")}
                    onStartPvp={() => startGame("pvp")}
                />
            )}

            {screen === "game" && (
                <>
                    <Header currentPlayer={currentPlayer} onRestartClick={openRestartModal} />
                    <Board
                        board={board}
                        winningLine={winningLine}
                        onClickCell={handleCellClick}
                    />
                    <ScorePanel gameType={gameType} scores={scores} />
                </>
            )}

            <Modal
                type={modalType === "roundResult" ? "roundResult" : modalType}
                winnerMark={roundWinner}
                onQuit={handleQuit}
                onNextRound={handleNextRound}
                onCancel={handleRestartCancel}
                onRestart={handleRestartConfirm}
            />
        </div>
    );
}

export default App;
