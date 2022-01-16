import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, Pressable, Dimensions, Animated } from 'react-native';

import { FLIP_ANIMATION_DURATION } from '../../constants';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Card(props) {
  const { cardNum, onCardPress, isSolved, isClicked, isDisabled, index } = props;
  const flipAnimation = useRef(new Animated.Value(0)).current;
  let flipRotation = 0;

  flipAnimation.addListener(({ value }) => flipRotation = value);

  /* Transformation to flip a card to the front side */
  const flipToFrontStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ["0deg", "180deg"]
        })
      }
    ]
  };

  /* Transformation to flip a card to the back side */
  const flipToBackStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ["180deg", "360deg"]
        })
      }
    ]
  };

  /* Method to execute the front flipping animation of a card */
  const flipToFront = () => {
    Animated.timing(flipAnimation, {
      toValue: 180,
      duration: FLIP_ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  };

  /* Method to execute the back flipping animation of a card */
  const flipToBack = () => {
    Animated.timing(flipAnimation, {
      toValue: 0,
      duration: FLIP_ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    !isClicked && !isSolved && flipToBack();
  }, [isClicked, isSolved])

  /* Method to be executed on pressing a card */
  const handlePress = () => {
    !isClicked && !isDisabled && onCardPress(index);
    flipToFront();
  }

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <Animated.View style={{ ...styles.cardCommon, ...styles.openCard, ...flipToBackStyle }}>
        <Text style={[styles.text, styles.openText]}>{cardNum}</Text>
      </Animated.View>
      <Animated.View style={{ ...styles.cardCommon, ...styles.closedCard, ...flipToFrontStyle }}>
        <Text style={[styles.text, styles.closedText]}>?</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  cardCommon: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 3,
    borderRadius: 12,
    height: windowHeight / 5.5,
    width: windowWidth / 4,
  },
  openCard: {
    backgroundColor: '#fff',
    backfaceVisibility: "hidden",
  },
  closedCard: {
    backgroundColor: '#0E86D4',
    position: "absolute",
    backfaceVisibility: "hidden",
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20
  },
  openText: {
    color: 'black',
  },
  closedText: {
    color: 'white',
  }
});

export default React.memo(Card)
