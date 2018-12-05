import React from 'react';
import { StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { View, Text } from 'react-native-ui-lib';
import { LinearGradient } from 'expo';

export default class PhoneSignup extends React.Component {
  render() {
    return (
      <LinearGradient
        colors={['#ffffff', '#000000']}
        locations={[0.7, 1]}
        style={styles.linearGradient}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View flex bottom>
            <Text text40 white>
              Take Action
            </Text>
            <Text text80 white>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet
              veritatis porro sapiente blanditiis, illum possimus iure?
              Aspernatur deserunt ex cum rerum officiis eos nemo minima qui
              nesciunt vero, pariatur odio?
            </Text>
            <TextInput white text30 placeholder={'xxx-xxx-xxxx'} />
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linearGradient: {
    flex: 1,
  },
  heading: {
    color: 'red',
  },
});
