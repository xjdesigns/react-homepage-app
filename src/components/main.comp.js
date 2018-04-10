import {connect} from 'react-redux'
// import {bindActionCreators} from 'redux'
import * as stuffActions from '../actions/actions'
import PropTypes from 'prop-types'
import React from 'react'

import io from 'socket.io-client'
import isElectron from 'is-electron'

class MainComp extends React.Component {
  componentWillMount() {
    if(isElectron()) {
      window.ipcRenderer.on('device:sim:main', (ev, data) => {
      console.warn('app JS:: from main:: MainComp', data);
      this.props.callThunkAPI();
    })
    }
  }

  updateModal = () => {
    // this.props.stuffActions.updateUIModalState();
    this.props.updateModal();
  }

  thunkAPI = () => {
    this.props.callThunkAPI();
  }

  render() {
    return (
      <div>
        <div onClick={this.updateModal}>
          From inside my main
          {this.props.ui.isModalOpen ? 'Open' : 'closed'}
        </div>
        <div>
          <button onClick={this.thunkAPI}>
            Click for the thunk test
          </button>
        </div>
      </div>
    )
  }
}

MainComp.propTypes = {
  stuffActions: PropTypes.object
}

function mapStateToProps(state) {
  return {
    ui: state.stuff.ui
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateModal: () => {
      dispatch(stuffActions.updateUIModalState());
    },
    callThunkAPI: () => {
      dispatch(stuffActions.fetchPosts())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainComp);
