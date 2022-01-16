import HomeActions from './actions.types';

/* An action to start the game by initiating the cards */
export function initiateCards() {
  return {
    type: HomeActions.INITIATE_CARDS
  }
}