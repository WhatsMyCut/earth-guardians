import React from 'react';
import {
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Text,
  ScrollView,
  View,
} from 'react-native';
import HeaderNavBar from '../components/shared/navBar/HeaderNavBar';
import ModalComponent from '../components/shared/modals/ModalComponent';
import ActionCardSmall from '../components/shared/card';
import { actions_data } from './dummy/data';
import { styles, defaults } from '../constants/Styles';
import graphql from '../components/hoc/graphql';
import { MY_ACTIONS_QUERY } from '../components/graphql/queries/my_actions_query';
import { UPDATE_ZIPCODE } from '../components/graphql/mutations/update_zipcode_mutation';
@graphql(UPDATE_ZIPCODE,{
  name: 'update_zipcode',
})

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
    zipcode: true,
  };

  componentDidMount() {
    const actions = actions_data();
    this.setState({ actions: actions });
  }

  updateZipCode = zipcode => {
    const { user, update_zipcode} = this.props;
    if(zipcode.length === 5){
      let variables={
        id:user.me.id,
        zipcode:zipcode
      }
      update_zipcode({variables}).then(()=>{
          this.onModalClose();
      })
    }
  }

  _renderActions(){
    const { all_actions } = this.props;
    const available = all_actions.myAvailableActions

    if(available.length == 0){
      return (
        <View style={[styles.container, { margin: 20}]}>
          <Text style={[styles.textWhite18B]}>We Got This! Start Taking Action Now!</Text>
        </View>
      )
    }

    const actions = available.map(event =>{
      //console.log('event', event);
      return { id: event.id, action:event.action, createdAt:event.createdAt}
    });
    const len = actions.length
    return (
      <ScrollView
        style={[
          styles.container,
          styles.coverScreen,
          styles.coverAll,
        ]}>
        <FlatList
          style={[
            styles.container,
            {
              paddingLeft: 10,
              paddingRight: defaults.paddingHorizontal,
              marginBottom: 28 * (len / 2),
            }
          ]}
          numColumns={2}
          data={actions}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item, index }) => {
            return (
              <ActionCardSmall
                item={item}
                index={index}
                canDelete={true}
              />
            )
          }}
        />
      </ScrollView>
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
