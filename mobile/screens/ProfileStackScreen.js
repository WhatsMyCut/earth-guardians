import React from 'react';
//import { LinearGradient, AppLoading } from 'expo';

import {
  TouchableOpacity,
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import graphql from '../components/hoc/graphql';
import NavigationService from '../navigation/navigationService';
import ProfileComponent from '../components/shared/profile/ProfileComponent';
import PubSub from 'pubsub-js'
import ModalComponent from '../components/shared/modals/ModalComponent';
import { GET_USER } from '../components/graphql/queries/get_user';
import { UPDATE_USER } from '../components/graphql/mutations/update_user_mutation';
import { _pickImage } from '../services/uploadS3Image';
import { styles, defaults } from '../constants/Styles'

@graphql(UPDATE_USER, {
  name: 'update_user',
})
@graphql(GET_USER, {
  name: 'my_user',
  fetchPolicy: 'network_only',
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
    const { my_user } = this.props
    if (!my_user.loading) {
      PubSub.publish('setUser', { my_user: my_user })
    }
  }

  componentDidMount() {
  }

  componentWillUnmount = ()=>{
    this.props.my_user = null;
  }

  updateMyUser = (state) => {
    const { password, confirmPassword } = this.state;
    const { my_user, update_user } = this.props;
    
    let variables = {
      id: my_user.me.id,
      phone: state.phone ? state.phone : my_user.me.username,
      username: state.phone ? state.phone : my_user.me.username,
      name: state.name ? state.name : my_user.me.name,
      zipcode: state.zipcode ? state.zipcode : my_user.me.zipcode,
      crew: state.crew ? state.crew : my_user.me.crew,
      email: state.email ? state.email : my_user.me.email,
      photo: state.photo ? state.photo : my_user.me.photo || null,
      token: state.token ? state.token : my_user.me.token || null,
      crew_type: state.crew_type
        ? state.crew_type
        : my_user.me.crew_type,
    };
    console.log('update user variables', variables);

    update_user({ variables }).then(res => {
      console.log('response', res);
      my_user.refetch();
      PubSub.publish('closeModal');
      this.closeAll();
    }).catch(err => {
      console.error('error', err);
    })
  };

  openUpdateUserModal = (data) => {
    PubSub.publish('openBlur')
    this.setState({ showUpdateProfileModal: true });
  }

  closeAll = () => {
    PubSub.publish('closeBlur')
    this.setState({
      showUpdateProfileModal: false,
    })
  };

  async updatePic() {
    const { update_user, my_user } = this.props;
    try {
    _pickImage()
    .then(res =>
      {
      console.log('_pickImage', res)
      update_user({variables:{id: my_user.me.id, photo: res.body.postResponse.location}}).then(res =>{
        my_user.refetch();
      })
    })
    .catch(e => console.log(e))
  }catch (err){
    console.error('Error from pick image ', err);
  }
  }

  render() {
    const { my_user } = this.props
    // console.log('this.props', my_user);
    if (my_user.loading) {
      return (
        <SafeAreaView style={[styles.container]}>
          <View style={[ styles.modalView ]}>
            <ActivityIndicator size={'large'} />
          </View>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={[styles.greyCard]}>
        <View style={[styles.container, styles.centerText, { paddingHorizontal: 20, }]}>
          <ProfileComponent
            my_user={my_user}
            updatePic={() => this.updatePic()}
            openModal={this.openUpdateUserModal}
          />
          {this.state.showUpdateProfileModal &&
            <ModalComponent
              display={'UpdateUserModal'}
              showModal={this.state.showUpdateProfileModal}
              onClose={() => this.closeAll()}
              updateUser={this.updateMyUser}
              user={my_user}
            />
          }
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
