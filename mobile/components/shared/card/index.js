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
import { LinearGradient, Icon } from 'expo';

import Styles from '../../../constants/Styles';
// import graphql from '../components/hoc/graphql';

export default class ActionCardSmall extends React.Component {
  state = {
    delete: false,
  };
  delete = () => {
    //TODO
    console.log('delete');
  };

  showDelete = () => {
    if (this.state.delete) {
      return (
        <Icon.Entypo
          onPress={() => this.delete()}
          name="circle-with-cross"
          size={32}
          color="red"
          style={{ position: 'absolute', right: 2 }}
        />
      );
    }
  };
  render() {
    const { item, index } = this.props;
    return (
      <TouchableOpacity
        style={{ flex: 1, height: index % 2 ? 230 : 250 }}
        onLongPress={() => this.setState({ delete: !this.state.delete })}
      >
        <View style={styles.item}>
          <LinearGradient
            colors={['#ffffff', '#000000']}
            locations={[0.6, 1]}
            style={{ flex: 1, borderRadius: Styles.borderRadius }}
          >
            <Image
              source={{ uri: item.image }}
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
              {item.text.substring(0, 50)}
            </Text>

            {this.showDelete()}
          </LinearGradient>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    alignContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    paddingHorizontal: 10,
    elevation: 1,
    marginTop: 10,

    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: Styles.borderRadius,
  },
});
