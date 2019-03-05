import React from 'react';
import {
  SafeAreaView,
  ImageBackground,
  Platform,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  View,
} from 'react-native';
import { LinearGradient } from 'expo';
import ActionDetails from './ActionDetails';
import { defaults, styles } from '../../../constants/Styles';
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
import { PrimaryImage } from '../../../constants/PrimaryImage';


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
            nextDate = originalDate.add(3, 'months').fromNow();
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
          this.onModalClose();
      })
    }
  }

  openZipCodeModal = () =>{
    this.setState({showZipcodeModal: true});
  }

  showDelete = () => {
    if (this.state.delete) {
      return (
        <TouchableOpacity
          onPress={() =>{
            this.delete()
          }}
          hitSlop={{top: 15, left: 15, right:15, bottom:15}}
          style={{ position: 'absolute', right: -2, top: -5 }}
        >
          <Image source={require('../../../assets/delete_icon.png')} style={{height:40, width:40}}/>
        </TouchableOpacity>
      );
    }
  };

  _showTheModal =() => {
    const { item } = this.props;

      let waste = item.action ? parseFloat(item.action.waste).toFixed(2) : parseFloat(item.waste).toPrecision(2);
      let water = item.action ? parseFloat(item.action.water).toPrecision(2) : parseFloat(item.water).toPrecision(2);
      let carbon_dioxide = item.action ? parseFloat(item.action.carbon_dioxide).toPrecision(2) : parseFloat(item.carbon_dioxide).toPrecision(2);
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
    if(!item.action || !get_user.me){
      return <View></View>
    }
    let waste = item.action ? item.action.waste : item.waste;
    let water = item.action ? item.action.water : item.water;
    let carbon_dioxide = item.action ? item.action.carbon_dioxide : item.carbon_dioxide;

    const preview = {
      uri: PrimaryImage,
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
          borderRadius: defaults.borderRadius,
        }}
        source={[preview, { uri: item.action.primary_image } ]}
      />
      <LinearGradient
        colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.85)']}
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

    const preview = { uri: PrimaryImage };
    if(!item || !get_user.me){
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
    <LinearGradient
        colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.8)']}
        locations={[0, 1]}
        style={[styles.gradient, { height: 250}]}
      />
      <Image
        style={{
          flex: 1,
          width: null,
          height: null,
          borderRadius: defaults.borderRadius,
//          backgroundColor: 'red'
        }}
        source={[preview, {uri: canDelete ? item.action.primary_image : item.primary_image}]}
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
    const { canDelete, get_user, item } = this.props;
    if(get_user.loading){
      return <View></View>
    }
    return canDelete ?  this._myActionItem() : this._standardItem()
  }
}

export default ActionCardSmall;


