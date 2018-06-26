import React, {Component} from 'react';

const Grid = () => {
  const gridArray = [];
  for(let i = 0; i < 50; i++) {
    gridArray.push([]);
    for(let j = 0; j < 50; j++) {
      gridArray[i].push(<div></div>);
    }
  }
  return (
    <div id="grid">
    {
      gridArray.map((row) => {
        return row.map((cell) => {
          return (
            <div>
            </div>
          )
        })
      })
    }
    </div>
  )
}

export default Grid;
