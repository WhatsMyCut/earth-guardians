import React from 'react';
import {
  SafeAreaView,
  ImageBackground,
  Platform,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image as NativeImage,
  Animated,
  View,
} from 'react-native';
import { LinearGradient, Icon } from 'expo';
import LinearGradientProps from '../../../constants/LinearGradientProps';
import ActionDetails from './ActionDetails';
import Styles from '../../../constants/Styles';
import { Image } from 'react-native-expo-image-cache';
import NavigationService from '../../../navigation/navigationService';
// import graphql from '../components/hoc/graphql';
import DoubleClick from 'react-native-double-tap';
import PasswordModal from '../modals/PasswordModal'

export default class ActionCardSmall extends React.Component {
  lastTap=null;

  state = {
    showModal: false,
    delete: false,
    canDelete : this.props.canDelete ? true : null,
    currScreen: this.props.currScreen ? this.props.currScreen : 'Main'
  };
  delete = () => {
    //TODO
    console.log('delete');
  };

  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    });
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    });
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg'],
    });
  }

  flipCard() {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
      }).start();
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
      }).start();
    }
  }

  showDelete = () => {
    if (this.state.delete) {
      return (
        <TouchableOpacity
          onPress={() =>{
            console.log('red icon was pressed');
            this.delete()
          }}
          hitSlop={{top: 15, left: 15, right:15, bottom:15}}
          style={{ position: 'absolute', right: -2, top: -5 }}
        >
          <NativeImage source={require('../../../assets/delete_icon.png')} style={{height:40, width:40}}/>
        </TouchableOpacity>
      );
    }
  };

  render() {
    const { item, index, canDelete } = this.props;
    const { currScreen } = this.state;
    const frontAnimatedStyle = {
      transform: [{ rotateY: this.frontInterpolate }],
    };
    const backAnimatedStyle = {
      transform: [{ rotateY: this.backInterpolate }],
    };

    const preview = { uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" };
    return (
      <DoubleClick
        style={{ flex: 1, height: index % 2 ? 230 : 250, width: 180 }}
        singleTap={() => {
          console.log("single tap");
          this.flipCard()
        }}
        
        doubleTap={() => {
          if(canDelete){  
            this.setState({ delete: !this.state.delete })
          } else if(item.hasGame && !canDelete){
            NavigationService.navigate('Game',{ previousScreen: currScreen});
          } else if(!canDelete || !item.hasGame){
            this.setState({showModal : true})
            // NavigationService.navigate('Modal',{ previousScreen: currScreen});
          }
        }}
        delay={200}
        
      >
        <PasswordModal isVisible={this.state.showModal}/>

        <Animated.View style={[styles.item,frontAnimatedStyle, {height: 250}]}>
          <Image
            style={{
              flex: 1,
              width: null,
              height: null,
              borderRadius: Styles.borderRadius,
            }}
            {...{preview, uri:item.primary_image}}
          />
          <LinearGradient
            colors={['rgba(255,255,255,0)', '#000000']}
            locations={[0.3, 1]}
            style={[styles.gradient, { height: 250}]}
          />
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
            {item.short_description.length > 50 ? item.short_description.substring(0, 50) : item.short_description}
          </Text>

          {this.state.delete && this.showDelete()}
        </Animated.View>
        <Animated.View
          style={[
            backAnimatedStyle,
            styles.item,
            styles.flippedItem,
            { height: 240 },
          ]}
        >
          <ActionDetails data={item}/>

          {this.state.delete && this.showDelete()}
        </Animated.View>
      </DoubleClick>
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
    width: 180,
    shadowRadius: 2,
    paddingHorizontal: 10,
    elevation: 1,
    marginTop: 10,
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: Styles.borderRadius,
    backfaceVisibility: 'hidden',
  },
  gradient: {
    position: 'absolute',
    paddingHorizontal: 10,
    borderRadius: Styles.borderRadius,
    left: 10,
    width: 160,
  },
  flippedItem: {
    backgroundColor: '#ffffff',
    position: 'absolute',
    left: 10,
    width: 160,
    flex: 1,
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
