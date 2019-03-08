import React from 'react';
import {
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
} from 'react-native';
import { LinearGradient, BlurView } from 'expo';
import { Image } from 'react-native-expo-image-cache';
import graphql from '../components/hoc/graphql';
import navigationService from '../navigation/navigationService';
import _fetchVideoUrl from '../services/fetchVideoUrl';
import LinearGradientProps from '../constants/LinearGradientProps';
import ActionCardSmall from '../components/shared/card';
import {
  WasteModal,
  WaterModal,
  CarbonModal,
  ZipCodeModal,
  ModalComponent,
} from '../components/shared/modals/';
import PrimaryImage from '../constants/PrimaryImage'
import { FontAwesome } from '@expo/vector-icons';
import { styles, defaults } from '../constants/Styles';
import { UPDATE_ZIPCODE } from '../components/graphql/mutations/update_zipcode_mutation';
@graphql(UPDATE_ZIPCODE,{
  name:"update_zipcode"
})
export default class GeneralScreen extends React.Component {
  constructor(props) {
    super(props);
    this.openZipCodeModal = this.props.openZipCodeModal.bind(this)
  }
  state = {
    video_url: null,
    picture_url: null,
    congratulationsModal: false,
    showWasteModal: false,
    showWaterModal: false,
    showCarbonModal: false,
    showZipcodeModal: false,
  };

  componentDidMount() {
    if (this.props.primary_video) {
      _fetchVideoUrl(this.props.primary_video)
      .then(data => {
        this.setState({
          picture_url: data.picture_url,
          video_url: data.video_url,
        })
      })
      .catch(e => console.error(e));
    }
  }

  componentWillUnmount() {
    this.props.primary_video = null
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

  _showTheModal =() => {
    const { item } = this.props;

      let waste = item.action ? parseFloat(item.action.waste).toFixed(2) : parseFloat(item.waste).toFixed(2);
      let water = item.action ? parseFloat(item.action.water).toFixed(2) : parseFloat(item.water).toFixed(2);
      let carbon_dioxide = item.action ? parseFloat(item.action.carbon_dioxide).toFixed(2) : parseFloat(item.carbon_dioxide).toFixed(2);
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


  onModalClose = () => {
    console.log('HERE2')
    this.setState({showWasteModal: false, showWaterModal : false, showCarbonModal: false, showZipcodeModal:false});
  }

  onActionModalClose = () => {
    this.setState({showWasteModal: false, showWaterModal : false, showCarbonModal: false, showZipcodeModal:false});
    this._takeAction();
  }

  renderPrimaryImage = () => {
    const preview = {
      uri: PrimaryImage,
    };

    return (
      <TouchableOpacity
        style={{
          shadowOffset: { width: 10, height: 10 },
          shadowColor: 'transparent',
          shadowOpacity: 1.0,
        }}
      >
        <Image
          style={styles.primaryMedia}
          source={{preview, uri: this.props.primary_image }}
        />
      </TouchableOpacity>
    );
  };

  renderPrimaryVideo = () => {
    if (!this.state.picture_url && !this.state.video_url) {
      return null;
    }
    const preview = {
      uri: PrimaryImage,
    };

    return (
      <TouchableOpacity
        onPress={() =>
          navigationService.navigate('Video', {
            screen: this.props.screen,
            video: this.state.video_url,
          })
        }
        style={[styles.container, { marginLeft: 20}]}
      >
        <View style={styles.container}>
          <Image
            style={styles.primaryMedia}
            {...{ preview, uri: this.state.picture_url }}
          />
          <LinearGradient
            locations={[0, 1.0]}
            colors={['rgba(0,0,0,0.08)', 'rgba(0,0,0,0.85)']}
            style={styles.container}
          />
        </View>
        <View style={[styles.videoPlayIcon, { position: 'absolute', top: 50 }]}>
          <FontAwesome name="play" size={52} color="white" />
          <Text style={[styles.smallWhiteText]}>Click to Play</Text>
        </View>
      </TouchableOpacity>
    );
  };
  primaryView = () => {
    if (this.props.primary_video) {
      return this.renderPrimaryVideo();
    } else if (this.props.primary_image) {
      return this.renderPrimaryImage();
    } else {
      // do nothing
      return null;
    }
  };
  render() {
    if (!this.props.data) {
      return (
        <SafeAreaView style={[styles.container]}>
          <View style={[styles.container]}>
            <Text>Nothing available!</Text>
          </View>
        </SafeAreaView>
      );
    }
    const showAModal = this.state.showWasteModal ||
      this.state.showWaterModal ||
      this.state.showCarbonModal ||
      this.state.showZipcodeModal;

    return (
      <View style={[styles.container]}>
        {showAModal &&
          <BlurView
            tint="dark"
            intensity={80}
            style={[
              styles.container,
              styles.coverScreen,
              styles.coverAll,
              {
                zIndex: 2000
              }
            ]}
          >
            {/* <ZipCodeModal updateZipcode={this.updateZipCode} onClose={this.onModalClose} visible={this.state.showZipcodeModal} />
            <WasteModal waste={this.state.waste} onClose={this.onActionModalClose} visible={this.state.showWasteModal}/>
            <WaterModal water={this.state.water} onClose={this.onActionModalClose} visible={this.state.showWaterModal}/>
            <CarbonModal carbon_dioxide={this.state.carbon_dioxide} onClose={this.onActionModalClose} visible={this.state.showCarbonModal}/> */}
          </BlurView>
        }
        <SafeAreaView style={[styles.container]}>
          <ScrollView style={[styles.container, {flexDirection: 'column'}]}>
            <View style={[styles.container]}>{this.primaryView()}</View>
            <View style={[styles.container, {
                marginLeft: 10,
                marginRight: defaults.marginHorizontal,
                marginTop: 20,
              }]}
            >
              <FlatList
                style={[styles.container]}
                numColumns={2}
                style={{
                  paddingRight: defaults.paddingRight,
                  paddingBottom: 20
                }}
                data={this.props.data[0].actions}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item, index }) => (
                  <ActionCardSmall
                    item={item}
                    index={index}
                    currScreen={this.props.screen}
                    openZipCodeModal={this.props.openZipCodeModal}
                    closeModal={this.props.onModalClose}
                  />
                )}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

