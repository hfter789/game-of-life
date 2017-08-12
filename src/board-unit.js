import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './board-unit.css';

export default class BoardUnit extends Component{
  static propTypes = {
    backgroundColor: PropTypes.string.isRequired,
    index: PropTypes.number,
  }

  shouldcomponentUpdate(nextProps) {
    return nextProps.backgroundColor !== this.props.backgroundColor;
  }

  render() {
    let props = this.props;
    let unitStyle = {
      height: props.size,
      width: props.size,
      backgroundColor: props.backgroundColor,
    };
    return (
      <div className='board-unit' style={unitStyle} data-board-index={props.index}/>
    );
  }
};
