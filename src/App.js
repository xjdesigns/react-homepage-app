import React, { Component } from 'react'
import StuffList from './stuffList'
import MainComp from './components/main.comp'
import Button from './components/button/button.comp'

import isElectron from 'is-electron'

// import {window.ipcRenderer} from 'electron'
// let isTrue = false
// let window.ipcRenderer
// if(window.require) {
//   isTrue = true;
//   const electron = window.require('electron');
//   const fs = electron.remote.require('fs');
//   ipcRenderer  = electron.ipcRenderer;
// }


class App extends Component {
  constructor() {
    super()
    this.state = {
      isActive: false
    }

    if(isElectron()) {
      // setTimeout(() => {
      //   ipcRenderer.send('hello-world', [{name: 'jasonRocks'}])
      // }, 2000);
      window.ipcRenderer.on('hello-world', (e) => {
        console.warn('WHY NO WORJING', e);
      })
    }
  }
  componentWillMount() {
    // this.props.store.subscribe(() => {
    //   let e = this.props.store.getState().stuff.ui;
    // });
    if(isElectron()) {
      console.warn('comp will mount isTRUE');
      window.ipcRenderer.on('pong', (ev, arg) => {
        console.warn('from the main', arg);
      })
    }
  }

  clickIt = () => {
    const currentState = this.state.isActive;
    this.setState({isActive: !currentState })
  }

  fromMyChild(arg) {
    console.warn('I AM NOTIFIED', arg);
    if(isElectron()) {
      window.ipcRenderer.send('hello-world', [{name: 'jasonRocks'}])
    }
  }

  render() {
      return (
        <div className="app">
          <StuffList store={this.props.store} />
          <MainComp></MainComp>
          <div className={this.state.isActive ? 'hello' : 'world'}>
            <Button cls="spx-btn spx-btn--pr" callbackParent={this.fromMyChild} theStore={this.state.isActive}></Button>
            <button className="spx-btn spx-btn--pr" onClick={this.clickIt}>Hello World</button>
          </div>
        </div>
      );
    }
}
export default App;
