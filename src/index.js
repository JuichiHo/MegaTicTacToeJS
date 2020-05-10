import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square(props) {
  
  return (
    <button 
      className="square" 
      onClick={props.onClick}
      disabled={props.disabled}
      style={props.style}
    >
        {props.value}
    </button>
  );
}


class SubBoard extends React.Component {

  renderSquare(a,b) {
    return (
      
        <Square 
          disabled={this.props.disabled}
          onClick={() => {this.props.onClick(a,b)}}
          value={this.props.value[b]}
          style={this.props.gridLayoutSquares[b]}
        />
      
    );
  }
  
  render() {
    
    return (
      <div 
      className='sub_board'
      style={this.props.style[this.props.a]}
      >
          {this.renderSquare(this.props.a,0)}
          {this.renderSquare(this.props.a,1)}
          {this.renderSquare(this.props.a,2)}
          {this.renderSquare(this.props.a,3)}
          {this.renderSquare(this.props.a,4)}
          {this.renderSquare(this.props.a,5)}
          {this.renderSquare(this.props.a,6)}
          {this.renderSquare(this.props.a,7)}
          {this.renderSquare(this.props.a,8)}
      </div>
    );
  }
}


class Board extends React.Component {
  
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleRetryClick = this.handleRetryClick.bind(this);
    this.handleForwardClick = this.handleForwardClick.bind(this);
    this.state = {
      history: [
        {
          disableSub_board: [
            false,false,false,
            false,false,false,
            false,false,false,
          ], //массив хранящий какие  вкл или выкл саб_борады
          boardSquaresValues: [ // массив хранящий в себе Х или О в маленьких бордах,кто выиграл в борде и как зарисовывать борд в случае выиграша
            [null,null,null,null,null,null,null,null,null,'',],//0
            [null,null,null,null,null,null,null,null,null,'',],//1
            [null,null,null,null,null,null,null,null,null,'',],//2
            [null,null,null,null,null,null,null,null,null,'',],//3
            [null,null,null,null,null,null,null,null,null,'',],//4
            [null,null,null,null,null,null,null,null,null,'',],//5
            [null,null,null,null,null,null,null,null,null,'',],//6
            [null,null,null,null,null,null,null,null,null,'',],//7
            [null,null,null,null,null,null,null,null,null,'',],//8
          ],
          boardWinValues: [   // массив хранящий в себе Х или О на большом борде
            null,null,null,
            null,null,null,
            null,null,null,
            '',
          ],
          xIsNext: true,
        },
        // {
          // disableSub_board: [
            // false,false,false,
            // false,false,false,
            // false,false,false,
          // ],
          // boardSquaresValues: [ 
            // [null,null,null,null,null,null,null,null,null,'',],//0
            // [null,null,null,null,null,null,null,null,null,'',],//1
            // [null,null,null,null,null,null,null,null,null,'',],//2
            // [null,null,null,null,null,null,null,null,null,'',],//3
            // [null,null,null,null,null,null,null,null,null,'',],//4
            // [null,null,null,null,null,null,null,null,null,'',],//5
            // [null,null,null,null,null,null,null,null,null,'',],//6
            // [null,null,null,null,null,null,null,null,null,'',],//7
            // [null,null,null,null,null,null,null,null,null,'',],//8
          // ],
          // boardWinValues: [ 
            // null,null,null,
            // null,null,null,
            // null,null,null,
            // '',
          // ],
          // xIsNext: true,
        // }
      ],
      stepNumber: 0, 
      //xIsNext: true,
      gridLayout: [
        { 
           borderRight: '4px solid black',
          borderBottom: '4px solid black',
            borderLeft: '4px solid rgba(0, 0, 0, 0)',
             borderTop: '4px solid rgba(0, 0, 0, 0)',
        },
        { 
           borderRight: '4px solid black',
          borderBottom: '4px solid black',
            borderLeft: '4px solid black',
             borderTop: '4px solid rgba(0, 0, 0, 0)',
        },
        { 
           borderRight: '4px solid rgba(0, 0, 0, 0)',
          borderBottom: '4px solid black',
            borderLeft: '4px solid black',
             borderTop: '4px solid rgba(0, 0, 0, 0)',
        },
        { 
           borderRight: '4px solid black',
          borderBottom: '4px solid black',
            borderLeft: '4px solid rgba(0, 0, 0, 0)',
             borderTop: '4px solid black',
        },
        { 
           borderRight: '4px solid black',
          borderBottom: '4px solid black',
            borderLeft: '4px solid black',
             borderTop: '4px solid black',
        },
        { 
           borderRight: '4px solid rgba(0, 0, 0, 0)',
          borderBottom: '4px solid black',
            borderLeft: '4px solid black',
             borderTop: '4px solid black',
        },
        { 
           borderRight: '4px solid black',
          borderBottom: '4px solid rgba(0, 0, 0, 0)',
            borderLeft: '4px solid rgba(0, 0, 0, 0)',
             borderTop: '4px solid black',
        },
        { 
           borderRight: '4px solid black',
          borderBottom: '4px solid rgba(0, 0, 0, 0)',
            borderLeft: '4px solid black',
             borderTop: '4px solid black',
        },
        { 
           borderRight: '4px solid rgba(0, 0, 0, 0)',
          borderBottom: '4px solid rgba(0, 0, 0, 0)',
            borderLeft: '4px solid black',
             borderTop: '4px solid black',
        },

      ], 
      gridLayoutSquares: [
        { 
           borderRight: '2px solid black',
          borderBottom: '2px solid black',
            borderLeft: '2px solid rgba(0, 0, 0, 0)',
             borderTop: '2px solid rgba(0, 0, 0, 0)',
        },
        { 
           borderRight: '2px solid black',
          borderBottom: '2px solid black',
            borderLeft: '2px solid black',
             borderTop: '2px solid rgba(0, 0, 0, 0)',
        },
        { 
           borderRight: '2px solid rgba(0, 0, 0, 0)',
          borderBottom: '2px solid black',
            borderLeft: '2px solid black',
             borderTop: '2px solid rgba(0, 0, 0, 0)',
        },
        { 
           borderRight: '2px solid black',
          borderBottom: '2px solid black',
            borderLeft: '2px solid rgba(0, 0, 0, 0)',
             borderTop: '2px solid black',
        },
        { 
           borderRight: '2px solid black',
          borderBottom: '2px solid black',
            borderLeft: '2px solid black',
             borderTop: '2px solid black',
        },
        { 
           borderRight: '2px solid rgba(0, 0, 0, 0)',
          borderBottom: '2px solid black',
            borderLeft: '2px solid black',
             borderTop: '2px solid black',
        },
        { 
           borderRight: '2px solid black',
          borderBottom: '2px solid rgba(0, 0, 0, 0)',
            borderLeft: '2px solid rgba(0, 0, 0, 0)',
             borderTop: '2px solid black',
        },
        { 
           borderRight: '2px solid black',
          borderBottom: '2px solid rgba(0, 0, 0, 0)',
            borderLeft: '2px solid black',
             borderTop: '2px solid black',
        },
        { 
           borderRight: '2px solid rgba(0, 0, 0, 0)',
          borderBottom: '2px solid rgba(0, 0, 0, 0)',
            borderLeft: '2px solid black',
             borderTop: '2px solid black',
        },

      ], 
      gridLayoutSquaresDisabled: [
        { 
           borderRight: '2px solid lightgray',
          borderBottom: '2px solid lightgray',
            borderLeft: '2px solid rgba(0, 0, 0, 0)',
             borderTop: '2px solid rgba(0, 0, 0, 0)',
        },
        { 
           borderRight: '2px solid lightgray',
          borderBottom: '2px solid lightgray',
            borderLeft: '2px solid lightgray',
             borderTop: '2px solid rgba(0, 0, 0, 0)',
        },
        { 
           borderRight: '2px solid rgba(0, 0, 0, 0)',
          borderBottom: '2px solid lightgray',
            borderLeft: '2px solid lightgray',
             borderTop: '2px solid rgba(0, 0, 0, 0)',
        },
        { 
           borderRight: '2px solid lightgray',
          borderBottom: '2px solid lightgray',
            borderLeft: '2px solid rgba(0, 0, 0, 0)',
             borderTop: '2px solid lightgray',
        },
        { 
           borderRight: '2px solid lightgray',
          borderBottom: '2px solid lightgray',
            borderLeft: '2px solid lightgray',
             borderTop: '2px solid lightgray',
        },
        { 
           borderRight: '2px solid rgba(0, 0, 0, 0)',
          borderBottom: '2px solid lightgray',
            borderLeft: '2px solid lightgray',
             borderTop: '2px solid lightgray',
        },
        { 
           borderRight: '2px solid lightgray',
          borderBottom: '2px solid rgba(0, 0, 0, 0)',
            borderLeft: '2px solid rgba(0, 0, 0, 0)',
             borderTop: '2px solid lightgray',
        },
        { 
           borderRight: '2px solid lightgray',
          borderBottom: '2px solid rgba(0, 0, 0, 0)',
            borderLeft: '2px solid lightgray',
             borderTop: '2px solid lightgray',
        },
        { 
           borderRight: '2px solid rgba(0, 0, 0, 0)',
          borderBottom: '2px solid rgba(0, 0, 0, 0)',
            borderLeft: '2px solid lightgray',
             borderTop: '2px solid lightgray',
        },

      ], 
    }
  }

  handleClick(a,b) {
    if(this.state.history[this.state.stepNumber].boardSquaresValues[a][b] === null) {
      //console.log('======== handleClick TRIGGERED!=========')
      //Создаю глубокую копию состояния данных борда до хода
      let historyCurrentFrame = JSON.parse(JSON.stringify(this.state.history[this.state.stepNumber]));
      //разпределяю данные по переменным
      let disableSub_board = historyCurrentFrame.disableSub_board;
      let boardSquaresValues = historyCurrentFrame.boardSquaresValues;
      let boardWinValues = historyCurrentFrame.boardWinValues;
      let xIsNext = historyCurrentFrame.xIsNext;

      // console.log('HISTORY CURRENT FRAME № ' + (this.state.history.length));
      // console.log(historyCurrentFrame);
      // console.log('disableSub_board');
      // console.log(disableSub_board);
      // console.log('boardSquaresValues');
      // console.log(boardSquaresValues);
      // console.log('boardWinValues');
      // console.log(boardWinValues);
      
      //ставим символ в нужный square по координатам и передаём очередь оппоненту
      boardSquaresValues[a][b] = historyCurrentFrame.xIsNext ? 'X' : 'O';
      xIsNext = !xIsNext;
      //указываем где следующий ход
      if(boardSquaresValues[b].includes(null)) {        //если есть свободные клетки то
        disableSub_board.fill(true);                    //дисейблим всё саб борды кроме этого
        disableSub_board[b] = !disableSub_board[b];
      } else {                                              //если нет - энейблим все саб борды
        disableSub_board.fill(false);                   
      };
      //проверяем на выигрыш в сабБорде и меняем стэйт если есть победитель
      if(calculateWinner(boardSquaresValues[a]) !== '' && boardSquaresValues[a][9] === '') {
        boardSquaresValues[a][9] = calculateWinner(boardSquaresValues[a]); 
        boardWinValues[a] = boardSquaresValues[a][9][0];
      };
      //проверяем на выигрыш в борде/игре и меняем стэйт если есть победитель
      if(calculateWinner(boardWinValues) !== '' && boardWinValues[9] === '') {
        boardWinValues[9] = calculateWinner(boardWinValues);
      };
      //собираю все мутировавшие данные в объект и ставлю его в конец истории
      const history = this.state.history.slice(0,this.state.stepNumber+1).concat(
        {
          disableSub_board,
          boardSquaresValues,
          boardWinValues,
          xIsNext,
        }
      );
      //сохраняю данные в стейт
      this.setState({
        history: history,
        stepNumber: history.length - 1,
      });
      //console.log('=========== handleClick END!===========');
      return
    } else {
      console.log('SOMETHING WENT WRONG');
        return;
      };

   }
  
  handleBackClick() {
    console.log('BACK CLICKED');
    if(this.state.stepNumber > 0) {
      let stepNumberCopy = this.state.stepNumber - 1;
      this.setState({
        stepNumber: stepNumberCopy,
      });
      console.log('==========stepNumberCopyBackClick ' + this.state.stepNumber);
    }
  }

  handleRetryClick() {
    console.log('RETRY CLICKED');
    //let confirmation = confirm("Reset the game?");

    // eslint-disable-next-line no-restricted-globals
    if(confirm("Reset the game?") === true){
      const history = this.state.history.slice(0,1);
      this.setState({
        history: history,
        stepNumber: history.length - 1,
      });
    }
  }

  handleForwardClick() {
    console.log('FORWARD CLICKED');
    if(this.state.stepNumber < (this.state.history.length-1)) {
      let stepNumberCopy = this.state.stepNumber + 1;
      this.setState({
        stepNumber: stepNumberCopy,
      });
      console.log('==========stepNumberCopyForwardClick ' + this.state.stepNumber);
    }
  }

  renderBackgroundBoard(a) {
    //console.log('Background Render');
    let colorSVGDisabled;
    if(this.state.history[this.state.stepNumber].disableSub_board[a] === true) {
      colorSVGDisabled = 'lightgray';
    } else {
      colorSVGDisabled = 'black';
    }
    if(this.state.history[this.state.stepNumber].boardSquaresValues[a][9] !== '') {
      switch(this.state.history[this.state.stepNumber].boardSquaresValues[a][9][1]) {
        case '0':// горизонталь
          return(
            <svg className="sub_board_background" viewBox="0 0 90 90" height="112" width="112" xmlns="http://www.w3.org/2000/svg" fill='green'>
              <line x1="7" y1="17" x2="83" y2="17" stroke={colorSVGDisabled} />
            </svg>
          );
        case '1':// горизонталь
          return(
            <svg className="sub_board_background" viewBox="0 0 90 90" height="112" width="112" xmlns="http://www.w3.org/2000/svg" fill='green'>
              <line x1="7" y1="45" x2="83" y2="45" stroke={colorSVGDisabled} />
            </svg>
          );
        case '2':// горизонталь
          return(
            <svg className="sub_board_background" viewBox="0 0 90 90" height="112" width="112" xmlns="http://www.w3.org/2000/svg" fill='green'>
              <line x1="7" y1="73" x2="83" y2="73" stroke={colorSVGDisabled} />
            </svg>
          );
        case '3':// перпендикуляр
          return(
            <svg className="sub_board_background" viewBox="0 0 90 90" height="112" width="112" xmlns="http://www.w3.org/2000/svg" fill='green'>
              <line x1="17" y1="7" x2="17" y2="83" stroke={colorSVGDisabled} />
            </svg>
          );
        case '4':// перпендикуляр
          return(
            <svg className="sub_board_background" viewBox="0 0 90 90" height="112" width="112" xmlns="http://www.w3.org/2000/svg" fill='green'>
              <line x1="45" y1="7" x2="45" y2="83" stroke={colorSVGDisabled} />
            </svg>
          );
        case '5':// перпендикуляр
        return(
          <svg className="sub_board_background" viewBox="0 0 90 90" height="112" width="112" xmlns="http://www.w3.org/2000/svg" fill='green'>
            <line x1="73" y1="7" x2="73" y2="83" stroke={colorSVGDisabled} />
          </svg>
        );
        case '6':// диагональ \
        return(
          <svg className="sub_board_background" viewBox="0 0 90 90" height="112" width="112" xmlns="http://www.w3.org/2000/svg" fill='green'>
            <line x1="9" y1="9" x2="81" y2="81" stroke={colorSVGDisabled} />
          </svg>
        );
        case '7':// диагональ /
        return(
          <svg className="sub_board_background" viewBox="0 0 90 90" height="112" width="112" xmlns="http://www.w3.org/2000/svg" fill='green'>
            <line x1="9" y1="81" x2="81" y2="9" stroke={colorSVGDisabled} />
          </svg>
        );
        default:
          return(
            <svg className="sub_board_background" viewBox="0 0 90 90" height="112" width="112" xmlns="http://www.w3.org/2000/svg" fill='green'>
               <text x="20" y="55" style={{fontSize: '40',fill: 'red'}}>Err</text>
            </svg>
          );
  
      }

    }else{
      return(
        <svg className="sub_board_background" viewBox="0 0 90 90" height="112" width="112" xmlns="http://www.w3.org/2000/svg" fill='green'>
           {/* <text x="65" y="55" style={{fontSize: '40',fill: 'red'}}>Default</text> */}
        </svg>
      );
    };
  }
  
  renderBoard(a) {
    let enabledProp;
    if(this.state.history[this.state.stepNumber].disableSub_board[a] === true) {
      enabledProp = this.state.gridLayoutSquaresDisabled;
    } else {
      enabledProp = this.state.gridLayoutSquares;
    };
  
    return (
      <SubBoard 
        value={this.state.history[this.state.stepNumber].boardSquaresValues[a]}
        a={a}
        disabled={this.state.history[this.state.stepNumber].disableSub_board[a]}
        onClick={this.handleClick}
        style={this.state.gridLayout}
        gridLayoutSquares={enabledProp}
      />
    );
  }
  renderMenu(){
    //console.log('Menu Render');
    return(
      <Menu
        onBackClick={this.handleBackClick}
        onRetryClick={this.handleRetryClick}
        onForwardClick={this.handleForwardClick}
        winner={this.state.history[this.state.stepNumber].boardWinValues[9]}
        xIsNext={this.state.history[this.state.stepNumber].xIsNext}
        stepNumber={this.state.stepNumber}
        stepDiff={this.state.history.length - 1 - this.state.stepNumber}
      />
    );
  }

  render() {
    // console.log('=======================================================');
    // console.log('HISTORY CURRENT FRAME № ' + (this.state.stepNumber));
    // console.log('STEP NUMBER № ' + this.state.stepNumber);
    // console.log(this.state.history);
    return (
      <div>
        <div className="board">
          <div className="board-row">
            {this.renderBoard(0)}
            {this.renderBoard(1)}
            {this.renderBoard(2)}
            {this.renderBoard(3)}
            {this.renderBoard(4)}
            {this.renderBoard(5)}
            {this.renderBoard(6)}
            {this.renderBoard(7)}
            {this.renderBoard(8)}
          </div>
          <div className="board-row-background">
            {this.renderBackgroundBoard(0)}
            {this.renderBackgroundBoard(1)}
            {this.renderBackgroundBoard(2)}
            {this.renderBackgroundBoard(3)}
            {this.renderBackgroundBoard(4)}
            {this.renderBackgroundBoard(5)}
            {this.renderBackgroundBoard(6)}
            {this.renderBackgroundBoard(7)}
            {this.renderBackgroundBoard(8)}
          </div>
        </div>
        {this.renderMenu()}
      </div>
    );
  }
}


