import React from 'react';
import {
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
} from 'react-native';
import { LinearGradient, } from 'expo';
import { Image } from 'react-native-expo-image-cache';
import navigationService from '../navigation/navigationService';
import _fetchVideoUrl from '../services/fetchVideoUrl';
import ActionCardSmall from '../components/shared/card';
import ModalComponent from '../components/shared/modals/ModalComponent';
import PrimaryImage from '../constants/PrimaryImage'
import { FontAwesome } from '@expo/vector-icons';
import { styles, defaults } from '../constants/Styles';
import graphql from '../components/hoc/graphql';
import { GET_USER } from '../components/graphql/queries/get_user';
import { UPDATE_ZIPCODE } from '../components/graphql/mutations/update_zipcode_mutation';
@graphql(UPDATE_ZIPCODE,{
  name: 'update_zipcode',
})
@graphql(GET_USER, {
  name: 'user',
})
export default class GeneralScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    video_url: null,
    picture_url: null,
    congratulationsModal: false,
    showWasteModal: false,
    showWaterModal: false,
    showCarbonModal: false,
    showZipCodeModal: false,
    zipcode: true
  };

  componentDidMount() {
    const {primary_video} = this.props;
    if (primary_video) {
      _fetchVideoUrl(primary_video)
      .then(data => {
        this.setState({
          picture_url: data.picture_url,
          video_url: data.video_url,
        })
      })
      .catch(e => console.error(e));
    }
    PubSub.subscribe('showZipCodeModal', (msg, data) => this.openZipCodeModal(msg, data));
  }

  componentWillUnmount() {
    this.props.primary_video = null
  }

  openZipCodeModal = (msg, data) => {
    PubSub.publish('openBlur')
    this.setState({ zipcode: data, showZipCodeModal: true})
  }

  closeZipCodeModal = () => {
    PubSub.publish('closeBlur')
    this.setState({ zipcode: null, showZipCodeModal: false})
  }


  inputZipCode = zipcode => {
    this.setState({zipcode})
  }

  updateZipCode = () => {
    const { user, update_zipcode} = this.props;
    const { zipcode } = this.state;
    let variables = {
      id:user.me.id,
      zipcode: zipcode
    }
    update_zipcode({variables}).then(()=>{
        this.closeZipCodeModal();
    })

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
    const { picture_url, video_url } = this.state;
    if (!picture_url && !video_url) {
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
            video: video_url,
          })
        }
        style={[styles.container, { marginLeft: 20 }]}
      >
        <View style={styles.container}>
          <Image
            style={styles.primaryMedia}
            {...{ preview, uri: picture_url }}
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
    const { data, screen } = this.props;
    const { showZipCodeModal, zipcode } =  this.state;
    if (!data) {
      return (
        <SafeAreaView style={[styles.container]}>
          <View style={[styles.container]}>
            <Text>Nothing available!</Text>
          </View>
        </SafeAreaView>
      );
    }

    return (
      <View style={[styles.container]}>
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
              data={data[0].actions}
              keyExtractor={(item, index) => item.id}
              renderItem={({ item, index }) => (
                <ActionCardSmall
                  item={item}
                  index={index}
                  currScreen={screen}
                />
              )}
            />
          </View>
        </ScrollView>
        {showZipCodeModal &&
          <ModalComponent
            display={'ZipCodeModal'}
            visible={showZipCodeModal}
            onClose={() => this.closeZipCodeModal()}
            zipcode={zipcode}
            updateZipCode={this.updateZipCode}
            inputZipCode={this.inputZipCode}
          />
        }
      </View>
    );
  }
}

