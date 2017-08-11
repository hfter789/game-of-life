import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class BoardUnit extends Component{
  static propTypes = {
    backgroundColor: PropTypes.string.isRequired,
    index: PropTypes.number,
    size: PropTypes.string.isRequired
  }

  shouldcomponentUpdate(nextProps) {
    return nextProps.backgroundColor !== this.props.backgroundColor || nextProps.size !== this.props.size;
  }

  render() {
    let props = this.props;
    let unitStyle = {
      height: props.size,
      width: props.size,
      backgroundColor: props.backgroundColor
    };
    return (
      <div className='board-unit' style={unitStyle} data-board-index={props.index}/>
    );
  }
};
