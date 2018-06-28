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
    this.countNeighbors = this.countNeighbors.bind(this);
    this.evalGrid = this.evalGrid.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
  }

  componentDidMount() {
    this.createGrid();
  }


  //By far the largest function, contains the many different cases that need to be evaluated based on the cell's position in the grid in order to
  //determine the number of neighbors of each cell during each game step.
  countNeighbors(i, j) {
    const grid = this.state.gridArray;
    let neighbors = 0;

    if(i > 0 && j > 0 && i <= 48 && j <= 48) {
      if(grid[i][j - 1]) {
        neighbors += 1;
      }
      if(grid[i][j + 1]) {
        neighbors += 1;
      }
      if(grid[i - 1][j]) {
        neighbors += 1;
      }
      if(grid[i + 1][j]) {
        neighbors += 1;
      }
      if(grid[i - 1][j - 1]) {
        neighbors += 1;
      }
      if(grid[i + 1][j + 1]) {
        neighbors += 1;
      }
      if(grid[i - 1][j + 1]) {
        neighbors += 1;
      }
      if(grid[i + 1][j - 1]) {
        neighbors += 1;
      }

    }
    else if(i === 0 && j === 0) {
      if(grid[i][j + 1]) {
        neighbors += 1;
      }
      if(grid[i + 1][j]) {
        neighbors += 1;
      }
      if(grid[i + 1][j + 1]) {
        neighbors += 1;
      }
    }
    if(i === 0 && j > 0 && j <= 48) {
      if(grid[i][j - 1]) {
        neighbors += 1;
      }
      if(grid[i][j + 1]) {
        neighbors += 1;
      }
      if(grid[i + 1][j]) {
        neighbors += 1;
      }
      if(grid[i + 1][j + 1]) {
        neighbors += 1;
      }
      if(grid[i + 1][j -1]) {
        neighbors += 1;
      }
    }
    else if(i === 49 && j > 0 && j <= 48) {
      if(grid[i][j - 1]) {
        neighbors += 1;
      }
      if(grid[i][j + 1]) {
        neighbors += 1;
      }
      if(grid[i - 1][j]) {
        neighbors += 1;
      }
      if(grid[i - 1][j + 1]) {
        neighbors += 1;
      }
      if(grid[i - 1][j -1]) {
        neighbors += 1;
      }
    }
    if(i > 0 && i <= 48 && j === 0) {
      if(grid[i + 1][j]) {
        neighbors += 1;
      }
      if(grid[i - 1][j]) {
        neighbors += 1;
      }
      if(grid[i][j + 1]) {
        neighbors += 1;
      }
      if(grid[i - 1][j + 1]) {
        neighbors += 1;
      }
      if(grid[i + 1][j + 1]) {
        neighbors += 1;
      }
    }
    else if(i > 0 && i <= 48 && j === 49) {
      if(grid[i + 1][j]) {
        neighbors += 1;
      }
      if(grid[i - 1][j]) {
        neighbors += 1;
      }
      if(grid[i][j - 1]) {
        neighbors += 1;
      }
      if(grid[i - 1][j - 1]) {
        neighbors += 1;
      }
      if(grid[i + 1][j - 1]) {
        neighbors += 1;
      }
    }
    else if(i === 49 && j === 49) {
      if(grid[i][j - 1]) {
        neighbors += 1;
      }
      if(grid[i - 1][j]) {
        neighbors += 1;
      }
      if(grid[i - 1][j - 1]) {
        neighbors += 1;
      }
    }
    return neighbors;
  }

  //Function that loops through the grid and calls countNeighbors on each cell. It also creates the next state of the board.
  evalGrid() {
    const nextStep = [];
    for(let i = 0; i < 50; i++) {
      nextStep.push([])
      for(let j = 0; j < 50; j++) {
        if(this.countNeighbors(i, j) < 2 && this.state.gridArray[i][j]) {
          nextStep[i].push(false);
        }
        else if(this.state.gridArray[i][j] && this.countNeighbors(i,j) > 2 && this.countNeighbors() < 4) {
          nextStep[i].push(true);
        }
        else if(this.state.gridArray[i][j] && this.countNeighbors() > 3) {
          nextStep[i].push(false);
        }
        else if(this.state.gridArray[i][j] === false && this.countNeighbors() === 3 || this.countNeighbors() === 6) {
          nexStep[i].push(true);
        }
        else {
          nextStep[i].push(false);
        }
      }
    }
    this.setState(function() {
      return {
        gridArray: nextStep,
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
          : <button onClick={this.onPayButtonClick}>Resume</button>
        }
        <button onClick={this.handleResetClick}>Reset</button>
        </div>
      </div>
    )
  }
}

export default Grid;
