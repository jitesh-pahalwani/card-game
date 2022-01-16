import HomeActions from './actions.types';
import { generateRandomNumberPairs, shuffleArrayElements } from '../../utils';
import { TOTAL_NUMBER_OF_CARD_PAIRS, CARD_NUMBER_RANGE_FROM, CARD_NUMBER_RANGE_TO } from '../../constants';

const initialState = {
  allCards: [],
};

export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case HomeActions.INITIATE_CARDS:
      let newCards = shuffleArrayElements(generateRandomNumberPairs(TOTAL_NUMBER_OF_CARD_PAIRS, CARD_NUMBER_RANGE_FROM, CARD_NUMBER_RANGE_TO));
      return {
        ...state,
        allCards: newCards
      }
    default:
      return initialState
  }
}