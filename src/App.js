import React, { Component } from 'react';
import StuffList from './stuffList';
import MainComp from './components/main.comp'
class App extends Component {
  constructor() {
    super()
    this.state = {
      isActive: false
    }
  }
  componentWillMount() {
    // this.props.store.subscribe(() => {
    //   let e = this.props.store.getState().stuff.ui;
    // });
  }

  clickIt = () => {
    const currentState = this.state.isActive;
    this.setState({isActive: !currentState })
  }

  render() {
      return (
        <div className="app">
          <StuffList store={this.props.store} />
          <MainComp></MainComp>
          <div className={this.state.isActive ? 'hello' : 'world'}>
            <button className="spx-btn spx-btn--pr" onClick={this.clickIt}>Hello World</button>
          </div>
        </div>
      );
    }
}
export default App;
