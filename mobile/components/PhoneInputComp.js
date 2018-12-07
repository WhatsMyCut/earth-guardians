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

  updateInfo = v => {
    console.log(v);
  };
  handleSelectedCode = (a, b, c) => {
    console.log(a);
    console.log(b);
    console.log(c);
  };
  render() {
    return (
      <View style={styles.container}>
        <Dropdown
          dropdownOffset={{ top: 0, bottom: 0, left: 1 }}
          data={this.state.counries}
          valueExtractor={({ name }) => name}
          labelExtractor={({ label }) => label}
          containerStyle={styles.countryCode}
          value={this.state.counries[0].name + ' +1'}
          inputContainerStyle={{
            borderBottomWidth: 0,
            borderBottomColor: 'transparent',
            marginBottom: 0,
            paddingBottom: 0,
          }}
          onChangeText={value => this.handleSelectedCode(item.name, value)}
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
    borderColor: 'gray',
    borderWidth: 0,

    borderBottomWidth: 1,
    alignItems: 'flex-end',
    width: '100%',
  },
  countryCode: {
    width: 80,
    borderWidth: 0,
  },
  number: {
    color: 'red',
    height: 50,
    borderWidth: 0,
  },
});
