import logo from './logo.svg';
import './App.css';
import ColorPicker from './components/ColorPicker';
import SizeSetting from './components/SizeSetting';
import Result from './components/Result';
import Reset from './components/Reset';

import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'red',
      fontSize: 15
    };
  }

  onSetColor = (params) => {

  }

  render() {
    return (
      <div className='container mt-50'>
        <div className='row'>
          <ColorPicker color={this.state.color} onReceiveColor={this.onSetColor}></ColorPicker>
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <SizeSetting></SizeSetting>
            <Reset></Reset>
          </div>
          <Result></Result>
        </div>
      </div>
    );
  }
}

export default App;
