import React, { Component } from 'react';
import Header from '../components/Header';

class Page extends Component {
  render() {
    return (
      <div>
        <Header></Header>
        {this.props.children}
      </div>
    );
  }
}

export default Page;
