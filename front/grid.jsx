import React, {Component} from 'react';

class Grid extends Component {

  constructor(props) {
    super(props);
    this.state =
    {
      gridArray: [],
      isPlaying: false,
      hasStartedOnce: false,
    }
    this.onButtonClick = this.onButtonClick.bind(this);
    this.createGrid = this.createGrid.bind(this);
  }

  componentDidMount() {
    this.createGrid();
  }

  createGrid() {
    const grid = []
    for(let i = 0; i < 50; i++) {
      grid.push([]);
      for(let j = 0; j < 50; j++) {
        grid[i].push(<div></div>);
      }
    }
    this.setState(function() {
      return {gridArray: grid}
    });
  }

  onButtonClick() {
    if(this.state.isPlaying) {
      this.setState(function() {
        return {
          isPlaying: false
        }
      });
    } else if(!this.state.hasStartedOnce) {
      this.setState(function() {
        return {
          hasStartedOnce: true,
          isPlaying: true,
        }
      });
    } else {
      this.setState(function(){
        return {
          isPlaying: true,
        }
      });
    }
    console.log(this.state.hasStartedOnce);
    console.log(this.state.isPlaying);
  }

  render() {
    return (
      <div>
        <div id="grid">
        {
          this.state.gridArray.map((row) => {
            return row.map((cell) => {
              const divStyle = {backgroundColor: "green"};
              return Math.random() < .25 ? <div style={divStyle}></div> : <div></div>
            })
          })
        }
        </div>
        <div>
        {
          !this.state.hasStartedOnce ? <button onClick={this.onButtonClick}>Start</button>
          : this.state.isPlaying && this.state.hasStartedOnce ? <button onClick={this.onButtonClick}>Pause</button>
          : <button onClick={this.onButtonClick}>Resume</button>
        }
        </div>
      </div>
    )
  }
}

export default Grid;
