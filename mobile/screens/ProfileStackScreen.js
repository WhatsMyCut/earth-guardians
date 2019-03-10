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
import PubSub from 'pubsub-js'
import UpdateUserComponent from '../components/shared/profile/UpdateUserComponent';
import CommunityEventModal from '../components/shared/modals/CommunityEventModal';
import { GET_USER } from '../components/graphql/queries/get_user';
import { UPDATE_USER } from '../components/graphql/mutations/update_user_mutation';
import client from '../Apollo';
import { StoreData } from '../store/AsyncStore';
import { _pickImage } from '../services/uploadS3Image';
import { styles, defaults } from '../constants/Styles'


@graphql(UPDATE_USER, {
  name: 'update_user_mutation',
})
@graphql(GET_USER, {
  name: 'user',
  options: {
    pollingInterval: 2000
  }
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
  }

  componentWillUnmount = ()=>{
    this.props.user = null;
  }

  updateUser = () => {
    const { password, confirmPassword } = this.state;
    const { user } = this.props;
    let variables = {
      id: user.me.id,
      phone: this.state.phone ? this.state.phone : user.me.username,
      username: this.state.phone ? this.state.phone : user.me.username,
      name: this.state.name ? this.state.name : user.me.name,
      zipcode: this.state.zipcode ? this.state.zipcode : user.me.zipcode,
      crew: this.state.crew ? this.state.crew : user.me.crew,
      email: this.state.email ? this.state.email : user.me.email,
      crew_type: this.state.crew_type
        ? this.state.crew_type
        : user.me.crew_type,
    };
    update_user_mutation({ variables }).then(res => {
      this.props.onClose();
    });
  };


  updateProfile() {
    const { user } = this.state.props;
    console.log('updateProfile', user)
    PubSub.publish('showUpdateProfileModal', user);
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

  render() {
    const { user } = this.props
    console.log('this.props', this.props);
    if (user.loading) {
      return (
        <SafeAreaView style={[styles.container]}>
          <View style={[ styles.modalView ]}>
            <ActivityIndicator size={'large'} />
          </View>
        </SafeAreaView>
      );
    } else {
      // this._aggregateProfile()
      console.log('this.props.user', user)
      //this.setState({ user: user})
    }

    return (
      <SafeAreaView style={[styles.greyCard]}>
        <View style={[styles.container, styles.centerText, { padding: 20, }]}>
          <ProfileComponent
            user={user}
            updatePic={this.updatePic}
            updateProfile={this.updateProfile}
          />
        </View>
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
