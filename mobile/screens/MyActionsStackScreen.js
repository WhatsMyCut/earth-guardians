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
import { styles } from '../constants/Styles';



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
    return <View style={{ flex: 1, backgroundColor:'#333' }}>
            <AppLoading
        />
        </View>
  }

  _renderActions(){

    return <Query query={MY_ACTIONS_QUERY} pollInterval={1000}>
                {({ loading,error, data }) => {
                if (loading) return this._loading();
                if (error) {
                  return this._loading();
                }
                if(data.myAvailableActions.length == 0){
                  return <SafeAreaView style={{ flex: 1 }}>
                    <View style={[styles.container, styles.centerAll]}>
                      <Text style={{color:"white", textAlign:"center"}}>We Got This! Start Taking Action Now!</Text>
                    </View>
                  </SafeAreaView>
                }



                const actions = data.myAvailableActions.map(event =>{
                  return { id: event.id, action:event.action, createdAt:event.createdAt}
                });

                return (
                  <View style={styles.container}>
                    <FlatList
                      style={{ backgroundColor: '#333', paddingRight:10 }}
                      numColumns={2}
                      data={actions}
                      keyExtractor={(item, index) => item.id}
                      renderItem={({ item, index }) => {
                      return (
                          <ActionCardSmall item={item} index={index} canDelete={true}/>
                        )}
                      }
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
        {this._renderActions()}
      </SafeAreaView>
    );
  }
}


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
