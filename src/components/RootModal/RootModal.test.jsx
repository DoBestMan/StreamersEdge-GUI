import * as React from 'react';
import {Provider} from 'react-redux';
import configureStore from '../../store/configureStore';
import {shallow} from 'enzyme';
import RootModal from './RootModal';

describe('<RootModal/>', () => {
  const store = configureStore();
  test('should render correctly', () => {
    const component = shallow(
      <Provider store={ store }>
        <RootModal />
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });
});

describe('<RootModal/>', () => {
  const store = configureStore();
  test('modal should be closed by default', () => {
    const wrapper = shallow(<RootModal store={ store } />);
    const isOpen = wrapper.prop('children').props.isModalOpen;
    expect(isOpen).toBe(false);
  });
});