import React from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  View,
  Text,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Analytics, PageHit } from 'expo-analytics';
import NavigationService from '../navigation/navigationService';
import { styles } from '../constants/Styles';

class SocialStackScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  _shareApp = async () => {
    const result = await Share.share(
      {
        message:
        'I love #EarthTracks by #EarthGuardians. It shows me the actions that I take make a difference. Check it out in the App Store. Are you in?',
        url: 'https://www.earthguardians.org/',
        title: 'Share EarthTracks App!',
      },
      {
        // Android only:
        dialogTitle: 'Share EarthTracks App',
      }
    );
  };
  componentDidMount() {
    // Analytics
    () => {
      try {
        const analytics = new Analytics('UA-131896215-1');
        analytics
          .hit(new PageHit('SocialScreen'))
          .then(() => console.log('success '))
          .catch(e => console.log(e.message));
      } catch (e) {
        console.log(e);
      }
    };
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={[styles.greyCard, styles.centerAll]}>
          <TouchableOpacity
            onPress={() => this._shareApp()}
            style={ styles.social }
          >
            <Text style={styles.socialItem}>Share your Metrics!</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}


SocialStackScreen.navigationOptions = {
  headerLeft: (
    <TouchableOpacity onPress={() => NavigationService.navigate('MyActions')}>
      <Ionicons
        name="ios-arrow-round-back"
        size={42}
        color="white"
        style={{ paddingLeft: 15, opacity: 0.7 }}
      />
    </TouchableOpacity>
  ),
  headerTitle: (
    <View style={ styles.headerContainer }>
      <Text style={ styles.headerText }>
        SHARE YOUR IMPACT
      </Text>
    </View>
  ),
  headerStyle: styles.greyCardHeader,
};

export default SocialStackScreen;
