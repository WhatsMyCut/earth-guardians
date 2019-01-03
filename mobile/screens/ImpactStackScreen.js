import React from 'react';
//import { LinearGradient, AppLoading } from 'expo';

import { TouchableOpacity, SafeAreaView, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ALL_ACTION_CATEGORIES } from '../components/graphql/queries/all_action_categories_query';
import graphql from '../components/hoc/graphql';
import NavigationService from '../navigation/navigationService';
import GraphComponent from '../components/shared/profile/GraphComponent';
import ImpactComponent from '../components/shared/profile/ImpactComponent';
import ReachComponent from '../components/shared/profile/ReachComponent';
import PointsComponent from '../components/shared/profile/PointsComponent';
import ProfileComponent from '../components/shared/profile/ProfileComponent';
import CommunityEventModal from '../components/shared/modals/CommunityEventModal';

//import LinearGradientProps from '../constants/LinearGradientProps';

//import { data } from './dummy/actions.json';

@graphql(ALL_ACTION_CATEGORIES, {
  name: 'all_categories',
  options: {
    fetchPolicy: 'network-only',
    variables: {
      name: 'Impact',
    },
  },
})
class ImpactStackScreen extends React.Component {
  state = {
    openModal: false,
  };
  static navigationOptions = {
    header: null,
  };

  toggleModal = () => {
    this.setState({
      openModal: !this.state.openModal,
    });
  };
  render() {
    // const { all_categories } = this.props;
    // if (all_categories.loading) {
    //   return (
    //     <LinearGradient {...LinearGradientProps.food} style={{ flex: 1 }}>
    //       <AppLoading />
    //     </LinearGradient>
    //   );
    // }

    // const actions = all_categories.actionCategories;
    // if (!this.state.primary_video && !this.state.primary_image) {
    //   return null;
    // }

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#333',
          }}
        >
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 5,
              maxHeight: 30,
            }}
          >
            <TouchableOpacity
              onPress={() => NavigationService.navigate('MyActions')}
            >
              <Ionicons name="ios-arrow-round-back" size={42} color="#ccc" />
            </TouchableOpacity>
          </View>

          <GraphComponent />
          <ImpactComponent />
          <ReachComponent toggleModal={this.toggleModal} />
          <PointsComponent />
          <ProfileComponent />
        </View>
        {this.state.openModal ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,.1)',
              position: 'absolute',
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <CommunityEventModal />
          </View>
        ) : null}
      </SafeAreaView>
    );
  }
}
ImpactStackScreen.navigationOptions = {
  headerTitle: (
    <Text
      style={{
        color: '#ffffff',
        fontSize: 28,
        fontFamily: 'Proxima Nova Bold',
      }}
    >
      MY IMPACT
    </Text>
  ),
  headerStyle: {
    backgroundColor: '#333',
    borderBottomWidth: 0,
    shadowColor: 'transparent',
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
  },
};

export default ImpactStackScreen;
