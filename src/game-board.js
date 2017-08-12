import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BoardUnit from './board-unit';
import './game-board.css';

export default class GameBoard extends Component{
  static propTypes = {
    data: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    onClick: PropTypes.func,
  }

  renderBoardUnits() {
    const { width, height, data, onClick } = this.props;
    const rowComponents = [];
    for (let i = 0; i < height; i++) {
      const columnComponents = [];
      for (let j = 0; j < width; j++) {
        const index = i * width + j;
        const unit = data[index];
        const color = unit&1 ? '#D4746A' : '#14073A';
        columnComponents.push(
          <BoardUnit backgroundColor={color} index={index} />
        );
      }
      rowComponents.push(
        <div className='board-row'>
          { columnComponents }
        </div>
      );
    }
    return (
      <div className='board-units' onClick={onClick}>
        { rowComponents }
      </div>
    );
  }

  render() {
    return (
      <div className='board-container'>
        { this.renderBoardUnits() }
      </div>
    );
  }
};
