import * as React from 'react';
import {shallow} from 'enzyme';
import Home from './Home';

//simple JEST test using ENZYME for shallow testing
describe('<Home/>', () => {
  test('should render correctly', () => {
    const component = shallow(<Home />);

    expect(component).toMatchSnapshot();
  });
});