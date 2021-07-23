import React, { Component } from 'react';
import Search from './Search';
import Sort from './Sort';

class Control extends Component {
  constructor(props) {
    super(props);
    
  }
  
  render() {
    return (
      <div>
        <Search onSearch={this.props.onSearch}></Search>
        <Sort onSort={this.props.onSort}></Sort>
      </div>
    );
  }
}

export default Control;