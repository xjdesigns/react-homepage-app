import React, { Component } from 'react'
import StuffList from './stuffList'
import CartList from './components/cart-list/cart-list.comp'
import MainComp from './components/main.comp'
import Button from './components/button/button.comp'

// import io for use with the react app alone
// this should be a service so its a singleton and
// would only create a single connection
// or else use it in side of the main process
// discuss with the team what the flow is and handle there.
// this would need to handle the browser window running as well
import io from 'socket.io-client'

import isElectron from 'is-electron'

class App extends Component {
  constructor() {
    super()
    this.state = {
      isActive: false,
      dataMsg: 'Should be null'
    }

    // this.socket = io('http://localhost:7003')

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

      window.ipcRenderer.on('device:sim:main', (ev, data) => {
        console.warn('app JS:: from main', data);
        this.setState({dataMsg: data})
      })
    }
  }

  clickIt = () => {
    const currentState = this.state.isActive;
    this.setState({isActive: !currentState })
  }

  toIoFromApp = () => {
    console.warn('toIoFromApp::')
    // this.socket.emit('device:sim', 'Look I am from the react app')
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
            <button className="spx-btn spx-btn--pr" onClick={this.toIoFromApp}>IO CRA BTN</button>
          </div>
          <div>
            {this.state.dataMsg}
          </div>
        </div>
      );
    }
}
export default App;
