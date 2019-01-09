import React from 'react';
import {
  SafeAreaView,
  Animated,
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  StyleSheet,
  WebView,
  Platform,
  Dimensions,
  PanResponder,
  StatusBar
} from 'react-native';
import { Button } from 'react-native-paper';
import { all } from 'rsvp';
import { LinearGradient, Icon, BlurView } from 'expo';
import { Ionicons } from '@expo/vector-icons';

import { GET_USER } from '../components/graphql/queries/get_user';
import { SIGN_PETITION, UNSIGN_PETITION } from '../components/graphql/mutations/sign_petition';
import graphql from '../components/hoc/graphql';
import TabBarIcon from '../components/shared/icons/TabBarIcon';
import NavigationService from '../navigation/navigationService';
import CommunitySignedModal from '../components/shared/modals/communitySignedModal';
import RedirectModal from '../components/shared/modals/RedirectModal';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import navigationService from '../navigation/navigationService';


const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

@graphql(GET_USER, {
  name:"my_user",
  options:{
    pollInterval: 500
  }
})
@graphql(SIGN_PETITION, {
  name: 'sign_petition'
})
@graphql(UNSIGN_PETITION, {
  name: 'unsign_petition'
})
class PetitionScreen extends React.Component {
  state = { 
    in: false, 
    video_url: null,
    showRedirectModal:false, 
    showCommunitySignedModal: false,
    redirectModalPetition:null
  
  };
  
  screen = this.props.navigation.getParam('screen');
  image = this.props.navigation.getParam('image');
  petitionTitle = this.props.navigation.getParam('title');
  position = this.props.navigation.getParam('position');
  
  componentDidMount() {
    if (this.image.video_url) {
      fetch(`https://api.vimeo.com/videos/${this.image.video_url}`, {
        headers: {
          authorization: 'Bearer 5af014003bea7ca29ec721cc5a7bd34d',
        },
      })
        .then(response => response.json())
        .then(data => {
          this.setState({
            video_url: data.download[data.download.length - 2].link,
          });
        });
    }
  }

  componentWillMount(){
    this.viewResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderMove: (evt, gs) => {
        if( -200 > gs.dy){
          console.log('navigate back')
          NavigationService.navigate(this.screen,{position:this.image.Dimensions})
        }
      }
    })
  }


  togglePetition = () => {
    // TODO update Database
    const { sign_petition,my_user, unsign_petition } = this.props;
    const petitionids = my_user.me.petitions_signed.map(x => x.id);
    let variables ={
      id: my_user.me.id,
      petition_id: this.image.id
    }

    if(petitionids.indexOf(this.image.id) > -1){
      
      unsign_petition({variables}).then(response =>{
        this.setState({
          in: false,
        })
      })
    } else{
      sign_petition({variables}).then(response =>{
        this.setState({
          in: true,
          showCommunitySignedModal: true
        })
      })
    }

    

   
  };

  // _openCommunitySignedModal = () =>{
  //   this.setState({showCommunitySignedModal: true});
  // }


  _openRedirectWithUrl=(url)=>{
    this.setState({showRedirectModal:true, redirectModalPetition:url})
  }


  _modalOnClose =()=>{
    this.setState({showRedirectModal:false, redirectModalPetition: null, showCommunitySignedModal:false});
  }



  render() {
    const { my_user } = this.props;
    const { showRedirectModal,redirectModalPetition, showCommunitySignedModal } = this.state;
    let status_icon_name;
    if(my_user.loading){
      return<View
      style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
    ><Text>Loading...</Text></View>
    }

    let color = '#aaa';
    const petitionids = my_user.me.petitions_signed.map(x => x.id);
    if(petitionids){
      color = petitionids.indexOf(this.image.id) > -1 ? 'green' : '#aaa';
      status_icon_name = petitionids.indexOf(this.image.id) > -1 ? 'circle-slice-8'
      : 'circle-outline';
    }

    console.log('got this far', this.image);


    return (
        <Animated.View style={{ flex: 1 }} {...this.viewResponder.panHandlers}>
          {/* <StatusBar
            hidden={true}
            barStyle="dark-content"
          /> */}
          
          <View style={styles.container}>
            <ImageBackground
              source={{ uri: this.image.primary_image }}
              style={{ flex: 1, width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
            />
           
           <LinearGradient
        colors={['rgba(255,255,255,0)', 'rgba(0,0,0,0.5)']}
        locations={[0.3, 1]}
        style={{ position:"absolute",width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
      ></LinearGradient>
           
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
                padding: 20,
              }}
            >
            {this.image.video_url && (
         
          <TouchableOpacity style={{opacity:0.9, position:"absolute", top:0, left:SCREEN_WIDTH/2.2}} onPress={()=>{
            navigationService.navigate('Video', {
              screen: 'Petition',
              video: this.state.video_url,
              petition: this.image
            })
          }}>
              <FontAwesome name="play" size={52} color="white" />
          </TouchableOpacity>
  
      )}
           
              <Text style={{ color: 'white', fontSize: 30 }}>
                {this.image.title}
              </Text>
             <Text style={{ color: 'white', fontSize: 16 }}>
                {this.image.short_description}
              </Text> 
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Button
                  mode="contained"
                  color="#fff"
                  onPress={() => this.togglePetition()}
                >
                  <Text>I'm in!</Text>
                  <Icon.MaterialCommunityIcons
                    name={status_icon_name}
                    style={{ color: color, fontSize: 20 }}
                  />
                </Button>
{/* 
                <Icon.AntDesign
                  name="eyeo"
                  style={{
                    color: '#fff',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: 20,
                    marginHorizontal: 10,
                  }}
                /> */}
                {/* <Text style={{ color: '#fff', alignSelf: 'center' }}>
                  4K took action
                </Text> */}
              </View>
              {showRedirectModal && <BlurView
              tint="dark" 
              intensity={80}
              style={{height:SCREEN_HEIGHT, width:SCREEN_WIDTH, position:"absolute"}}
              >
                  <RedirectModal onClose={this._modalOnClose} external_url={redirectModalPetition ? redirectModalPetition : null} />
              </BlurView>
            
              }
              { showCommunitySignedModal && <BlurView
                  tint="dark" 
                  intensity={80}
                  style={{height:SCREEN_HEIGHT, width:SCREEN_WIDTH, position:"absolute"}}
                  >
               <CommunitySignedModal onClose={this._modalOnClose}/>
               </BlurView>
              }

          {this.image.external_url ? (<TouchableOpacity
                onPress={() =>{
                  this._openRedirectWithUrl(this.image.external_url); 
                }}
                style={{
                  color: '#fff',
                  alignSelf: 'center',
                  paddingBottom: 10,
                }}
              >
                <TabBarIcon
                  name={
                    Platform.OS === 'ios' ? `ios-arrow-down` : 'md-arrow-down'
                  }
                />
    </TouchableOpacity> ): null
              }
            </View>
          </View>
        </Animated.View>
    );
  }
}

const styles = {
  topBar:{
    position:"absolute",
    top:8,
    left:15
  },
  container: {
    flex: 1,
  },
  topBackNav: {
    flex: 1,
    justifyContent: 'flex-start',
    maxHeight: 30,
    paddingHorizontal: 5,
  },
};

export default PetitionScreen;
