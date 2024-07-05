import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>{value}</button>
  )
}

export default function TicTaeToe() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({playerX: 0, playerO: 0, draws: 0});
  const newSquares = squares.slice();

  const winner = calculateWinner(squares);
  let status = '';

  // Check if Board is Full
  function isBoardFull(squares) {
    return newSquares.every(square => square !== null);
  }

  // X-O Click Handler
  function handleClick(i) {
    if (squares[i]) {
      return;
    } else if (calculateWinner(squares)) {
      scoreHandler();
      return;
    }
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  } 

  // Status Handler
  function statusHandler() {
    if (!isBoardFull(newSquares) && !winner) {
      status = "Next player: " + (xIsNext ? "X" : "O");
    } 
    else if (!isBoardFull(newSquares) && winner || isBoardFull(newSquares) && winner) {
      status = "Winner: " + winner;
    } 
    else if (isBoardFull(newSquares) && !winner) {
      status = "Draw!";
    }
  }
  statusHandler();

  // Score Handler
  function scoreHandler() {
    if (!isBoardFull(newSquares) && winner || isBoardFull(newSquares) && winner) {
      if (winner === "X") {
        setScores(prevScores => ({ ...prevScores, playerX: prevScores.playerX + 1 }));
        reset();
      } 
      if (winner === "O") {
        setScores(prevScores => ({ ...prevScores, playerO: prevScores.playerO + 1 }));
        reset();
      }
    } 
    else if (isBoardFull(newSquares) && !winner) {
      setScores(prevScores => ({ ...prevScores, draws: prevScores.draws + 1 }));
      reset();
    }
  }

  // Restart Function
  function resClick() {
    scoreHandler();
    reset();
  }

  function reset() {
    for (let i = 0; i < newSquares.length; i++) {
      newSquares[i] = null;
    }
    setSquares(newSquares);
  }

  return ( 
    <div className="game">
      <h3>Tic Tae Toe</h3>
      <div className="game-board">
        <div className="status">{status}</div>
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
        <button className="resBtn" onClick={resClick}>Restart</button>
      </div>
      <div className="game-info">
        <p>X Wins: {scores.playerX}</p>
        <p>O Wins: {scores.playerO}</p>
        <p>Draws: {scores.draws}</p>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
      return squares[a];
  }
  return null;
}