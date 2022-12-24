import React, {useState, useEffect} from "react";
import { Borad } from "./components/Borad";
import Modal from "./components/Modal";
import { ResetBtn } from "./components/ResetBtn";
import { ScoreBorad } from "./components/ScoreBorad";


function App() {

  const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const [borad, setBorad] = useState(Array(9).fill(null));
  const [oPlaying, setOplaying] = useState(false);
  const [score, setScore] = useState({xScore: 0, oScore: 0, tie: 0});
  const [gameOver, setGameOver] = useState(false);
  // const [isEmpty, setIsEmpty] = useState(false);
  const [noWinner, setNoWinner] = useState(true);
  let [moves, setMoves] = useState({keyMoves: 0});
  const [myTurn, setMyTurn] = useState(true);
  let {keyMoves} = moves;
  const handleBoxClick = (boxIndex) => {
    const updatedBorad = borad.map((value, index) => {
      if (index === boxIndex) {
        keyMoves++;
        setMoves({keyMoves});
        return oPlaying === false ? "X" : "O";
      } else {
        return value;
      }
    });
    if (keyMoves > 5) {
      checkWinner(updatedBorad);
    }
    setBorad(updatedBorad);
    setMyTurn(false);
    setOplaying(!oPlaying);
  }

  if (noWinner) {
    if (!myTurn) {
      console.log('loka');
      setTimeout(() => {
        makeComputerMove();  
      }, 100);
    }
  }
  if (!noWinner) {
    setTimeout(() => {
      resetBorad();
    }, 2000);
  }

  const isInArray = (element, array) => {
    if (array.indexOf(element) > -1) {
        return true;
    }
    return false;
  }

  const getFreeCells = (borad) => {
    let resultArray = [];
    if (!myTurn) {
      for (let i = 0; i < borad.length; i++) {
        if (borad[i] === null) {
          resultArray.push(i)
        }
      }        
    }
    return resultArray;
  }
  // console.log("okay = " + borad.slice(6,9));
  const getRowValues = function (index) {
    let i = index * 3;
    return borad.slice(i, i + 3);
  }; 

  const getRowIndices = function (index) {
    var row = [];
    index = index * 3;
    row.push(index);
    row.push(index + 1);
    row.push(index + 2);
    return row;
  };

  const getColumnValues = function (index) {
    let column = [];
    for (let i = index; i < borad.length; i += 3) {
        column.push(borad[i]);
    }
    return column;
  };

  const getColumnIndices = function (index) {
    let column = [];
    for (let i = index; i < borad.length; i += 3) {
        column.push(i);
    }
    return column;
  };

  const getDiagValues = function (arg) {
    var cells = [];
    if (arg !== 1 && arg !== 0) {
        console.error("Wrong arg for getDiagValues!");
        return undefined;
    } else if (arg === 0) {
        cells.push(borad[0]);
        cells.push(borad[4]);
        cells.push(borad[8]);
    } else {
        cells.push(borad[2]);
        cells.push(borad[4]);
        cells.push(borad[6]);
    }
    return cells;
  };

  const getDiagIndices = function (arg) {
    if (arg !== 1 && arg !== 0) {
        console.error("Wrong arg for getDiagIndices!");
        return undefined;
    } else if (arg === 0) {
        return [0, 4, 8];
    } else {
        return [2, 4, 6];
    }
  };

  // let freeCells = getFreeCells(borad);
  // let rowI = getDiagValues(1);
  // for (let i = 0; i < freeCells.length; i++) {
  //   console.log(freeCells[i]);
  //   if (isInArray(freeCells[i], rowI)) {
  //     console.log(freeCells[i]);
  //   }      
  // }
  // console.log(rowI);

    // console.log("rowI = " + rowI);
  

  // for (let j = 0; j < 3; j++) {
  //   let rowV = getRowValues(1);
  //   // console.log("rowV = " + rowV);
  //   console.log(rowV.length);
  // }

  const getFirstWithTwoInARow = function () {
    if (!oPlaying && oPlaying ) {
      console.error("Function getFirstWithTwoInARow accepts only player or computer as argument.");
      return undefined;
    }
    // console.log(agent);
    // let sum = agent * 2, 
      let freeCells = getFreeCells(borad);
    // console.log(sum);
    for (let i = 0; i < freeCells.length; i++) {
      for (let j = 0; j < 3; j++) {
        let rowV = getRowValues(j),
            rowI = getRowIndices(j),
            colV = getColumnValues(j),
            colI = getColumnIndices(j);
        if ((((rowV[0] === rowV[1]) || (rowV[0] === rowV[2]) || (rowV[1] === rowV[2])) && ((rowV[0] && rowV[1]) || (rowV[0] && rowV[2]) || (rowV[1] && rowV[2])) && isInArray(freeCells[i], rowI))) {
          if (rowV[0] === "O" || rowV[1] === "O" || rowV[2] === "O")  {
            return freeCells[i];
          }  else if (rowV[0] === "X" || rowV[1] === "X" || rowV[2] === "X") {
            return freeCells[i];
          }
          // return freeCells[i];
        } else if ((((colV[0] === colV[1]) || (colV[0] === colV[2]) || (colV[1] === colV[2])) && ((colV[0] && colV[1]) || (colV[0] && colV[2]) || (colV[1] && colV[2])) && isInArray(freeCells[i], colI))) {
          if (colV[0] === "O" || colV[1] === "O" || colV[2] === "O")  {
            return freeCells[i];
          }  else if(colV[0] === "X" || colV[1] === "X" || colV[2] === "X") {
            return freeCells[i];
          } 
        }
      };
      for (let j = 0; j < 2; j++) {
        let diagV = getDiagValues(j),
            diagI = getDiagIndices(j);
        if ((((diagV[0] && diagV[1]) || (diagV[0] && diagV[2]) || (diagV[1] && diagV[2])) && ((diagV[0] === diagV[1]) || (diagV[0] === diagV[2]) || (diagV[1] === diagV[2])) && isInArray(freeCells[i], diagI))) {
          if (diagV[0] === "O" || diagV[1] === "O" || diagV[2] === "O")  {
            return freeCells[i];
          }  else if(diagV[0] === "X" || diagV[1] === "X" || diagV[2] === "X") {
            return freeCells[i];
          }
        }
      }
    }
    return false;
  };

  // const sumArray = (array) => {
  //   var sum = 0,
  //       i = 0;
  //   for (i = 0; i < array.length; i++) {
  //       sum += array[i];
  //   }
  //   return sum;
  // }

  let ni = "O";
  console.log(ni);
  useEffect(() => {
     checkTie(borad);
  }, [borad])

  useEffect(()=> {
    getFreeCells(borad);
  }, [borad])

  const checkWinner = (borad) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const [x,y,z] = WIN_CONDITIONS[i];

      if (borad[x] && borad[x] === borad[y] && borad[y] === borad[z]) {
        // console.log(borad[x])
        setGameOver(true);
        setNoWinner(false);
        if (borad[x] === "O") {
          let {oScore} = score;
          oScore++;
          //spread operator spreads out the values in score and updates oScore
          setScore({...score, oScore})
        } else  if(borad[x] === "X"){
          let {xScore} = score;
          xScore++;
          setScore({...score, xScore})
        }
        return borad[x];
      }
    }
  }
  const checkTie = (borad) => {
    let draw = borad.includes(null)
    if (noWinner) {
      if(!draw){
        let {tie} = score;
        tie += 1;
        console.log(tie);
        setScore({...score, tie})
        setTimeout(() => {
          resetBorad();
        }, 1000);
      };       
    }
  }
  const resetBorad = () => {
    setGameOver(false);
    setOplaying(false);
    setBorad(Array(9).fill(null));
    setMyTurn(true);
    setNoWinner(true)
  }
