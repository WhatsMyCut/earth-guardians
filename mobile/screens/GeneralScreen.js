import React from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

import HeaderNavBar from '../components/shared/navBar/HeaderNavBar';
import Layout from '../constants/Layout';
import Styles from '../constants/Styles';

export default class CommunityStackScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <HeaderNavBar />,
    headerStyle: { backgroundColor: '#333' },
  };

  state = { photos: [], actions: [] };

  componentDidMount() {
    // these methods are just for the dummy data
    const actions = [];
    this.props.data.forEach(item => {
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
          <View style={styles.headlineView}>
            <Image
              source={require('../assets/bg.png')}
              style={{ width: Layout.window.width, height: 200 }}
            />
          </View>

          <FlatList
            style={{}}
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
  container: { flex: 1, backgroundColor: '#333' },
  headlineView: {
    height: 200,

    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,

    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: Styles.borderRadius,
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
