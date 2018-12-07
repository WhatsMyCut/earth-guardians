import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

export default class PhoneInputComp extends React.Component {
  state = {
    valid: false,
    selectedCountry: 'US',
    countryCode: '1',
    number: '',
    counries: [{ code: 1, name: 'US' }, { code: 260, name: 'ZM' }],
  };

  updateInfo = () => {};
  render() {
    return (
      <View style={styles.container}>
        <Dropdown
          data={this.state.counries}
          valueExtractor={({ name }) => name}
          labelExtractor={({ label }) => label}
          containerStyle={styles.countryCode}
          value={this.state.counries[0].name + ' +1'}
          rippleCentered={true}
        />
        <TextInput
          style={styles.number}
          placeholder={'Phone number'}
          onChangeText={number => this.setState({ number })}
          value={this.state.number}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderColor: 'red',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countryCode: {
    width: 80,
  },
  number: { color: 'red', height: 30, borderColor: 'red', borderWidth: 1 },
});
