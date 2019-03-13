import React from 'react';
import {
  Text,
  TouchableOpacity,
  Image,
  Animated,
  View,
} from 'react-native';
import { LinearGradient, } from 'expo';
import ActionDetails from './ActionDetails';
import { defaults, styles } from '../../../constants/Styles';
import NavigationService from '../../../navigation/navigationService';
import PubSub from 'pubsub-js'
// import graphql from '../components/hoc/graphql';
import DoubleClick from 'react-native-double-tap';
import { RetrieveData } from '../../../store/AsyncStore';
// import PasswordModal from '../modals/PasswordModal'
import moment from 'moment';
import graphql from '../../hoc/graphql';
import { TAKE_ACTION } from '../../graphql/mutations/take_action_mutation';
import { DELETE_ACTION } from '../../graphql/mutations/delete_action';
import { GET_USER } from '../../graphql/queries/get_user';
import { MY_ACTIONS_QUERY } from '../../graphql/queries/my_actions_query';
import { PrimaryImage } from '../../../constants/PrimaryImage';
import { _eventHit } from '../../../services/googleAnalytics';


@graphql(GET_USER, {
  name:'get_user'
})
@graphql(TAKE_ACTION, {
  name: 'take_action'
})
@graphql(DELETE_ACTION,{
  name:"delete_action"
})
class ActionCardSmall extends React.Component {
  constructor(props){
    super(props);
  }

