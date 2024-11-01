/* eslint-disable react/prop-types */
import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Player({ value }) {
  return <h3>{value}</h3>;
}

function Board({ xIsNext, squares, newSquares, onPlay }) {
  function handleClick(i) {
    if (newSquares[i] || winner(squares)) return;
    onPlay(i);
  }

  const winner2 = winner(squares);
  let status = "";
  if (winner2) {
    status = "Winner : " + winner2;
  } else {
    status = "Next Turn : " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="board">
      <Player value={status} />
      <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
      <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
      <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
      <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
      <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
      <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
      <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
    </div>
  );
}

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [history, setHistory] = useState([Array(9).fill("")]);
  const [currentMove, setCurrentMove] = useState(0);
  const newSquares = squares.slice();

  function handlePlay(i) {
    const newHistory = history.slice(0, currentMove + 1);
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setHistory([...newHistory, newSquares]);
    setXIsNext(!xIsNext);
    setCurrentMove(currentMove + 1);
  }

  function handleHistory(i) {
    const newHistory = history.slice(0, i + 1);
    setSquares(newHistory[newHistory.length - 1]);
    setXIsNext(newHistory.length % 2 != 0);
    setCurrentMove(i);
  }

  const moves = history.map((h, i) => {
    let description = "";
    if (i > 0) {
      description = `Go To Move #${i}`;
    } else {
      description = `Game Start`;
    }

    return (
      <li key={i}>
        <button onClick={() => handleHistory(i)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={squares}
          newSquares={newSquares}
          onPlay={handlePlay}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function winner(squares) {
  const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winCondition.length; i++) {
    let [a, b, c] = winCondition[i];
    if (squares[a] && squares[a] == squares[b] && squares[a] == squares[c]) {
      return squares[a];
    }
  }
  return false;
}
