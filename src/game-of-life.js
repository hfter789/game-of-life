import React, { Component } from 'react';
import ControlPanel from './control-panel';
import GameBoard from './game-board';
import './game-of-life.css';
const SIZE_ARRAY = [{
  m: 50,
  n: 30,
}, {
  m: 70,
  n: 50,
}, {
  m: 100,
  n: 80,
}];
const SPEED_ARRAY = [500, 300, 100];

export default class GameOfLife extends Component {

  constructor(props) {
    super(props);
    this.controller = [this.runSimulation, this.pauseSimulation, this.clearCells]
  }

  state = {
    data: this.initializeData(50, 30),
    size: SIZE_ARRAY[0],
    // data: this.initializeData(5, 5),
    // size: {m: 5, n:5, size: 10},
    isRunning: false,
    speed: SPEED_ARRAY[2]
  }

  componentDidMount() {
    setTimeout(this.nextGeneratetion, this.state.speed);
  }

  runSimulation = () => {
     this.setState({
       isRunning: true
     });
  }

  pauseSimulation = () => {
    this.setState({
      isRunning: false
    });
  }

  clearCells = () => {
    this.setState({
      isRunning: false,
      data: this.state.data.map(() => 0)
    });
  }

  initializeData(m, n) {
    var size = m * n;
    var data = Array.apply(null, Array(size)).map(Number.prototype.valueOf, 0);
    for (var i = 0; i < size; i++) {
      if (Math.random() > .7) {
        this.setAlive(data, i, m, n);
      } else {
        data[i] &= ~1;
      }
    }
    return data;
  }

  onSizeChange = (e) => {
    let size = SIZE_ARRAY[+e.target.getAttribute('data-size-id')];
    let data = this.initializeData(size.m, size.n);
    this.setState({
      size: size,
      data: data
    });
  }

  onSpeedChange = (e) => {
    let speed = SPEED_ARRAY[+e.target.getAttribute('data-speed-id')];
    this.setState({
      speed: speed
    });
  }

  onControllerClick = (e) => {
    this.controller[+e.target.getAttribute('data-controller-id')]();
  }

  onBoardClick = (e) => {
    let data = this.state.data;
    let index = e.target.getAttribute('data-board-index');
    if (index) {
      if (data[index] & 1) {
        this.setDead(data, index, this.state.size.m, this.state.size.n);
      } else {
        this.setAlive(data, index, this.state.size.m, this.state.size.n);
      }
    }
    this.setState({
      data:data
    });
  }

  setAlive(data, index, m, n) {
    data[index] |= 1;
    this.updateNeighbor(data, index, 2, m, n);
  }

  setDead(data, index, m, n) {
    data[index] &= ~1;
    this.updateNeighbor(data, index, -2, m, n);
  }

  updateNeighbor(data, index, addValue, m, n) {
    var rowIndex = Math.floor(index / m);
    var colIndex = index % m;
    var left = (colIndex > 0) ? colIndex - 1 : m - 1;
    var top = (rowIndex > 0) ? rowIndex - 1 : n - 1;
    var right = (colIndex + 1) % m;
    var bot = (rowIndex + 1) % n;

    data[top * m + left] += addValue;
    data[top * m + colIndex] += addValue;
    data[top * m + right] += addValue;
    data[rowIndex * m + left] += addValue;
    data[rowIndex * m + right] += addValue;
    data[bot * m + left] += addValue;
    data[bot * m + colIndex] += addValue;
    data[bot * m + right] += addValue;
  }

  nextGeneratetion = () => {
    if (this.state.isRunning) {
      var { data, size: { m, n } } = this.state;
      var self = this;
      // make a copy
      var newData = data.slice(0);
      data.forEach(function(cell, index) {
        var activeNeighbor = cell >> 1;
        var isActive = cell & 1;
        if (activeNeighbor === 2 || activeNeighbor === 3) {
          if (activeNeighbor === 3 && !isActive) {
            self.setAlive(newData, index, m, n);
          }
        } else if (isActive) {
          self.setDead(newData, index, m, n);
        }
      });
      this.setState({
        data: newData
      });
    }
    setTimeout(this.nextGeneratetion, this.state.speed);
  }

  getData() {
    return this.state.data;
  }

  logData() {
    console.log(this.getData().map(function(num) {
      return num % 2 === 1 ? 1 : 0;
    }));
  }

  render() {
    var size = this.state.size;
    // this.logData();
    return (
      <div className='main'>
        <ControlPanel onSizeChange={this.onSizeChange} onSpeedChange = {this.onSpeedChange} onControlChange={this.onControllerClick}/>
        <GameBoard data={this.getData()} width={size.m} height={size.n} onClick={this.onBoardClick}/>
      </div>
    );
  }
}
