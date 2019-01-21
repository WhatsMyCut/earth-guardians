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
import moment from 'moment';
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
    backVisible: false,
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

  canTakeAgain(item){
    let momentDate = moment(item.createdAt);
    let originalDate = moment(item.createdAt);
    let today = moment(new Date());
    let canGoThrough = false;
    let nextDate = moment();
    let schedule = item.action ? item.action.schedule : item.schedule;
  
    switch(schedule){
        case 'ANNUALLY' :
            nextDate = originalDate.add(1, 'years').fromNow();
            if(nextDate.indexOf('ago') !== -1){
              canGoThrough = true;
            }
            break;
        case 'ANYTIME' :
            nextDate = 'You can take this action anytime!';
            canGoThrough = true;
            break;
        case 'ONCE' :
            canGoThrough = false;
            nextDate = 'never'
            break;
        case 'DAILY' :
            nextDate = originalDate.add(1, 'days').fromNow();
            if(nextDate.indexOf('ago') !== -1){
              canGoThrough = true;
            }
            break;
        case 'BIWEEKLY' :
            nextDate = originalDate.add(4, 'days').fromNow();
            if(nextDate.indexOf('ago') !== -1){
              canGoThrough = true;
            }
            break;
        case 'WEEKLY' :
            nextDate = originalDate.add(7, 'days').fromNow();
            if(nextDate.indexOf('ago') !== -1){
              canGoThrough = true;
            }
            break;
        case 'TWOWEEKS' :
            nextDate = originalDate.add(14, 'days').fromNow();
            if(nextDate.indexOf('ago') !== -1){
              canGoThrough = true;
            }
            break;
        case 'MONTHLY' :
            nextDate = originalDate.add(1, 'months').fromNow();
            if(nextDate.indexOf('ago') !== -1){
              canGoThrough = true;
            }
            break;
        case 'QUARTERLY' :
            nextDate = originalDate.add(4, 'months').fromNow();
            if(nextDate.indexOf('ago') !== -1){
              canGoThrough = true;
            }
            break;
        case 'SEMIANNUALLY' :
            nextDate = originalDate.add(6, 'months').fromNow();
            if(nextDate.indexOf('ago') !== -1){
              canGoThrough = true;
            }
            break;
    }
    // console.log('nextDate', nextDate, item.action ? item.action.schedule : item.schedule)
    // console.log('difference between days', originalDate.diff(today,'months'))
    // console.log('can go through', canGoThrough, nextDate)
    return  { canGoThrough : canGoThrough, nextDate:nextDate ? nextDate : null};
  }

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
    this.setState({backVisible:!this.state.backVisible})
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

  _showTheModal =() =>{
    const { item } = this.props;
   
      let waste = item.action ? item.action.waste : item.waste;
      let water = item.action ? item.action.water : item.water;
      let carbon_dioxide = item.action ? item.action.carbon_dioxide : item.carbon_dioxide;
      if(this.props.canDelete){
        if(waste > water && waste > carbon_dioxide){
          this.setState({showWasteModal:true})
        }else if(water > waste && water > carbon_dioxide){
          this.setState({showWaterModal:true})
        }else{
          this.setState({showCarbonModal:true})
        }
      }
  }

  _takeAction = () => {
    const { take_action, item, get_user, canDelete } = this.props;
    const { currScreen } = this.state;
      console.log('take this action', item.id || item.action.id);
      let variables = {
        id: get_user.me.id,
        action : item.action ? item.action.id : item.id
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

  onActionModalClose = () => {
    this.setState({showWasteModal: false, showWaterModal : false, showCarbonModal: false, showZipcodeModal:false});
    this._takeAction();
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

      const preview = {
        uri:
          "data:image/png;base64,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",
      };    
    
      let timeInfo = this.canTakeAgain(item);


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
        colors={['rgba(255,255,255,0)', 'rgba(0,0,0,0.85)']}
        locations={[0.0, 1]}
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
      </Text>
      
      {!timeInfo.canGoThrough && (
        
      <LinearGradient
        colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.8)']}
        locations={[0.0, 1]}
        style={[styles.gradient, { height: 250}]}
      />
      )}

      {!timeInfo.canGoThrough && (
      <Text
      style={{
          position: 'absolute',
          top: 10,
          left: 15,
          paddingRight:5,
          fontWeight: 'bold',
          fontFamily: 'Proxima Nova Bold',
          color: '#fff',
          fontSize: 18,
        }}
    >
        Take action again {timeInfo.nextDate}
        
      </Text>
      )} 
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
      <ActionDetails visible={this.state.backVisible} takeTheAction={this._showTheModal} data={item} canDelete={true} canGoThrough={timeInfo.canGoThrough} zipcode={get_user.me.zipcode} openZipCodeModal={this.openZipCodeModal}/>

    </Animated.View>
    <WasteModal waste={waste} onClose={this.onActionModalClose} visible={this.state.showWasteModal}/>
    <WaterModal water={water} onClose={this.onActionModalClose} visible={this.state.showWaterModal}/>
    <ZipCodeModal updateZipcode={this.updateZipCode} onClose={this.onModalClose} visible={this.state.showZipcodeModal} />

    <CarbonModal carbon_dioxide={carbon_dioxide} onClose={this.onActionModalClose} visible={this.state.showCarbonModal}/>
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
        colors={['rgba(255,255,255,0)', 'rgba(0,0,0,0.8)']}
        locations={[0, 1]}
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
      <ActionDetails visible={this.state.backVisible} data={item} takeTheAction={this._takeAction} canDelete={false} zipcode={get_user.me.zipcode} openZipCodeModal={this.openZipCodeModal}/>
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
    return canDelete ?  this._myActionItem() : this._standardItem()
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