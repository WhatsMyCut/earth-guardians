import React from 'react';
import { SafeAreaView, FlatList, ActivityIndicator, Text, View } from 'react-native';
import { LinearGradient, AppLoading } from 'expo';
import { all } from 'rsvp';

import { MY_ACTIONS_QUERY } from '../components/graphql/queries/my_actions_query';
import HeaderNavBar from '../components/shared/navBar/HeaderNavBar';
import graphql from '../components/hoc/graphql';
import ActionCardSmall from '../components/shared/card';
import LinearGradientProps from '../constants/LinearGradientProps';
import { GET_USER } from '../components/graphql/queries/get_user';
import { Query } from 'react-apollo';
//import { data } from './dummy/actions.json';
import { actions_data } from './dummy/data';
import NavigationService from '../navigation/navigationService';
import { styles, defaults } from '../constants/Styles';

@graphql(MY_ACTIONS_QUERY,{
  name: 'all_actions',
  options: {
    pollInterval: 1000
  }
})
class MyActionsStackScreen extends React.Component {
  state = {
    primary_photo: '',
    primary_video: '',
    actions: [],
  };

  componentDidMount() {
    const actions = actions_data();
    this.setState({ actions: actions });
  }

  _renderActions(){
    const available = this.props.all_actions.myAvailableActions

    if(available.length == 0){
      return (
        <View style={[styles.container, styles.headerContainer]}>
          <Text style={[styles.textWhite18B]}>We Got This! Start Taking Action Now!</Text>
        </View>
      )
    }

    const actions = available.map(event =>{
      return { id: event.id, action:event.action, createdAt:event.createdAt}
    });

    return (
      <View style={[styles.container]}>
        <FlatList
          style={[styles.container, styles.coverScreen, styles.coverAll]}
          numColumns={2}
          data={actions}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item, index }) => {
            return (
              <ActionCardSmall item={item} index={index} canDelete={true}/>
            )
          }}
        />
      </View>
    );
  }

  render() {
    if(this.props.all_actions.loading){
      return (
        <View style={[styles.greyCard]}>
          <ActivityIndicator size="large"/>
        </View>
      )
    }

    return (
      <SafeAreaView style={[styles.greyCard]}>
        {this._renderActions()}
      </SafeAreaView>
    );
  }
}

MyActionsStackScreen.navigationOptions = {
  headerTitle: HeaderNavBar,
  headerStyle: styles.greyCardHeader,
};

export default MyActionsStackScreen;
