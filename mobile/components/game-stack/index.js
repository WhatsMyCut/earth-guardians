import React from "react";

import {
   Text,
   View,
   StyleSheet,
   Dimensions,
   Animated,
   Image,
   PanResponder
} from "react-native";
import Styles from "../../constants/Styles";
import NavigationService from '../../navigation/navigationService';

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const CARD_WIDTH = Dimensions.get("window").width * 0.87;
const CARD_HEIGHT = Dimensions.get("window").height * 0.65;



export default class GameCards extends React.Component {
   state = {
      currentIndex: 0,
      CARD_COUNT: 3,
      goBack: this.props.goBack
   };

   position;
   panResponder;
   rotate;
   rotateAndTranslate;

   // constructor(props) {
   //    super(props);

   //    this.nextCardOpacity = this.state.position.x.interpolate({
   //       inputRange: [-CARD_WIDTH / 2, 0, CARD_WIDTH / 2],
   //       outputRange: [1, 0.2, 1],
   //       extrapolate: "clamp"
   //    });
   //    this.overlayOpacity = this.state.position.x.interpolate({
   //       inputRange: [-CARD_WIDTH / 2, 0, CARD_WIDTH / 2],
   //       outputRange: [0, 1, 0],
   //       extrapolate: "clamp"
   //    });
   // }

   componentWillMount() {
      this.position = new Animated.ValueXY();

      this.rotate = this.position.x.interpolate({
         inputRange: [-CARD_WIDTH / 2, 0, CARD_WIDTH / 2],
         outputRange: ["-12deg", "0deg", "12deg"],
         extrapolate: "clamp"
      });

      this.rotateAndTranslate = {
         transform: [
            { rotate: this.rotate },
            ...this.position.getTranslateTransform()
         ]
      };

      this.panResponder = PanResponder.create({
         onStartShouldSetPanResponder: () => true,
         onStartShouldSetPanResponderCapture: () => true,
         onMoveShouldSetPanResponder: () => true,
         onPanResponderMove: (_, gestureState) => {
            this.position.setValue({
               x: gestureState.dx,
               y: gestureState.dy
            });
         },
         onPanResponderRelease: (_, gestureState) => {
            let { position } = this.state;
            if (gestureState.dx > 120) {
               this.swipeRight(position, gestureState.dy);
            } else if (gestureState.dx < -120) {
               this.swipeLeft(position, gestureState.dy);
            } else {
               Animated.spring(position, {
                  toValue: { x: 0, y: 0 },
                  friction: 2
               }).start();
            }
         }
      });
   }

   moveToNextCard = callback => {
      return () => {
         if(this.state.currentIndex == this.props.items.length-2){
            this.props.navigateBack();
         }
         this.position.setValue({ x: 0, y: 0 });
         this.setState({ currentIndex: this.state.currentIndex + 1 }, callback);
      };
   };

   swipeRight = (y = 0) => {
      Animated.spring(this.position, {
         toValue: { x: CARD_WIDTH + 100, y }
      }).start(this.moveToNextCard(this.props.swipeRight));
   };

   swipeLeft = (y = 0) => {
      Animated.spring(this.position, {
         toValue: { x: -CARD_WIDTH - 100, y }
      }).start(this.moveToNextCard(this.props.swipeLeft));
   };

   renderCards = items => {
      const { currentIndex, NUM_CARDS_DISPLAYED } = this.state;

      // items.map((item, i) => console.log(`item ${i}: `, item));

      return items
         .map((item, i) => {
            let offsetStyles = {
               zIndex: (NUM_CARDS_DISPLAYED - i) * 10,
               top: i * 10
            };
            let scale = { transform: [{ scale: 1 - 0.03 * i }] };
            if (i < currentIndex) {
               return null;
            } else if (i == currentIndex) {
               return (
                  <Animated.View
                     {...this.panResponder.panHandlers}
                     key={`${i}-${item.id}`}
                     style={[this.rotateAndTranslate, styles.card]}
                  >
                     <Image
                        style={styles.cardImage}
                        source={{ uri: item.uri }}
                     />
                  </Animated.View>
               );
            } else if (i > currentIndex + NUM_CARDS_DISPLAYED) {
               return null;
            } else {
               return (
                  <Animated.View
                     key={item.id}
                     style={[styles.card, offsetStyles, scale]}
                  >
                     <Image
                        style={styles.cardImage}
                        source={{ uri: item.uri }}
                     />
                  </Animated.View>
               );
            }
         })
         .reverse();
   };

   render() {
      const { position} = this.state;
      
      return (
         <View
            style={{
               flexGrow: 1,
               alignSelf: "stretch",
               position: "relative",
               alignItems: "center"
            }}
         >
            {this.renderCards(this.props.items)}
         </View>
      );
   }
}

const styles = StyleSheet.create({
   card: {
      height: CARD_HEIGHT,
      width: CARD_WIDTH,
      position: "absolute",
      padding: 0,
      top: 0,
      borderRadius: Styles.borderRadius,
      shadowColor: "#000",
      shadowRadius: 2,
      shadowOpacity: 0.75,
      shadowOffset: {
         width: 0,
         height: 0
      },
      backgroundColor: "white"
   },
   cardImage: {
      flex: 1,
      height: null,
      width: null,
      resizeMode: "cover",
      borderRadius: Styles.borderRadius
   }
   // overlay: {
   //    flexGrow: 1,
   //    alignSelf: "stretch",
   //    backgroundColor: "rgba(255,255,255,0.5)",
   //    zIndex: 15
   // }
});
