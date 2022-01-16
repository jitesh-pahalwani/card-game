import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { connect } from 'react-redux';

import Card from '../Card';
import { initiateCards } from './actions';
import { TOTAL_NUMBER_OF_CARD_PAIRS, FLIP_BACK_ANIMATION_DURATION } from '../../constants';

function Home({ initiateAllCards, allCards }) {
  const [numberOfMoves, setNumberOfMoves] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);
  const [solvedCards, setSolvedCards] = useState([]);
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const timeout = useRef(null);

  /* Initialising the cards every time the screen mounts */
  useEffect(() => {
    initiateAllCards();
  }, []);

  /* A useEffect hook to check if two cards match every time two cards are clicked */
  useEffect(() => {
    if (clickedCards.length === 2) {
      setTimeout(checkIfCardsMatch, FLIP_BACK_ANIMATION_DURATION);
    }
  }, [clickedCards]);

  /* A useEffect hook to check if all cards are solved every time a pair is solved */
  useEffect(() => {
    isGameOver();
  }, [solvedCards]);

  /* A method to be called when the restart button is pressed */
  const onRestartPress = () => {
    initiateAllCards();
    setNumberOfMoves(0);
    setClickedCards([]);
    setSolvedCards([]);
  }

  /* A method to check if the two selected cards match */
  const checkIfCardsMatch = () => {
    enable();
    if (allCards[clickedCards[0]] === allCards[clickedCards[1]]) {
      setSolvedCards([...solvedCards, clickedCards[0], clickedCards[1]]);
      setClickedCards([]);
      return;
    }

    timeout.current = setTimeout(() => {
      setClickedCards([]);
    }, 500);
  };

  /* A method to be called every time a card is pressed */
  const onCardPress = (index) => {
    setNumberOfMoves((numberOfMoves) => numberOfMoves + 1);

    if (clickedCards.length === 1) {
      setClickedCards([...clickedCards, index]);
      disable();
    } else {
      clearTimeout(timeout.current);
      setClickedCards([index]);
    }
  };

  /* A method to check if a card is clicked */
  const checkIsClicked = (cardIndex) => {
    return clickedCards.includes(cardIndex);
  };

  /* A method to check if a card is solved */
  const checkIsSolved = (cardIndex) => {
    return solvedCards.includes(cardIndex);
  };

  /* A method to check if all the cards are solved */
  const isGameOver = () => {
    if (solvedCards.length === (TOTAL_NUMBER_OF_CARD_PAIRS * 2)) {
      Alert.alert("Congratulations!",
        `You win this game by ${numberOfMoves} steps!`,
        [
          { text: "Try another round", onPress: onRestartPress }
        ])
    }
  };

  /* A method to disable all cards once two cards are pressed */
  const disable = () => {
    setShouldDisableAllCards(true);
  };

  /* A method to enable all cards once two cards are either solved or flipped back */
  const enable = () => {
    setShouldDisableAllCards(false);
  };

  /* A method to render all the cards on the screen */
  const renderCards = () => {
    return allCards.map((card, index) => (
      <Card
        cardNum={card}
        key={`${index}${card}`}
        onCardPress={(index) => onCardPress(index)}
        isSolved={checkIsSolved(index)}
        isClicked={checkIsClicked(index)}
        isDisabled={shouldDisableAllCards}
        index={index}
        data-test-id="card-component"
      />
    ))
  }

  return (
    <View style={styles.container}>
      <View style={styles.topSectionContainer}>
        <Button
          onPress={onRestartPress}
          title="Restart"
          color="#0E86D4"
        />
        <View style={styles.stepsSectionContainer}>
          <Text style={styles.stepsLabel}>STEPS: </Text>
          <Text style={styles.stepsCount}>{numberOfMoves}</Text>
        </View>
      </View>
      <View style={styles.cardsContainer}>
        {renderCards()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60
  },
  cardsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepsLabel: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 20
  },
  stepsCount: {
    color: '#0E86D4',
    alignSelf: 'center',
    fontSize: 30
  },
  topSectionContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
  },
  stepsSectionContainer: {
    flexDirection: 'row',
  }
});

const mapStateToProps = (state) => {
  return {
    allCards: state.homeReducer.allCards,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initiateAllCards: () => dispatch(initiateCards()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
