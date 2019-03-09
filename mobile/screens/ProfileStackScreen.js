import React from 'react';
//import { LinearGradient, AppLoading } from 'expo';

import {
  Animated,
  PanResponder,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo';
import { Analytics, PageHit } from 'expo-analytics';
import { ALL_ACTION_CATEGORIES } from '../components/graphql/queries/all_action_categories_query';
import graphql from '../components/hoc/graphql';
import NavigationService from '../navigation/navigationService';
import ProfileComponent from '../components/shared/profile/ProfileComponent';
import UpdateUserComponent from '../components/shared/profile/UpdateUserComponent';
import CommunityEventModal from '../components/shared/modals/CommunityEventModal';
import { GET_USER } from '../components/graphql/queries/get_user';
import client from '../Apollo';
import { StoreData } from '../store/AsyncStore';
import { _pickImage } from '../services/uploadS3Image';
import { styles, defaults } from '../constants/Styles'

@graphql(GET_USER, {
  name: 'user',
})
class ProfileStackScreen extends React.Component {
  state = {
    openModal: false,
  };

  interval;
  static navigationOptions = {
    header: null,
  };

  toggleModal = () => {
    this.setState({
      openModal: !this.state.openModal,
    });
  };

  componentWillMount() {
  }

  componentDidMount() {
    () => {
      try {
        const analytics = new Analytics('UA-131896215-1');
        analytics
          .hit(new PageHit('ProfileScreen'))
          .then(() => console.log('success '))
          .catch(e => console.log(e.message));
      } catch (e) {
        console.log(e);
      }
    };
    this.interval = setInterval(() => {
      this.props.user.refetch();
    }, 2000)
  }

  componentWillUnmount = ()=>{
    clearInterval(this.interval);
  }

  async updatePic() {
    const image = _pickImage
    console.log('updatePic', image)
    // .then(res => {
    //   console.log('_pickImage', res)
    //   update_user({variables:{profile_pic: res.url}})
    //   this.setState(
    //     { user:
    //       { me:
    //         {
    //           profile_pic: res.url
    //         }
    //       }
    //     }
    //   )
    // })
    // .catch(e => console.log(e))
  }

  async _aggregateProfile() {
    const { loading } = this.state;
    if (!loading) {
      return;
    }

    this.setState({
      loading: false,
      user: this.props.user
    });
  }

  render() {
    //console.log('this.props', this.props);
    if (this.props.user.loading) {
      return (
        <SafeAreaView style={[styles.container]}>
          <View style={[ styles.modalView ]}>
            <ActivityIndicator size={'large'} />
          </View>
        </SafeAreaView>
      );
    } else {
      this._aggregateProfile()
      console.log('this.props.user', this.props.user)
    }

    return (
      <SafeAreaView style={[styles.greyCard]}>
        <View style={[styles.container, styles.centerText, { padding: 20, }]}>
          <ProfileComponent
            user={this.props.user}
            updatePic={this.updatePic}
          />
        </View>

        {this.state.openModal ? (
          <BlurView
            tint="dark"
            intensity={80}
            style={[styles.container, styles.coverScreen, {
              height: defaults.primaryHeight - 150,

            }]}
          >
            <CommunityEventModal
              onClose={() => {
                this.setState({ openModal: false, loading: true });
              }}
            />
          </BlurView>
        ) : null}
      </SafeAreaView>
    );
  }
}
ProfileStackScreen.navigationOptions = {
  headerLeft: (
    <TouchableOpacity onPress={() => NavigationService.navigate('Impact')}>
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
        MY PROFILE
      </Text>
    </View>
  ),
  headerStyle: styles.greyCardHeader,
};

export default ProfileStackScreen;
