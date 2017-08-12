import React, { Component } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';
import './control-panel.css';

const THRUTTLE_TIME = 200;

export default class ControlPanel extends Component{
  constructor(props) {
    super(props);
    this.onMouseMoveThrottled = throttle(this.onMouseMove, THRUTTLE_TIME);
  }

  static propTypes = {
    onSizeChange: PropTypes.func,
    onSpeedChange: PropTypes.func,
    onControlChange: PropTypes.func
  }

  state = {
    open: false,
  }

  componentDidMount() {
    document.addEventListener("mousemove", this.onMouseMoveThrottled);

  }

  componentWillUnmount() {
    document.removeEventListener("mousemove", this.onMouseMoveThrottled);
  }

  onMouseMove = e => {
    const { x } = e;
    if (!x) {
      this.setState({
        open: true,
      });
    } else if (x > 256) {
      this.setState({
        open: false,
      });
    }
  }

  renderMainButtons() {
    return (
      <li onClick={this.props.onControlChange}>
        <button className= 'btn btn-default btn-primary' data-controller-id='0'>Run</button>
        <button className= 'btn btn-default btn-warning' data-controller-id='1'>Pause</button>
        <button className= 'btn btn-default btn-danger' data-controller-id='2'>Clear</button>
      </li>
    );
  }

  renderSizeButtons() {
    return (
      <li onClick={this.props.onSizeChange}>
        <button className= 'btn btn-default' data-size-id ='0'>Size:50x30</button>
        <button className= 'btn btn-default' data-size-id ='1'>Size:70x50</button>
        <button className= 'btn btn-default' data-size-id ='2'>Size:100x80</button>
      </li>
    );
  }

  renderSpeedButtons() {
    return (
      <li onClick={this.props.onSpeedChange}>
        <button className= 'btn btn-default' data-speed-id='0'>Slow</button>
        <button className= 'btn btn-default' data-speed-id='1'>Medium</button>
        <button className= 'btn btn-default' data-speed-id='2'>Fast</button>
      </li>
    );
  }

  render() {
    const { open } = this.state;
    return (
      <div className={open ? 'panelOpen' : 'panelClose'}>
        <div className='control-panel'>
          <ul className='control-list'>
            { this.renderMainButtons() }
            { this.renderSizeButtons() }
            { this.renderSpeedButtons() }
          </ul>
        </div>
      </div>
    );
  }
};
