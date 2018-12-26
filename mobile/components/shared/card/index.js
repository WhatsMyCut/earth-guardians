import React from 'react';
import {
  SafeAreaView,
  ImageBackground,
  Platform,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  View,
} from 'react-native';
import { LinearGradient, Icon } from 'expo';
import LinearGradientProps from '../../../constants/LinearGradientProps';
import Styles from '../../../constants/Styles';
import { Image } from 'react-native-expo-image-cache';
// import graphql from '../components/hoc/graphql';

export default class ActionCardSmall extends React.Component {
  state = {
    delete: false,
  };
  delete = () => {
    //TODO
    console.log('delete');
  };

  componentWillMount(){
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })
  }

  flipCard() {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue,{
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
    } else {
      Animated.spring(this.animatedValue,{
        toValue: 180,
        friction: 8,
        tension: 10
      }).start();
    }

  }

  showDelete = () => {
    if (this.state.delete) {
      return (
        <TouchableOpacity
          onPress={() => this.delete()}
          style={{ position: 'absolute', right: -2, top: -15 }}
        >
          <Icon.AntDesign name="closecircle" size={32} color="red" />
        </TouchableOpacity>
      );
    }
  };
  render() {
    const { item, index } = this.props;
    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate}
      ]
    }
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate }
      ]
    }

    const preview = { uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" };


    return (
      <TouchableOpacity
        style={{ flex: 1, height: index % 2 ? 230 : 250, width:180}}
        onPress={() => this.flipCard()}
        onLongPress={() => this.setState({ delete: !this.state.delete })}
      >
        
        <Animated.View style={[styles.item,frontAnimatedStyle, {height: index % 2 ? 230 : 250}]}>
          <Image
            style={{
              flex: 1,
              width: null,
              height: null,
              borderRadius: Styles.borderRadius,
            }}
            {...{preview, uri:item.image}}
          />
          <LinearGradient
        colors={['rgba(255,255,255,0)', '#000000']}
        locations= {[0.3, 1]}
        style={[styles.gradient, {height: index % 2 ? 220 : 240}]}
        ></LinearGradient>
          <Text
            style={{
              position: 'absolute',
              bottom: 10,
              left: 15,
              fontWeight: 'bold',
              fontFamily: 'Proxima Nova Bold',
              color: '#fff',
              fontSize: 18,
            }}
          >
            {item.text.length > 50 ? item.text.substring(0, 50) : item.text}
          </Text>

          {this.showDelete()}
        </Animated.View>
        <Animated.View style={[backAnimatedStyle, styles.item, styles.flippedItem, {height: index % 2 ? 220 : 240}]}>
          
          <Text
            style={{
              position: 'absolute',
              bottom: 10,
              left: 15,
              fontWeight: 'bold',
              fontFamily: 'Proxima Nova Bold',
              color: '#000000',
              fontSize: 18,
            }}
          >
              FLIPPED
          </Text>

          {this.showDelete()}
        </Animated.View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    alignContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    width:180,
    shadowRadius: 2,
    paddingHorizontal: 10,
    elevation: 1,
    marginTop: 10,
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: Styles.borderRadius,
    backfaceVisibility: 'hidden',
  },
  gradient:{
    position: 'absolute',
    paddingHorizontal: 10,
    borderRadius: Styles.borderRadius,
    left:10, 
    width:160,
  },
  flippedItem:{
    backgroundColor:"#ffffff",
    position:"absolute",
    left:10, 
    width:160,
    flex:1
  },
  imageLinearGradient: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: Styles.borderRadius,
  },
});
