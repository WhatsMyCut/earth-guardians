import React from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo';

import HeaderNavBar from '../components/shared/navBar/HeaderNavBar';
import Layout from '../constants/Layout';
import Styles from '../constants/Styles';
import LinearGradientProps from '../constants/LinearGradientProps';

export default class CommunityStackScreen extends React.Component {
  render() {
    console.log(this.props.data);
    const image_url = this.props.data.length
      ? this.props.data[0].image
      : 'none';
    const text_str = this.props.data.length
      ? this.props.data[0].text.substring(0, 50)
      : null;
    return (
      <LinearGradient
        {...LinearGradientProps.lightGrayToDarkGraycolors}
        style={styles.linearGradient}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <ScrollView style={{ flex: 1 }}>
              <View style={styles.headlineView}>
                <Image
                  source={require('../assets/bg.png')}
                  style={{
                    width: Layout.window.width - Styles.margin,
                    height: 200,
                  }}
                />
              </View>

              <View style={styles.bodyView}>
                <TouchableOpacity style={{ flex: 1 }}>
                  <View style={styles.item}>
                    <Image
                      source={{ uri: image_url }}
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
                      {text_str}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
            <FlatList
              style={{ flex: 1 }}
              numColumns={2}
              data={this.props.data}
              renderItem={({ item, index }) => (
                <TouchableOpacity style={{ flex: 1 }}>
                  <View style={styles.item}>
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
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  container: { flex: 1, margin: Styles.margin },
  headlineView: {
    height: 200,

    borderWidth: Styles.borderWidth,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,

    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: Styles.borderRadius + 20,
  },
  bodyView: {},
  item: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginTop: 10,
    minHeight: 200,
    maxHeight: 230,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: Styles.borderRadius,
  },
});
