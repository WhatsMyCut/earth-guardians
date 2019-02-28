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
import { Analytics, PageHit } from 'expo-analytics';
import { ALL_ACTION_CATEGORIES } from '../components/graphql/queries/all_action_categories_query';
import graphql from '../components/hoc/graphql';
import NavigationService from '../navigation/navigationService';
import WorldRankComponent from '../components/shared/profile/WorldRankComponent';
import { WW_RANKINGS } from '../components/graphql/queries/ww_rankings_query';
import client from '../Apollo';
import { StoreData } from '../store/AsyncStore';
import { styles } from '../constants/Styles'
import googleAnalytics from '../services/googleAnalytics'

@graphql(WW_RANKINGS, {
  name: 'rankings',
})
class WorldRankStackScreen extends React.Component {
  state = {
    openModal: false,
  };

  //interval;
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
    googleAnalytics('WorldRankScreen');
    () => {
      console.log('countries', this.props.rankings)
      try {
        const analytics = new Analytics('UA-131896215-1');
        analytics
          .hit(new PageHit('WorldRankScreen'))
          .then(() => console.log('success '))
          .catch(e => console.log(e.message));
      } catch (e) {
        console.log(e);
      }
    };
  }

  componentWillUnmount() {
  }

  componentWillReceiveProps() {
  }

  render() {
    if (this.props.rankings.loading) {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={ styles.containerGrey }>
            <ActivityIndicator size={'large'} />
          </View>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={[styles.greyCard]}>
        <ScrollView contentContainerStyle={{}}>
          <View style={[styles.containerGrey]}>
            <Text style={ styles.containerTitle }>Worldwide Rank</Text>
            <WorldRankComponent rankings={this.props.rankings.getCountryStats}/>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
WorldRankStackScreen.navigationOptions = {
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
    <View style={ styles.headerContainer}>
      <Text style={ styles.headerText }>
        MY RANK
      </Text>
    </View>
  ),
  headerRight: (''),
  headerStyle: styles.greyCardHeader,
};

export default WorldRankStackScreen;
