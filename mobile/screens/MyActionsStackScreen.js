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
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-material-cards';

import { data } from './actions.json';
export default class MyActionsStackScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    photos: [],
    actions: [],
  };

  componentDidMount() {
    const actions = [];
    data.forEach(item => actions.push(...item.actions));
    this.setState({ actions: actions });
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <FlatList
            numColumns={2}
            data={this.state.actions}
            renderItem={({ item, index }) => (
              <View style={styles.item}>
                <Image
                  source={{ uri: 'https://picsum.photos/200/300/?random' }}
                  style={{
                    flex: 1,
                    width: null,
                    height: null,
                    borderRadius: 10,
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
                  {item.substring(0, 50)}
                </Text>
              </View>
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
    paddingTop: 10,
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
    borderRadius: 10,
  },
});
