import React from 'react';
import { mount } from 'enzyme';

import Home from '../Components/Home';
import { storeFactory } from '../../jest/setup';
import { TOTAL_NUMBER_OF_CARD_PAIRS } from '../constants';

const initialState = {
    homeReducer: {
        allCards: []
    }
}

describe('Home Screen ', () => {

    it('should render intended number of cards', () => {
        const store = storeFactory(initialState);
        const wrapper = mount(<Home
            store={store}
        />);

        expect(wrapper.find({ 'data-test-id': 'card-component' })).toHaveLength(TOTAL_NUMBER_OF_CARD_PAIRS * 2);

    });
});