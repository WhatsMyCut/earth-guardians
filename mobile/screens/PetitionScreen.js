import React from 'react';
import {
  Animated,
  PanResponder,
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  Platform,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon, MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { AntDesign } from '@expo/vector-icons';
import { _eventHit } from '../services/googleAnalytics';

import { GET_USER } from '../components/graphql/queries/get_user';
import {
  SIGN_PETITION,
  UNSIGN_PETITION,
} from '../components/graphql/mutations/sign_petition';
import graphql from '../components/hoc/graphql';
import NavigationService from '../navigation/navigationService';
import CommunitySignedModal from '../components/shared/modals/CommunitySignedModal';
import RedirectModal from '../components/shared/modals/RedirectModal';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { RetrieveData } from '../store/AsyncStore';
import _fetchVideoUrl from '../services/fetchVideoUrl'
import { styles, defaults } from '../constants/Styles'

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

@graphql(GET_USER, {
  name: 'my_user',
  options: {
    pollInterval: 500,
  },
})
@graphql(SIGN_PETITION, {
  name: 'sign_petition',
})
@graphql(UNSIGN_PETITION, {
  name: 'unsign_petition',
})
class PetitionScreen extends React.Component {
  state = {
    in: false,
    video_url: null,
    showRedirectModal: false,
    showCommunitySignedModal: false,
    redirectModalPetition:null,
    youinverbiage: "I'm In!"
  };

  screen = this.props.navigation.getParam('screen');
  image = this.props.navigation.getParam('image');
  petitionTitle = this.props.navigation.getParam('title');
  position = this.props.navigation.getParam('position');

  componentDidMount() {
    const { my_user } = this.props;
    if (this.image.video_url) {
      _fetchVideoUrl(this.image.video_url)
      .then(data => {
        this.setState({
          video_url: data.video_url,
        });
      })
      .catch(e => e);
    }

    const petitionids = my_user.me.petitions_signed.map(x => x.id);
    if(petitionids){
      if(petitionids.indexOf(this.image.id) > -1 ){
        this.setState({
          youinverbiage:"You're In!"
        })
      }
    }



  }

  componentWillMount() {
    this.viewResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderMove: (evt, gs) => {
        if (150 < gs.dy) {
          console.log('navigate back');
          NavigationService.navigate(this.screen, {
            position: this.image.Dimensions,
          });
        }
      },
    });
  }

  togglePetition = () => {
    // TODO update Database
    const { sign_petition, my_user, unsign_petition } = this.props;
    const petitionids = my_user.me.petitions_signed.map(x => x.id);
    let variables = {
      id: my_user.me.id,
      petition_id: this.image.id,
    };

    if (petitionids.indexOf(this.image.id) > -1) {
      unsign_petition({ variables }).then(response => {
        this.setState(
          {
            in: false,
            youinverbiage:"I'm In!"
          },
          async () => {
            const phone = await RetrieveData('phone');
            _eventHit('UnSignPetition', {action: 'Press', phone: phone, id: this.image.id}, res => console.log(res.event, res.params.id))
          }
        );
      });
    } else {
      if(this.image.external_url){
        this.setState({showRedirectModal: true});
      }


      sign_petition({ variables }).then(response => {
        this.setState(
          {
            in: true,
            showCommunitySignedModal: this.image.external_url? false: true,
            youinverbiage:"You're In!"
          },
          async () => {
            const phone = await RetrieveData('phone');
            _eventHit('SignPetition', {action: 'Press', phone: phone, id: this.image.id}, res => console.log(res.event, res.params.id))
          }
        );
      });
    }
  };

  // _openCommunitySignedModal = () =>{
  //   this.setState({showCommunitySignedModal: true});
  // }

  _openRedirectWithUrl = url => {
    this.setState(
      { showRedirectModal: true, redirectModalPetition: url },
      async () => {
        const phone = await RetrieveData('phone');
        _eventHit('OpenRedirectModal', {action: 'Press', phone: phone, id: this.image.id}, res => console.log(res.event, res.params))
      }
    );
  };

  _modalOnClose = () => {
    this.setState({
      showRedirectModal: false,
      redirectModalPetition: null,
      showCommunitySignedModal: false,
    });
  };

  render() {
    const { my_user } = this.props;

    const { showRedirectModal,youinverbiage, redirectModalPetition, showCommunitySignedModal } = this.state;
    let status_icon_name;
    if (my_user.loading) {
      return (
        <View style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}>
          <Text>Loading...</Text>
        </View>
      );
    }
    let color = '#aaa';
    const petitionids = my_user.me.petitions_signed ? my_user.me.petitions_signed.map(x => x.id) : null;
    if (petitionids) {
      color = petitionids.indexOf(this.image.id) > -1 ? 'green' : color;
      status_icon_name = petitionids.indexOf(this.image.id) > -1
        ? 'circle-slice-8'
        : 'circle-outline';
    }

    //console.log('got this far', this.image);

    return (
      <Animated.View style={[styles.container]} {...this.viewResponder.panHandlers}>

        <View style={[styles.container]}>
          <ImageBackground
            source={{ uri: this.image.primary_image }}
            style={[styles.container, styles.coverScreen]}
          />
          <View style={[styles.container, styles.centeredRow, { position: 'absolute', top: 50, flexDirection: 'column' }]}>
            <MaterialCommunityIcons
              name={'gesture-swipe-down'}
              style={[styles.centerText, styles.textWhite, { fontSize: 30 }]}
            />
            <Text style={[styles.textWhite]}>(Swipe down to dismiss)</Text>
          </View>

          <LinearGradient
            colors={['rgba(0,0,0,0.08)', 'rgba(0,0,0,0.85)']}
            locations={[0.4, 1]}
            style={[styles.container, styles.coverAll]}
          />
          <View
            style={[styles.container, styles.coverScreen, {
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
              padding: 20,
              paddingBottom: 60,
            }]}
          >
            {this.image.video_url && (
              <TouchableOpacity
                style={[styles.centerAll, {
                  opacity: 0.9,
                  position: 'absolute',
                  width:100,
                  top: (defaults.primaryHeight - 100) / 2,
                  left: (defaults.width - 60) / 2,
                }]}
                onPress={() => {
                  NavigationService.navigate('Video', {
                    screen: 'Petition',
                    video: this.state.video_url,
                    petition: this.image,
                  });
                }}
                hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
              >
                <FontAwesome name="play" size={52} color="white" />
                <Text style={[styles.smallWhiteText, styles.smallTextShadow, {paddingTop: 10}]}>Play Video</Text>
              </TouchableOpacity>
            )}

            <View style={[styles.container, styles.petitionDetails, { bottom: 100 } ]}>
              <Text style={styles.title}>
                {this.image.title}
              </Text>
              <Text style={[styles.petitionText]}>
                {this.image.short_description}
              </Text>
              <View style={[styles.container]}>
                <View style={[styles.detailRow, { marginLeft: 0 }]}>
                  <TouchableOpacity
                    onPress={() => this.togglePetition()}
                    style={[styles.buttonContainer]}
                  >
                    <View style={[styles.centeredRow]}>
                      <Text styles={[styles.detailCell, styles.centerText, { paddingHorizontal: defaults.paddingHorizontal}]}>{youinverbiage}</Text>
                      <MaterialCommunityIcons
                        name={status_icon_name}
                        style={[{ textAlign: 'right', color: color, fontSize: 22 }]}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          {this.image.body.length>0 &&
            <View style={[styles.container, styles.centeredRow, {position:'absolute', bottom:0}]}>
              <TouchableOpacity
                style={[styles.container, styles.centeredRow, {
                  paddingBottom: 35,
                  flexDirection: 'column'
                }]}
                onPress={()=>{
                  console.log('this is working')
                  NavigationService.navigate('PetitionText', {image:this.image, title:this.image.title, body:this.image.body})
                }}
              >
                <Text style={[styles.smallWhiteText, styles.centerText]}>READ MORE</Text>
                <AntDesign
                  name="down"
                  style={{
                    color: '#fff',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: 20,
                    marginHorizontal: 10,
                  }}
                />
              </TouchableOpacity>
            </View>
          }
          </View>
          {showCommunitySignedModal && (
            <BlurView
            tint="dark"
            intensity={80}
            style={[styles.container, styles.coverScreen,
              {
                height: defaults.primaryHeight,
              }]}
            >
              <CommunitySignedModal onClose={this._modalOnClose} />
            </BlurView>
          )}
          {showRedirectModal && (
            <BlurView
              tint="dark"
              intensity={80}
              style={{
                height: SCREEN_HEIGHT,
                width: SCREEN_WIDTH,
                position: 'absolute',
              }}
            >
              <RedirectModal
                onClose={this._modalOnClose}
                external_url={
                  this.image.external_url ? this.image.external_url : null
                }
              />
            </BlurView>
          )}
      </Animated.View>
    );
  }
}

export default PetitionScreen;
