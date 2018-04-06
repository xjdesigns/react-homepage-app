import React, { Component } from 'react'
import StuffList from './stuffList'
import CartList from './components/cart-list/cart-list.comp'
import MainComp from './components/main.comp'
import Button from './components/button/button.comp'

import isElectron from 'is-electron'

class App extends Component {
  constructor() {
    super()
    this.state = {
      isActive: false
    }

    if(isElectron()) {
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
          <CartList></CartList>
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
