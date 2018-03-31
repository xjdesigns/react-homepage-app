import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { shallow } from 'enzyme'

let wrapper;

describe('app component', () => {
  beforeEach(() => {
    wrapper = shallow(<App />)
  });

  it('should check state of the comp', () => {
    expect(wrapper.state().isActive).toBe(false);
  });

  it('should test the onClick method', () => {
    wrapper.find('button').simulate('click');
    expect(wrapper.state().isActive).toBe(true)
    // var comp = new App();
    //
    // comp.clickIt();
    // expect(comp.state.isActive).toBe(true);
  });
});
