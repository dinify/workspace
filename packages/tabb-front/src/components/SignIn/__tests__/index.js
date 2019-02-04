import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';


import SignInForm from '../index';
import configureStore from 'redux-mock-store';

const middlewares = []; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);

describe('<SignInForm />', () => {

  it('renders `form`', () => {
    const wrapper = shallow(<SignInForm />).dive();
    expect(wrapper);
  });

  //test('should render', () => {
  //  const store = mockStore()
  //  const Wrapper = shallow(<SignInForm />).dive();
  //  const component = renderer
  //    .create(
  //      <Provider store={store}>
  //        <MemoryRouter>
  //          <Wrapper />
  //        </MemoryRouter>
  //      </Provider>
  //    )
  //    .toJSON();
  //  expect(component).toMatchSnapshot();
  //});

});