class Menu extends React.Component {
  renderLeftComponent() {
    if(this.props.stepNumber !== 0) {
      return(
        <button className="menuButton" onClick={this.props.onBackClick}>
          <svg viewBox="0 0 24 24" width="50" height="50" xmlns="http://www.w3.org/2000/svg" >}
            <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/>
          </svg>
      </button>
      );
    } else{
      return(
        <div className="menuButton"/>
      );
    };
  }
  renderMiddleComponent() {
    if(this.props.winner === '') {
     const whoIsNext = this.props.xIsNext ? 'X' : 'O';
     if(whoIsNext === 'X'){
       // Cross Icon
       return(
        <svg className="menuButton" xmlns="http://www.w3.org/2000/svg" width='50' height='50' viewBox="0 0 24 24">
          <path
            d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 
                   9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 
                   2.81 2.81 9.112-9.192 9.18 9.1z"/>
        </svg>
       );
     } else {
       //Circle Icon
        return(
          <svg className="menuButton" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24">
            <path d="M12 3 C17.247 3 21 6.753 21 12 21 17.247 17.247 21 12 21 6.752 21 3 17.247 3 12 3 6.753 6.752 3 12 3 Z M12 0 C5.696 0 0 5.697 0 12 0 18.304 5.696 24 12 24 18.303 24 24 18.304 24 12 24 5.697 18.303 0 12 0 Z"/>
                    
                    
                    
                    
          </svg>
        );
     }
    } else {
      return(
        <button className="menuButton" onClick={this.props.onRetryClick}>
          <svg viewBox="0 0 24 24" width="50" height="50" xmlns="http://www.w3.org/2000/svg" >
            <path d="M13.5 2c-5.629 0-10.212 4.436-10.475 10h-3.025l4.537
                     5.917 4.463-5.917h-2.975c.26-3.902 3.508-7 7.475-7 
                     4.136 0 7.5 3.364 7.5 7.5s-3.364 7.5-7.5 7.5c-2.381 
                     0-4.502-1.119-5.876-2.854l-1.847 2.449c1.919 2.088 
                     4.664 3.405 7.723 3.405 5.798 0 10.5-4.702 
                     10.5-10.5s-4.702-10.5-10.5-10.5z"/>
          </svg>
        </button>
      );
    };
  } 
  renderRightComponent() {
    if(this.props.stepDiff !== 0){
      return(
        <button className="menuButton" onClick={this.props.onForwardClick}>
          <svg viewBox="0 0 24 24" width="50" height="50" xmlns="http://www.w3.org/2000/svg" >
            <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/>
          </svg>
        </button>
      );
    }else{
      return(
        <div className="menuButton"/>
      );      
    }
  }
  render() {
    return (
      <div className="menu">
      {this.renderLeftComponent()}
      {this.renderMiddleComponent()}
      {this.renderRightComponent()}
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <Board />
      </div>
    );
  }
}

//===================================================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],// case: 0 горизонт верх
    [3, 4, 5],// case: 1 горизонт середина
    [6, 7, 8],// case: 2 горизонт низ
    [0, 3, 6],// case: 3 вертикаль левая
    [1, 4, 7],// case: 4 вертикаль правая
    [2, 5, 8],// case: 5 вертикаль правая
    [0, 4, 8],// case: 6 диагональ \ слева верха вниз права
    [2, 4, 6],// case: 7 диагональ / слева низа вверх права
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return (squares[a] + i);
    }
  }
  return ('');

};
