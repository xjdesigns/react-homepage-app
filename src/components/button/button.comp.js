import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class Button extends Component {
  onButtonClick = () => {
    let jj = {woot: 'Holla'}
    this.props.callbackParent(jj);
  }

  componentWillReceiveProps(nextProps) {
    console.warn('props changes', nextProps);
  }

  render() {
    return (
      <div>
        <button className={this.props.cls} onClick={this.onButtonClick}>
          Hello from comp {this.props.cls}
        </button>
        <div className={this.props.modal ? 'modal-is-open' : 'modal-is-closed'}>
          This is only shows when the modal UI is true
        </div>
        {this.props.modal &&
          <div>
            Modal is open conditional
          </div>
        }
      </div>
    )
  }
}

Button.propTypes = {
  modal: PropTypes.bool
}

function mapStateToProps(state) {
  return {
    modal: state.stuff.ui.isModalOpen
  }
}

export default connect(
  mapStateToProps
)(Button);
