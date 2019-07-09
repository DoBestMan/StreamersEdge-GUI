import * as React from 'react';
import {Provider} from 'react-redux';
import configureStore from '../../../store/configureStore';
import {shallow} from 'enzyme';
import LoginForm from './LoginForm';

describe('<LoginForm/>', () => {
  const store = configureStore();
  test('should render correctly', () => {
    const component = shallow(
      <Provider store={ store }>
        <LoginForm />
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });
});