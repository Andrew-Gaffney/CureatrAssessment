import React, {Component} from 'react';
class Grid extends Component {

  constructor(props) {
    super(props);
    this.state =
    {
      gridArray: [],
      isPlaying: false,
      hasStartedOnce: false,
      intervalId: 0
    }
    this.onPlayButtonClick = this.onPlayButtonClick.bind(this);
    this.createGrid = this.createGrid.bind(this);
    this.evalGrid = this.evalGrid.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
  }

  componentDidMount() {
    this.createGrid();
  }

  //Function that loops through the grid and counts neighbors on each cell. It also creates the next state of the board.
  evalGrid() {
    const grid = this.state.gridArray;
    const nextState = [];

    for(let i = 0; i < 50; i++) {
      nextState.push([])
      for(let j = 0; j < 50; j++) {
        nextState[i].push('');
        let neighbors = grid[i][j] ? -1 : 0;
        for(let p = -1; p <= 1; p++) {                 // row neighbor offsets
          for(let q = -1; q <= 1; q++) {              // column neighbor offsets
            if(i + p < 0 ||
               i + p > 49 ||
               j + q < 0 ||
               j + q > 49)
               continue;
            if(grid[i + p][j +  q]) {
              neighbors += 1;
            }
          }
        }

        if(neighbors < 2 && grid[i][j]) {
          nextState[i][j] = false;
        }
        else if(grid[i][j] && neighbors > 2 && neighbors < 4) {
          nextState[i][j] = true;
        }
        else if(grid[i][j] && neighbors > 3) {
          nextState[i][j] = false;
        }
        else if(grid[i][j] === false && neighbors === 3 || neighbors === 6) {
          nextState[i][j] = true;
        }
        else {
          nextState[i][j] = false;
        }
      }
    }
    this.setState(function() {
      return {
        gridArray: nextState,
      }
    })
  }

 //Function to populate the initial state of the board, creates the 50x50 grid that is populated with true/false values that are then mapped to different divs when rendered.
  createGrid() {
    const grid = []
    for(let i = 0; i < 50; i++) {
      grid.push([]);
      for(let j = 0; j < 50; j++) {
        grid[i].push(Math.random() < .25 ? true : false);
      }
    }
    this.setState(function() {
      return {gridArray: grid}
    });
  }

  //Function to handle the clicking of the start/pause/resume button
  onPlayButtonClick() {
    if(!this.state.hasStartedOnce) {
      let timeStep = setInterval(this.evalGrid, 1500);
      this.setState(function() {
        return {
          hasStartedOnce: true,
          isPlaying: true,
          intervalId: timeStep,
        }
      });
    }
    else if(this.state.isPlaying) {
      clearInterval(this.state.intervalId);
      this.setState(function() {
        return {
          isPlaying: false
        }
      });
    } else {
      this.setState(function(){
        let timeStep = setInterval(this.evalGrid, 1500);
        return {
          isPlaying: true,
          intervalId: timeStep
        }
      });
    }
  }

  handleResetClick() {
    clearInterval(this.state.intervalId)
    this.setState(function() {
      return {
        hasStartedOnce: false
      }
    });
    this.createGrid();
  }

  render() {
    return (
      <div>
        <div id="grid">
        {
          this.state.gridArray.map((row) => {
            return row.map((cell) => {
              const divStyle = {backgroundColor: "black"};
              return cell ? <div style={divStyle}></div> : <div></div>
            })
          })
        }
        </div>
        <div>
        {
          !this.state.hasStartedOnce ? <button onClick={this.onPlayButtonClick}>Start</button>
          : this.state.isPlaying && this.state.hasStartedOnce ? <button onClick={this.onPlayButtonClick}>Pause</button>
          : <button onClick={this.onPlayButtonClick}>Resume</button>
        }
        <button onClick={this.handleResetClick}>Reset</button>
        </div>
      </div>
    )
  }
}

export default Grid;
