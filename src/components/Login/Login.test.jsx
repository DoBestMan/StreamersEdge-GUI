import * as React from 'react';
import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';
import {shallow, mount} from 'enzyme';
import sinon from 'sinon';
import Login from './Login';

const mockStore = configureMockStore();
const store = mockStore({});

//simple JEST test using ENZYME for shallow testing, and mock store for connected components
describe('<Login/>', () => {
  test('should render correctly', () => {
    const component = shallow(
      <Provider store={ store }>
        <Login />
      </Provider>
    );

    expect(component).toMatchSnapshot();
  });
});

//example using sinon spy to make sure that click function was activated
describe('<Login/>', () => {
  test('Button press on login', () => {
    const spy = sinon.spy();
    const component = mount(
      <Provider store={ store }>
        <Login testSionSpy={ spy }/>
      </Provider>);
    component.find('.sion').first().simulate('click');
    expect(spy.calledOnce).toBe(true);
  });
});