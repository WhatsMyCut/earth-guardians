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
export default class MyActionsStackScreen extends React.Component {
  static navigationOptions = {
    //header: null,
    title: 'Actions',
  };
  state = {
    photos: [],
    actions: [],
  };

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
                    source={{ uri: 'https://picsum.photos/200/300/?random' }}
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
                    {item.action.substring(0, 50)}
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
