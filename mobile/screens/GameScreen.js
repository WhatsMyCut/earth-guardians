import React from "react";

import { Text, View, StyleSheet, Dimensions } from "react-native";

import GameControls from "../components/game-stack/GameControls";
import GameCards from "../components/game-stack";

const items = [
   {
      id: 1,
      // uri: "https://unsplash.com/photos/N_0Wi_OrucE",
      uri:
         "https://images.unsplash.com/photo-1507290439931-a861b5a38200?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4e49f0b66341702171b119d4578a05ff&auto=format&fit=crop&w=1790&q=80",
      question: "Are you vegan?",
      points: 15,
      frequency: "month",
      metric: {
         co2: 250,
         h20: 6500,
         waste: 0
      }
   },
   {
      id: 2,
      // uri: "https://unsplash.com/photos/KUZnfk-2DSQ",
      uri:
         "https://images.unsplash.com/photo-1507290439931-a861b5a38200?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4e49f0b66341702171b119d4578a05ff&auto=format&fit=crop&w=1790&q=80",
      question: "Are you vegetarian?",
      points: 10,
      frequency: "month",
      metric: {
         co2: 4.5,
         h20: 441,
         waste: 0
      }
   },
   {
      id: 3,
      // uri: "https://unsplash.com/photos/IGfIGP5ONV0",
      uri:
         "https://images.unsplash.com/photo-1507290439931-a861b5a38200?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4e49f0b66341702171b119d4578a05ff&auto=format&fit=crop&w=1790&q=80",
      question: "Eat vegetarian for one week?",
      points: 10,
      frequency: "week",
      metric: {
         co2: 4.5,
         h20: 441,
         waste: 0
      }
   },
   {
      id: 4,
      // uri: "https://unsplash.com/photos/Y8Rp1X6psC4",
      uri:
         "https://images.unsplash.com/photo-1507290439931-a861b5a38200?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4e49f0b66341702171b119d4578a05ff&auto=format&fit=crop&w=1790&q=80",
      question: "Eat vegetarian for one day?",
      points: 8,
      frequency: "day",
      metric: {
         co2: 4.5,
         h20: 441,
         waste: 0
      }
   },
   {
      id: 5,
      // uri: "https://unsplash.com/photos/OgmaA8CkwHA",
      uri:
         "https://images.unsplash.com/photo-1507290439931-a861b5a38200?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4e49f0b66341702171b119d4578a05ff&auto=format&fit=crop&w=1790&q=80",
      question: "Eat one vegetarian meal per day?",
      points: 8,
      frequency: "week",
      metric: {
         co2: 1.5,
         h20: 137,
         waste: 0
      }
   }
];

class GameScreen extends React.Component {
   cardStack;

   swipeRight = () => {
      console.log("swiped right");
   };

   swipeLeft = () => {
      console.log("swiped left");
   };

   handleRightPress = () => {
      this.cardStack.swipeRight();
   };

   handleLeftPress = () => {
      this.cardStack.swipeLeft();
   };
   render() {
      return (
         <View style={styles.container}>
            <Text style={styles.header}>RE-ARCTIC ACTIONS</Text>
            <View style={styles.cardContainer}>
               <GameCards
                  items={items}
                  swipeRight={this.swipeRight}
                  swipeLeft={this.swipeLeft}
                  ref={ref => (this.cardStack = ref)}
               />
            </View>
            <GameControls
               rightPress={this.handleRightPress}
               leftPress={this.handleLeftPress}
            />
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "space-between",
      padding: 24
   },
   cardContainer: {
      flex: 1,
      width: Dimensions.get("window").width - 48,
      marginBottom: 12
   },
   header: {
      fontSize: 24,
      paddingVertical: 12,
      fontFamily: "Proxima Nova Bold"
   }
});

export default GameScreen;
