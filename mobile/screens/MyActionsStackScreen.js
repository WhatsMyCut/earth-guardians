import React from 'react';
import {
  SafeAreaView,
  ImageBackground,
  Image,
  Platform,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Styles from '../constants/Styles';

import { data } from './actions.json';

import { ALL_ACTION_CATEGORIES } from '../components/graphql/queries/all_action_categories_query';
import { all } from 'rsvp';
import HeaderNavBar from '../components/shared/navBar/HeaderNavBar';
import graphql from '../components/hoc/graphql';
import ActionCardSmall from '../components/shared/card';


const Header = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ color: 'red', height: 30 }}>Hello World</Text>
    </View>
  );
};


@graphql(ALL_ACTION_CATEGORIES, {
  name: 'all_categories',
  fetchPolicy: 'network-only',
})
class MyActionsStackScreen extends React.Component {
  
  state = {
    photos: [],
    actions: [],
  };

  constructor(props) {
    super(props);
    console.log('props inside of stack', props.navigationOptions);
  }

  componentDidMount() {
    // these methods are just for the dummy data
    const actions = [];
    data.forEach(item => {
      // make random keys and push them as objects
      item.actions.forEach(action => {
        const key = Math.random() * Math.random() * 10000000000;
        actions.push({ key, action });
      });
    });
    this.setState({ actions: actions });
  }
  render() {
    const { all_categories } = this.props;
    if (!all_categories.loading) {
      console.log('all persons', all_categories.actionCategories[0].name);
    }
    if (all_categories.loading) {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <Text>Loading ...</Text>
        </SafeAreaView>
      );
    }
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <FlatList
            style={{ backgroundColor: '#333' }}
            numColumns={2}
            data={this.state.actions}
            renderItem={({ item, index }) => <ActionCardSmall item={item} index={index}/>}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#333',
    paddingTop:15
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
    
  }




export default MyActionsStackScreen;
