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
import { LinearGradient } from 'expo';
import ActionDetails from './ActionDetails';
import Styles from '../../../constants/Styles';
import { Image } from 'react-native-expo-image-cache';
import NavigationService from '../../../navigation/navigationService';
// import graphql from '../components/hoc/graphql';
import DoubleClick from 'react-native-double-tap';
// import PasswordModal from '../modals/PasswordModal'
import { TAKE_ACTION } from '../../graphql/mutations/take_action_mutation';
import { DELETE_ACTION } from '../../graphql/mutations/delete_action';
import { UPDATE_ZIPCODE } from '../../graphql/mutations/update_zipcode_mutation';
import WasteModal from '../modals/NotWasteReduceModal';
import WaterModal from '../modals/NotH2OConsumptionModal';
import CarbonModal from '../modals/NotCO2EmissionModal';

import ZipCodeModal from '../modals/ZipCodeModal';

import { GET_USER } from '../../graphql/queries/get_user';
import graphql from '../../hoc/graphql';
import { MY_ACTIONS_QUERY } from '../../graphql/queries/my_actions_query';


@graphql(GET_USER, {
  name:'get_user'
})
@graphql(TAKE_ACTION, {
  name: 'take_action'
})
@graphql(DELETE_ACTION,{
  name:"delete_action"
})
@graphql(UPDATE_ZIPCODE,{
  name:"update_zipcode"
})
class ActionCardSmall extends React.Component {
  lastTap=null;
  constructor(props){
    super(props);
  }

  state = {
    showModal: false,
    delete: false,
    takingAction: false,
    congratulationsModal: false,
    showWasteModal: false,
    showWaterModal: false,
    showCarbonModal: false,
    showZipcodeModal: false,
    canDelete : this.props.canDelete ? true : null,
    currScreen: this.props.currScreen ? this.props.currScreen : 'Main'
  };

  delete = () => {
    //TODO
    const { item, delete_action } = this.props;
    this.setState({delete:false});
    delete_action({variables:{id:item.id}}).then(response => {
      
    })
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
    this.backOpacity = this.animatedValue.interpolate({ inputRange: [89, 90], outputRange: [0, 1] })


  }

