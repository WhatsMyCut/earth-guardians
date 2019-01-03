import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { countries } from './country_codes.json'; // data from local file

export default class PhoneInputComp extends React.Component {
  state = {
    country_and_dial_code: 'US +1',
    country_code: 'US',
    dial_code: '+1',
    phone_number: '',
    countries: [
      {
        country_name: 'Micronesia, Federated States of',
        dial_code: '+691',
        country_code: 'FM',
      },
    ],
  };

  // load the country codes
  componentDidMount() {
    this.setState({ countries });
  }
  handlePhoneInputChange = phone_number => {
    this.setState({ phone_number });
  };
  handleSelectedCode = (dial_code, index, data) => {
    this.setState({
      country_and_dial_code: `${data[index].country_code} ${dial_code}`,
      dial_code: dial_code,
      country_code: data[index].country_code,
    });
  };
  updateStoreWithPhoneDetails = async () => {
    try {
      // TODO: only do this if phone is valide, properly
      // TODO: use the app state valid
      if (this.state.phone_number.length === 10) {
        // create a phone object
        const new_phone = {
          number: this.state.phone_number,
          country_dial_code: this.state.dial_code,
        };
        await this.props.validate_phone(true);
        await this.props.updatePhone(new_phone);
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={[styles.container, { paddingBottom: 30 }]}
        enabled
      >
        <View style={styles.container}>
          <Dropdown
            dropdownOffset={{ top: 0, bottom: 0, left: 1 }}
            data={this.state.countries}
            valueExtractor={({ dial_code }) => dial_code}
            labelExtractor={({ country_code }, index) => {
              const display = `${country_code} ${
                this.state.countries[index].dial_code
              }`;
              //TODO : if dial_code is undefined, skip it
              return display;
            }}
            containerStyle={styles.countryCode}
            value={this.state.country_and_dial_code}
            inputContainerStyle={styles.countryCodeInput}
            textColor="#fff"
            baseColor="#fff"
            selectedItemColor="rgba(0, 0, 0, .87)"
            fontSize={12}
            onChangeText={this.handleSelectedCode}
          />
          <TextInput
            placeholder="(999) 999-9999"
            style={styles.number}
            keyboardType="number-pad"
            name="phone_number"
            type="number"
            returnKeyType="done"
            onChangeText={this.handlePhoneInputChange}
            onBlur={this.updateStoreWithPhoneDetails}
            value={this.state.phone_number}
            maxLength={14} // allows for brackets and spaces if needed in the future
            placeholderTextColor="#fff"
          />
        </View>
      </KeyboardAvoidingView>
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
  countryCodeInput: {
    borderBottomWidth: 0,
    borderBottomColor: 'transparent',
    marginBottom: 0,
    paddingBottom: 0,
  },
  number: {
    borderWidth: 0,
    width: '100%',
    paddingBottom: 15,
    color: '#fff',
  },
});
