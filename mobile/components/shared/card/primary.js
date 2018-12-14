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
import { LinearGradient } from 'expo';
import Styles from '../../../constants/Styles';
// import graphql from '../components/hoc/graphql';

export default class ActionCardSmall extends React.Component {
  render() {
    const { item, index } = this.props;
    return (
      <TouchableOpacity style={{ flex: 1, height: index % 2 ? 230 : 250 }}>
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
