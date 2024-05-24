import { useState } from 'react';

// 一つのマスについての関数
function Square({value, onSquareClick}) {

  return (
  <button 
    className="square"
    onClick={onSquareClick}
  >
    {value}
  </button>
 );
}

// ボード全体についての関数
function Board({xIsNext, squares, onPlay}) {
  const winner = calculateWinner(squares); 

  function handleClick (i) {
    if(squares[i] || winner){
      return; // 値がnull、もしくはどちらかのプレイヤーが勝利した場合、何も行わない
    }
    const nextSquares = squares.slice(); // sliceメソッドを引数なしで使用して配列をコピー
    if(xIsNext){
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O"
    }
    onPlay(nextSquares);
  }
  // ゲームが決着したかを確かめ、勝利したプレイヤー、もしくは次のプレイヤーを表示
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return( 
    <>
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

    </>
    )
  }
// ゲームの履歴全体を保持する関数 (トップレベルコンポーネント)
export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]); // [Array(9).fill(null)] -> []によって9つの要素を持った配列をさらに配列化する
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  
  function handlePlay(nextSquares) {
    // 過去にさかのぼった場合、戻った時点から先に上書きしていくように進める
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]; // ...(スプレッド構文): historyすべての項目を表す
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);  
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key="move">
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
  
  // squaresを受け取り勝利判定をする関数
function calculateWinner(squares) {
  const lines = [ // 勝利条件の設定
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
