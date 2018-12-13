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

import {ALL_PERSONS_QUERY} from '../components/graphql/queries/all_persons_query'
import graphql from '../components/hoc/graphql';
import { all } from 'rsvp';


@graphql(ALL_PERSONS_QUERY, {
  name:"all_persons",
  fetchPolicy: 'network-only'
})
class MyActionsStackScreen extends React.Component {
  static navigationOptions = {
    //header: null,
    title: 'Actions',
    header:null
  };
  state = {
    photos: [],
    actions: [],
  };

  constructor(props){
    super(props);
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
    const { all_persons } = this.props;
    if(!all_persons.loading){
      console.log('all persons', all_persons.allPersons[0].name);
    }
    if(all_persons.loading){
      return <SafeAreaView style={{flex:1}}><Text>Loading ...</Text></SafeAreaView>
    }
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <FlatList
            style={{ backgroundColor: '#D3D3D3' }}
            numColumns={2}
            data={this.state.actions}
            renderItem={({ item, index }) => (
              <TouchableOpacity style={{ flex: 1 }}>
                <View style={styles.item}>
                  <Image
                    source={{ uri: item.action.image }}
                    style={{
                      flex: 1,
                      width: null,
                      height: null,
                      borderRadius: Styles.borderRadius,
                    }}
                  />
                  <Text
                    style={{
                      position: 'absolute',
                      bottom: 10,
                      left: 10,
                      fontWeight: 'bold',
                      color: '#fff',
                      fontSize: 18,
                    }}
                  >
                    {item.action.text.substring(0, 50)}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    margin: 5,
    marginTop: 10,
    minHeight: 200,
    maxHeight: 230,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: Styles.borderRadius,
  },
});


export default MyActionsStackScreen;