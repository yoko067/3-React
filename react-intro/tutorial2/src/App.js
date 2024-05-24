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

// ボード全体についての関数(メイン)
export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null)); // 初期値は9個のnullを持った配列を初期値とする
  const [xIsNext, setXIsNext] = useState(true); // OかXかを判断
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
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
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
