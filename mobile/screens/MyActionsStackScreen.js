import React from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text, View } from 'react-native';
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



class MyActionsStackScreen extends React.Component {
  state = {
    primary_photo: '',
    primary_video: '',
    actions: [],
  };


  componentDidMount() {
    //const actions = data[0].actions;
    const actions = actions_data();

    this.setState({ actions: actions });
  }

  _loading =() =>{
    console.log('loading is firing');
    return <View style={{ flex: 1, backgroundColor:'#333' }}>
            <AppLoading
        />
        </View>
  }

  _renderActions(id){
    console.log('this is loading')
    return <Query query={MY_ACTIONS_QUERY} variables={{id}} pollInterval={500}>
                {({ loading,error, data }) => {
                if (loading) return this._loading();
                if (error) {
                  console.log('error', error);
                  return this._loading();
                }

                const actions = data.eventActions.map(event =>{
                  return { id: event.id, action:event.action}
                });

                console.log('data from my_action_data', data)
                      return (
                        <View style={styles.container}>
                        <FlatList
                          style={{ backgroundColor: '#333' }}
                          numColumns={2}
                          data={actions}
                          renderItem={({ item, index }) => (
                            <ActionCardSmall item={item} index={index} canDelete={true} user_id={id}/>
                          )}
                        />
                      </View>
                      );
            }}
          </Query>
  }

  render() {
   
    // if(my_actions.me.recent_actions.length == 0){
    //   console.log('my actions finished loading', my_actions.me);
    //   return <SafeAreaView style={{ flex: 1 }}>
    //   <View style={{...styles.container, justifyContent:'center', alignContent:'center'}}>
    //     <Text style={{color:"white", textAlign:"center"}}>You should start taking action!</Text>
    //   </View>
    // </SafeAreaView>
    // }

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Query query={GET_USER}>
        {({ loading, error, data }) => {
          if (loading) return this._loading();
          if (error) {
            console.log('error', error);
            return this._loading();
          }
          if(!data.me){
            NavigationService.navigate('AuthLoading')
          }

          if(!data.me.id){
      
              NavigationService.navigate('AuthLoading')

          }
          console.log('data from me.user', data.me);
          return this._renderActions(data.me.id);
        }}
      </Query>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    paddingTop: 15,
  },
});

MyActionsStackScreen.navigationOptions = {
  headerTitle: HeaderNavBar,
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

export default MyActionsStackScreen;
