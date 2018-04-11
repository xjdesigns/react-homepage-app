import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as stuffActions from '../../actions/actions';
import * as innerStuffActions from '../../actions/innerActions/actions';
import PropTypes from 'prop-types';
import React from 'react';


class CartList extends React.Component {
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

  renderData(item) {
    return <div key={item.id}>{item.name}</div>;
  }

  renderDataTH(item) {
    return <td key={item.id}>{item.name}</td>;
  }

  render() {
      return (
        <div>
          <div>
            Cart List
          </div>
          <div className="" onClick={this.addNew} >
            {
              this.props.stuff.map((item, index) => {
                return this.renderData(item)
              })
            }
          </div>
          <table>
            <thead>
              <tr>
                <th>Hello</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {
                  this.props.stuff.map((item, index) => {
                    return this.renderDataTH(item)
                  })
                }
              </tr>
            </tbody>
          </table>
        </div>
      )
  }
}

CartList.propTypes = {
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
)(CartList);