  lastTap=null;
  state = {
    delete: false,
    takingAction: false,
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

  onActionModalClose = () => {
    this._takeAction()
    .then(() => this.setState({showWasteModal: false, showWaterModal : false, showCarbonModal: false, showZipcodeModal:false}))
    .then(this.props.onClose());
  }


  _takeAction = () => {
    const { take_action, item, get_user, canDelete } = this.props;
    const { currScreen } = this.state;
      let variables = {
        id: get_user.me.id,
        action : item.action ? item.action.id : item.id
      }
      take_action({variables})
      .then(response => {
        if(item.related_actions){
          if(item.related_actions.length > 0){
            NavigationService.navigate('Game',{ previousScreen: currScreen, games:item.related_actions, game_title:item.game_title ? item.game_title : null});
          }
        }
        this.flipCard();
      })
  }

  _showTheModal = async (data) => {
    const { item, canDelete } = this.props;
    this._takeAction()
    let waste = item.action ? parseFloat(item.action.waste).toFixed(2) : parseFloat(item.waste).toFixed(2);
    let water = item.action ? parseFloat(item.action.water).toFixed(2) : parseFloat(item.water).toFixed(2);
    let carbon_dioxide = item.action ? parseFloat(item.action.carbon_dioxide).toFixed(2) : parseFloat(item.carbon_dioxide).toFixed(2);
    if(canDelete){

      if(waste > water && waste > carbon_dioxide){
        console.log('here')
        data = waste
        PubSub.publish('showWasteModal', {data})
      }else if(water > waste && water > carbon_dioxide){
        console.log('here2')
        data = water
        PubSub.publish('showWaterModal', {data})
      } else {
        data = carbon_dioxide
        PubSub.publish('openCarbonModal',{data})
        console.log('here3', data)
      }
      const page = 'MyActionScreen'
      const item_id = await item.id;
      const phone = await RetrieveData('phone');
      const inout = (this.state.in) ? 'in' : 'out'
      const params = {
        page, event: 'TakeAction', in: inout, phone, id: item_id
      }
      _eventHit('TakeAction', params, res => console.log(res.event, res.params))
    }
  }

  _addAction = async () => {
    try {
      // TODO update Database
      this.setState(
        prevState => ({
          in: !prevState.in,
        })
      );
      this._takeAction();
      const page = 'MyActionScreen'
      const item_id = await this.props.item.id;
      const phone = await RetrieveData('phone');
      const inout = (this.state.in) ? 'in' : 'out'
      const params = {
        page, event: 'AddAction', in: inout, phone, id: item_id
      }
      PubSub.publish('openGameCompleteModal', params);
      _eventHit('AddAction', params, res => console.log(res.event, res.params))
    } catch (e) {
      console.log(e.message);
    }
  };


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
      <View style={[styles.container, {height:250, marginVertical:10}]}>
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
          <Animated.View>
            <Animated.View
              style={[
                styles.actionCard,
                frontAnimatedStyle,
                {
                  opacity:takingAction ? 0 : 1
                }
              ]}
            >
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
                style={[styles.textWhiteBold, styles.smallTextShadow, {
                  position: 'absolute',
                  bottom: 10,
                  left: 15,
                  paddingRight:5,
                }]}
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
                  style={[styles.textWhiteBold, styles.smallTextShadow, {
                    position: 'absolute',
                    top: 10,
                    left: 15,
                    paddingRight:5,
                    fontWeight: 'bold',
                  }]}
                >
                  Take action again {timeInfo.nextDate}

                </Text>
              )}
              {this.state.delete && this.showDelete()}
            </Animated.View>
            <Animated.View
              style={[
                backAnimatedStyle,
                styles.actionCard,
                styles.actionCardBack,
                { opacity: this.backOpacity, left: 10, }
              ]}
            >
              <ActionDetails
                visible={this.state.backVisible}
                data={item}
                takeTheAction={this._showTheModal}
                canDelete={true}
                canGoThrough={timeInfo.canGoThrough}
                zipcode={get_user.me.zipcode}
                openModal={this.props.openModal}/>
            </Animated.View>
          </Animated.View>
        </TouchableOpacity>
      </View>
    )
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
    return (
      <View style={[styles.container, {height:250, marginBottom: 10}]}>
        <DoubleClick
          style={[styles.container]}
          singleTap={async () => {
            this.flipCard()
          }}
          doubleTap={() => {
            if(!canDelete) {
              this._takeAction()
            }
          }}
          delay={200}
        >
          <Animated.View
            style={[
              styles.actionCard,
              frontAnimatedStyle,
              {
                opacity: takingAction ? 0 : 1
              }
            ]}
          >
            <LinearGradient
              colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.8)']}
              locations={[0, 1]}
              style={[styles.gradient, { height: 250}]}
            />
            <Image
              style={[styles.container, {
                width: null,
                height: null,
                borderRadius: defaults.borderRadius,
              }]}
              source={[preview, {uri: canDelete ? item.action.primary_image : item.primary_image}]}
            />
            <Text
              style={[styles.textWhiteBold, styles.smallTextShadow, {
                position: 'absolute',
                bottom: 10,
                left: 15,
                paddingRight: 5,
              }]}
            >
              {canDelete && (item.action.action_taken_description.length > 48 ? `${item.action.action_taken_description.substring(0, 40)}...` : item.action.action_taken_description)}
              {!canDelete && (item.short_description.length > 48 ? `${item.short_description.substring(0, 40)}...` : item.short_description)}
            </Text>
            {this.state.delete && this.showDelete()}
          </Animated.View>
          <Animated.View
            style={[
              backAnimatedStyle,
              styles.actionCard,
              styles.actionCardBack,
              {
                opacity: this.backOpacity,
                left: 10,
              }
            ]}
          >
            <ActionDetails
              visible={this.state.backVisible}
              data={item}
              takeTheAction={this._addAction}
              canDelete={false}
              zipcode={get_user.me.zipcode}
              openModal={this.props.openModal}
            />
            {this.state.delete && this.showDelete()}
          </Animated.View>
        </DoubleClick>

      </View>
    )

  }

  render() {
    const { canDelete, get_user, item } = this.props;
    if(get_user.loading){
      return <View></View>
    }
    return (
      canDelete ?  this._myActionItem() : this._standardItem()
    )
  }
}

export default ActionCardSmall;


