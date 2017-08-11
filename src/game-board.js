import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BoardUnit from './board-unit';
import './game-of-life.css';

export default class GameBoard extends Component{
  static propTypes = {
    data: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    unitSize: PropTypes.number.isRequired,
    onClick: PropTypes.func
  }

  renderBoardUnits() {
    let size = this.props.unitSize + 'px';
    return (
      <div className='board-units' onClick={this.props.onClick}>
        { this.props.data.map(function(unit, index) {
        var color = unit&1 ? '#D4746A' : '#14073A';
        return (
          <BoardUnit backgroundColor={color} size={size} index={index}/>
        );
    })}
      </div>
    );
  }

  render() {
    const { unitSize, width } = this.props;
    const boardStyle = {
      width: (unitSize * width + 20) + 'px'
    }
    return (
      <div className='board-container' style={boardStyle}>
        { this.renderBoardUnits() }
      </div>
    );
  }
};
