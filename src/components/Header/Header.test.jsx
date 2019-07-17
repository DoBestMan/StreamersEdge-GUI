import React from 'react';
import {shallow} from 'enzyme';
import {Provider} from 'react-redux';
import configureStore from '../../store/configureStore';
import Header from './Header';

describe('<Home/>', () => {
  const store = configureStore();
  test('should render correctly', () => {
    const component = shallow(
      <Provider store={ store }>
        <Header />
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });
});