  flipCard() {
    if(this.state.delete){
      this.delete();
    }
    if(!this.state.delete){
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
  }

  updateZipCode =(zipcode)=>{
    const { get_user, update_zipcode} = this.props;
    if(zipcode){
      let variables={
        id:get_user.me.id,
        zipcode:zipcode
      }
      update_zipcode({variables}).then(()=>{
          console.log('updated zipcode');
          this.onModalClose();
      })
    }
  }

  openZipCodeModal = () =>{
    console.log('openzipcodemodal is being called ')
    this.setState({showZipcodeModal: true});
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

  _takeAction = () => {
    const { take_action, item, get_user, canDelete } = this.props;
    const { currScreen } = this.state;
   
      let variables = {
        id: get_user.me.id,
        action : item.action ? item.action.id : item.id
      }

      let waste = item.action ? item.action.waste : item.waste;
      let water = item.action ? item.action.water : item.water;
      let carbon_dioxide = item.action ? item.action.carbon_dioxide : item.carbon_dioxide;
      console.log('this is being called', waste, water, carbon_dioxide);
      if(!this.props.canDelete){
        if(waste > water && waste > carbon_dioxide){
          this.setState({showWasteModal:true})
        }else if(water > waste && water > carbon_dioxide){
          this.setState({showWaterModal:true})
        }else{
          this.setState({showCarbonModal:true})
        }
      }
     
      take_action({variables}).then(response => {
        if(item.related_actions){
          if(item.related_actions.length > 0){
            NavigationService.navigate('Game',{ previousScreen: currScreen, games:item.related_actions, game_title:item.game_title ? item.game_title : null});
          }
        }
        this.flipCard();
        
      })
  }

  onModalClose = () => {
    this.setState({showWasteModal: false, showWaterModal : false, showCarbonModal: false, showZipcodeModal:false});
  }


  _myActionItem =() =>{
    const { item, index, get_user, canDelete } = this.props;
    const { currScreen, congratulationsModal, takingAction } = this.state;
    const frontAnimatedStyle = {
      transform: [{ rotateY: this.frontInterpolate }],
    };
    const backAnimatedStyle = {
      transform: [{ rotateY: this.backInterpolate }],
    };
    if(!item.action){
      return <View></View>
    }
    let waste = item.action ? item.action.waste : item.waste;
      let water = item.action ? item.action.water : item.water;
      let carbon_dioxide = item.action ? item.action.carbon_dioxide : item.carbon_dioxide;

    const preview = { uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" };
    
    return (
    <View style={{flex:1, height:250, marginVertical:10}}>
    <TouchableOpacity
    onPress={() => {
        this.flipCard()
    }}
  
    onLongPress={() => {
      
      if(canDelete){
        this.setState({ delete: !this.state.delete })
      }
    }}
  >
    {/* <PasswordModal isVisible={this.state.showModal}/> */}
    <Animated.View>
    <Animated.View style={[styles.item,frontAnimatedStyle, , {height: 250, opacity:takingAction ? 0 : 1}]}>
      <Image
        style={{
          flex: 1,
          width: null,
          height: null,
          borderRadius: Styles.borderRadius,
        }}
        {...{preview, uri: item.action.primary_image}}
      />
      <LinearGradient
        colors={['rgba(255,255,255,0)', 'rgba(0,0,0,0.5)']}
        locations={[0.3, 1]}
        style={[styles.gradient, { height: 250}]}
      />
      <Text
        style={{
          position: 'absolute',
          bottom: 10,
          left: 15,
          paddingRight:5,
          fontWeight: 'bold',
          fontFamily: 'Proxima Nova Bold',
          color: '#fff',
          fontSize: 18,
        }}
    >
        {canDelete && (
          item.action.action_taken_description.length > 48 ? `${item.action.action_taken_description.substring(0, 40)}...` : item.action.action_taken_description
        )}
        {!canDelete && (item.short_description.length > 48 ? `${item.short_description.substring(0, 40)}...` : item.short_description)}
      </Text>

      {this.state.delete && this.showDelete()}
    </Animated.View>
    <Animated.View
      style={[
        backAnimatedStyle,
        styles.item,
        styles.flippedItem,
        { height: 250 },
        { opacity: this.backOpacity}
      ]}
    >
      <ActionDetails data={item} canDelete={true} takeTheAction={this._takeAction} zipcode={get_user.me.zipcode} openZipCodeModal={this.openZipCodeModal}/>

    </Animated.View>
    <WasteModal waste={waste} onClose={this.onModalClose} visible={this.state.showWasteModal}/>
    <WaterModal water={water} onClose={this.onModalClose} visible={this.state.showWaterModal}/>
    <ZipCodeModal updateZipcode={this.updateZipCode} onClose={this.onModalClose} visible={this.state.showZipcodeModal} />

    <CarbonModal carbon_dioxide={carbon_dioxide} onClose={this.onModalClose} visible={this.state.showCarbonModal}/>
    </Animated.View>
  </TouchableOpacity>
  </View>)
  }

  _standardItem = () =>{
    const { item, index, canDelete, get_user } = this.props;
    const { currScreen, takingAction, congratulationsModal } = this.state;
    const frontAnimatedStyle = {
      transform: [{ rotateY: this.frontInterpolate }],
    };
    const backAnimatedStyle = {
      transform: [{ rotateY: this.backInterpolate }],
    };

    const preview = { uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" };
    if(!item){
      return <View></View>
    }
    
    let waste = item.waste;
    let water = item.water;
    let carbon_dioxide = item.carbon_dioxide;
    return <View style={{flex:1, height:250, marginVertical:10}}>
    
    <DoubleClick
    style={{ flex: 1}}
    singleTap={async () => {
      // if(!canDelete){
        this.flipCard()
      // } else{
      //   console.log('this is also firing');
      //   this._takeAction();
      // }
    }}
    
    doubleTap={() => {
     if(!canDelete){
        this._takeAction()
      }
    }}
    delay={200}
    
  >
    {/* <PasswordModal isVisible={this.state.showModal}/> */}

    <Animated.View style={[styles.item,frontAnimatedStyle, {height: 250, opacity:takingAction ? 0 : 1}]}>
      <Image
        style={{
          flex: 1,
          width: null,
          height: null,
          borderRadius: Styles.borderRadius,
        }}
        {...{preview, uri: canDelete ? item.action.primary_image : item.primary_image}}
      />
      <LinearGradient
        colors={['rgba(255,255,255,0)', 'rgba(0,0,0,0.5)']}
        locations={[0.3, 1]}
        style={[styles.gradient, { height: 250}]}
      />
      <Text
        style={{
          position: 'absolute',
          bottom: 10,
          left: 15,
          paddingRight:5,
          fontWeight: 'bold',
          fontFamily: 'Proxima Nova Bold',
          color: '#fff',
          fontSize: 18,
        }}
      >   
        {canDelete && (
          
          item.action.action_taken_description.length > 48 ? `${item.action.action_taken_description.substring(0, 40)}...` : item.action.action_taken_description
        )}
        {!canDelete && (item.short_description.length > 48 ? `${item.short_description.substring(0, 40)}...` : item.short_description)}
      </Text>

      {this.state.delete && this.showDelete()}
    </Animated.View>
    <Animated.View
      style={[
        backAnimatedStyle,
        styles.item,
        styles.flippedItem,
        { height: 250 },
        { opacity: this.backOpacity}
      ]}
    >
      <ActionDetails data={item} canDelete={false} takeTheAction={this._takeAction} zipcode={get_user.me.zipcode} openZipCodeModal={this.openZipCodeModal}/>
      <WasteModal waste={waste} onClose={this.onModalClose} visible={this.state.showWasteModal}/>
      <WaterModal water={water} onClose={this.onModalClose} visible={this.state.showWaterModal}/>
      <CarbonModal carbon_dioxide={carbon_dioxide} onClose={this.onModalClose} visible={this.state.showCarbonModal}/>
      <ZipCodeModal updateZipcode={this.updateZipCode} onClose={this.onModalClose} visible={this.state.showZipcodeModal} />
      {this.state.delete && this.showDelete()}
      
    </Animated.View>
  </DoubleClick>
    
    </View>

  
  }

  render() {
    const { canDelete, get_user } = this.props;
    if(get_user.loading){
      return <View></View>
    }
    return canDelete ?  this._myActionItem() :this._standardItem()
  }
}

const styles = StyleSheet.create({
  item: {
    alignContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginTop: 10,
    paddingLeft:10,
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: Styles.borderRadius,
    backfaceVisibility: 'hidden',
  },
  gradient: {
    position: 'absolute',
    borderRadius: Styles.borderRadius,
    marginLeft:10,
    top:0,
    bottom:0,
    left:0,
    right:0,
    height:250
  },
  flippedItem: {
    backgroundColor: '#ffffff',
    position: 'absolute',
    marginLeft: 10,
    top:0,
    bottom:0,
    left:0,
    right:-5,
    height:250
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



export default ActionCardSmall;