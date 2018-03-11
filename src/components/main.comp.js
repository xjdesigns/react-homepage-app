import {connect} from 'react-redux'
// import {bindActionCreators} from 'redux'
import * as stuffActions from '../actions/actions'
import PropTypes from 'prop-types'
import React from 'react'

class MainComp extends React.Component {
  updateModal = () => {
    // this.props.stuffActions.updateUIModalState();
    this.props.updateModal();
  }

  render() {
    return (
      <div onClick={this.updateModal}>
        From inside my main
        {this.props.ui.isModalOpen ? 'Open' : 'closed'}
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
    // stuffActions: bindActionCreators(stuffActions, dispatch)
    updateModal: () => {
      console.warn('working');
      dispatch(stuffActions.updateUIModalState());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainComp);
