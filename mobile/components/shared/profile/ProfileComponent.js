import React from 'react';
import { View, Text, TextInput, Image, StyleSheet, Dimensions, TouchableHighlight } from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;
export default class Profileomponent extends React.Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
      <View style={styles.container}>
        <Image source={require('../../../assets/Group_427.png')} style={styles.profileImage} />
        <View style={{ width: SCREEN_WIDTH * 0.9 }}>
          <View style={styles.info}>
            <View style={styles.labelWrapper}>
              <TextInput style={styles.label} value="Name"/>
            </View>
            <View style={styles.labelWrapper}>
              <Text style={styles.label}>80302</Text>
            </View>
            {/* <View style={styles.labelWrapper}>
              <Text style={styles.label}>Last Name</Text>
            </View> */}
          </View>
          <View style={styles.info}>
            
            <View style={styles.labelWrapper}>
              <Text style={styles.label}>Crew</Text>
            </View>
            <View style={styles.labelWrapper}>
              <Text style={styles.label}>Email</Text>
            </View>
          </View>
          <View style={styles.info}>
            <View style={styles.labelWrapper}>
              <TextInput style={styles.label} value="Cell Number"/>
            </View>
            
          </View>
        </View>
      </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.9
  },
  profileImage: {
    width: 40,
    height: 40,
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
