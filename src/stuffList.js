import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as stuffActions from './actions/actions';
import * as innerStuffActions from './actions/innerActions/actions';
import PropTypes from 'prop-types';
import React from 'react';


class StuffList extends React.Component {
  constructor() {
    super()
    this.addNew = this.addNew.bind(this)
  }

  componentWillMount() {
      // this.props.stuffActions.fetchStuff();
  }

  addNew() {
    // this.props.stuffActions.addMore();
    this.props.stuffActions.updateUIState();
  }

  updateModal = () => {
    this.props.stuffActions.updateUIModalState()
  }

  toggleSidenav = () => {
    this.props.innerStuffActions.updateUISidnavState(this.props.ui.isSidenavOpen);
  }

  renderData(item) {
    return <div key={item.id}>{item.name}</div>;
  }

  render() {
    if(!this.props.stuff){
      return (
        <div>
            Loading Stuff...
        </div>
      )
    } else{
      return (
        <div>
          <div className="" onClick={this.updateModal} >
            {this.props.ui.isModalOpen ? 'Hi Jason' : 'Jason Rocks'} Hello worls
          </div>
          <div onClick={this.toggleSidenav}>Click Me Bro {this.props.ui.isSidenavOpen ? 'Sidenav open' : 'sidenav cosed'}</div>
          <div className="" onClick={this.addNew} >
            {
              this.props.stuff.map((item, index) => {
                return (
                    this.renderData(item)
                );
              })
            }
          </div>
        </div>
      )
    }
  }
}

StuffList.propTypes = {
  stuffActions: PropTypes.object,
  stuff: PropTypes.array
};

function mapStateToProps(state) {
  return {
    stuff: state.stuff.data,
    ui: state.stuff.ui
  };
}

function mapDispatchToProps(dispatch) {
  return {
    stuffActions: bindActionCreators(stuffActions, dispatch),
    innerStuffActions: bindActionCreators(innerStuffActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StuffList);
