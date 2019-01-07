import React from "react";

import {
   Text,
   View,
   StyleSheet,
   Dimensions,
   Animated,
   PanResponder
} from "react-native";

import { LinearGradient } from 'expo';

import { Image } from 'react-native-expo-image-cache'
import Styles from "../../constants/Styles";
import NavigationService from '../../navigation/navigationService';
import graphql from '../hoc/graphql';
import { TAKE_ACTION } from '../graphql/mutations/take_action_mutation';
import GameControls from '../game-stack/GameControls';

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const CARD_WIDTH = Dimensions.get("window").width * 0.87;
const CARD_HEIGHT = Dimensions.get("window").height * 0.65;


@graphql(TAKE_ACTION, {
   name:"take_action"
})
export default class GameCards extends React.Component {
   state = {
      currentIndex: 0,
      CARD_COUNT: 3,
      loading:false,
      goBack: this.props.goBack
   };

   position;
   panResponder;
   rotate;
   rotateAndTranslate;

   constructor(props) {
      super(props);

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

     
   }

   componentWillMount() {
      this.panResponder = PanResponder.create({

      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {

        this.position.setValue({ x: gestureState.dx, y: gestureState.dy })
      },
      onPanResponderRelease: (evt, gestureState) => {

        if (gestureState.dx > 120) {
          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy }
          }).start(() => {
            this.position.setValue({ x: 0, y: 0 })
            this.setState({ currentIndex: this.state.currentIndex + 1 })
          })
        }
        else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
          }).start(() => {
            this.position.setValue({ x: 0, y: 0 })
            this.setState({ currentIndex: this.state.currentIndex + 1 })
            
          })
        }
        else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 2
          }).start()
        }
      }
    })
   }

   moveToNextCard = callback => {
      return () => {
         if(this.state.currentIndex >= this.props.items.length-1){
            this.props.navigateBack();
         }
         this.position.setValue({ x: 0, y: 0 });
         
         callback(this.state.currentIndex);
         this.setState({ currentIndex: this.state.currentIndex + 1, loading:false }, callback);
      };
   };

   swipeRight = () => {
      this.setState({loading: true});
      Animated.spring(this.position, {
         toValue: { x: SCREEN_WIDTH + 100, y:0 }
      }).start(this.moveToNextCard(this.props.swipeRight));
   };

   swipeLeft = () => {
      this.setState({loading: true});
      Animated.spring(this.position, {
         toValue: { x: -SCREEN_WIDTH - 100, y:0 }
      }).start(this.moveToNextCard(this.props.swipeLeft));
   };

   renderCards = items => {
      const { currentIndex, NUM_CARDS_DISPLAYED } = this.state;

      // items.map((item, i) => console.log(`item ${i}: `, item));
      const preview = { uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" };

      return items
         .map((item, i) => {
            let offsetStyles = {
               zIndex: (NUM_CARDS_DISPLAYED - i) * 10,
               top: i * 15
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
                        {...{preview, uri: item.primary_image}}
                     />
                     <LinearGradient
                        colors={['rgba(255,255,255,0)', '#000000']}
                        locations={[0, 1]}
                        style={[styles.gradient, { height: CARD_HEIGHT}]}
                     />
                     <Text style={{ fontFamily:"Proxima Nova Bold", fontSize:20,left:15, right:15, position:'absolute',bottom:5,color: 'white' }}>{item.short_description}</Text>
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
                        {...{preview, uri: item.primary_image}}
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
         <View style={{
            flex: 1,
            width: Dimensions.get("window").width - 48,
            marginBottom: 12
         }}>
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
         <GameControls
            rightPress={this.swipeRight}
            leftPress={this.swipeLeft}
            loading={this.state.loading}
         />
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
   gradient: {
      position: 'absolute',
      borderRadius: Styles.borderRadius,
      
      width: CARD_WIDTH,
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
