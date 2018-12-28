import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;
export default class Profileomponent extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../../assets/user_w.png')}
          style={styles.profileImage}
        />
        <View style={{ width: SCREEN_WIDTH * 0.9 }}>
          <View style={styles.info}>
            <View style={styles.labelWrapper}>
              <Text style={styles.label}>First Name</Text>
            </View>
            <View style={styles.labelWrapper}>
              <Text style={styles.label}>Last Name</Text>
            </View>
          </View>
          <View style={styles.info}>
            <View style={styles.labelWrapper}>
              <Text style={styles.label}>80302</Text>
            </View>
            <View style={styles.labelWrapper}>
              <Text style={styles.label}>Crew</Text>
            </View>
          </View>
          <View style={styles.info}>
            <View style={styles.labelWrapper}>
              <Text style={styles.label}>Cell Number</Text>
            </View>
            <View style={styles.labelWrapper}>
              <Text style={styles.label}>Email</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.9,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderColor: '#666',
    borderWidth: 1,
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#666',
    marginVertical: 10,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  labelWrapper: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    paddingBottom: 1,
    marginRight: 20,
  },
  label: { color: '#fff' },
});
