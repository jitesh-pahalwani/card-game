import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { createStore } from 'redux';

import mainReducer from '../src/mainReducer';

Enzyme.configure({ adapter: new Adapter() });

/* A method to create a redux store for components in test cases */
export const storeFactory = (initialState) => {
    return createStore(mainReducer, initialState);
}
