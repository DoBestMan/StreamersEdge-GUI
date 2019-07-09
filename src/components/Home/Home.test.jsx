import * as React from 'react';
import {shallow} from 'enzyme';
import Home from './Home';
import {Provider} from 'react-redux';
import configureStore from '../../store/configureStore';


//simple JEST test using ENZYME for shallow testing
describe('<Home/>', () => {
  const store = configureStore();
  test('should render correctly', () => {
    const component = shallow(
      <Provider store={ store }>
        <Home />
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });
});