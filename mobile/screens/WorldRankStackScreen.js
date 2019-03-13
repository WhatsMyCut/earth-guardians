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
import { Ionicons,  } from '@expo/vector-icons';
import graphql from '../components/hoc/graphql';
import NavigationService from '../navigation/navigationService';
import WorldRankComponent from '../components/shared/profile/WorldRankComponent';
import { WW_RANKINGS } from '../components/graphql/queries/ww_rankings_query';
import { styles } from '../constants/Styles'

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

  componentDidMount() {
  }

  componentWillUnmount() {
    this.props.rankings = null;
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