function intRandom(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

const makeComputerMove = () => {
  if (gameOver) {
    return false;
  }
  let computer = 3,
    player = 1;
  let cell = -1,
      myArr = [],
      corners = [0,2,6,8];
  if (keyMoves >= 3) {
    cell = getFirstWithTwoInARow();
    // if (cell === false) {
    //   cell = getFirstWithTwoInARow();
    // }
    if (cell === false) {
      if (borad[4] === 0) {
          cell = 4;
      } else {
          myArr = getFreeCells(borad);
          cell = myArr[intRandom(0, myArr.length - 1)];
      }
    }
    if (keyMoves === 3 && borad[4] === computer) {
      if (borad[7] === player && (borad[0] === player || borad[2] === player)) {
          myArr = [6,8];
          cell = myArr[intRandom(0,1)];
      }
      else if (borad[5] === player && (borad[0] === player || borad[6] === player)) {
          myArr = [2,8];
          cell = myArr[intRandom(0,1)];
      }
      else if (borad[3] === player && (borad[2] === player || borad[8] === player)) {
          myArr = [0,6];
          cell = myArr[intRandom(0,1)];
      }
      else if (borad[1] === player && (borad[6] === player || borad[8] === player)) {
          myArr = [0,2];
          cell = myArr[intRandom(0,1)];
      }
    }
    else if (keyMoves === 3 && borad[4] === player) {
      if (borad[2] === player && borad[6] === computer) {
          cell = 8;
      }
      else if (borad[0] === player && borad[8] === computer) {
          cell = 6;
      }
      else if (borad[8] === player && borad[0] === computer) {
          cell = 2;
      }
      else if (borad[6] === player && borad[2] === computer) {
          cell = 0;
      }
    }
  } else if (keyMoves === 1 && borad[4] !== null) {
    cell = corners[intRandom(0,3)]
  } else if (keyMoves === 2 && borad[4] === "X") {
    if (borad[0] === "O") {
      cell = 8;
    }
    else if (borad[2] === "O") {
      cell = 6;
    }
    else if (borad[6] === "O") {
      cell = 2;
    }
    else if (borad[8] === "O") {
      cell = 0;
    }
  } else {
    if (borad[4] === null) {
      cell = 4;
    } else {
      myArr = getFreeCells(borad);
      cell = myArr[intRandom(0, myArr.length - 1)];
    }
  } 
  keyMoves++;
  handleBoxClick(cell);
  setMyTurn(true);
}

  return (
    <div>
      <ScoreBorad score={score} oPlaying={oPlaying}/>
      <Borad borad={borad} onClick={gameOver ? resetBorad : handleBoxClick}/>
      <ResetBtn resetBorad={resetBorad}/>
      <h1 className='text-4xl font-bold'>minutes of the TICTAC</h1>
      <Modal />
    </div>
  );
}

export default App;
