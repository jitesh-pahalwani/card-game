import React from 'react';
import { shallow } from 'enzyme';

import Card from '../Components/Card';

describe('Card ', () => {

    it('should call intended function on press', () => {
        const mockOnPress = jest.fn();
        const wrapper = shallow(<Card
            onCardPress={mockOnPress}
            isClicked={false}
            isDisabled={false}
        />);

        wrapper.simulate('press');
        expect(mockOnPress).toHaveBeenCalled();

    });
});