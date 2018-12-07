import React from 'react';
import { StyleSheet, View, Text, TextInput, Picker } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

export default class Test extends React.Component {
  state = {
    valid: false,
    countryCode: '',
    number: '',
  };

  updateInfo = () => {
    // this.setState({
    //   valid: this.phone.isValidNumber(),
    //   type: this.phone.getNumberType(),
    //   value: this.phone.getValue(),
    // });
  };

  // renderInfo() {
  //   if (this.state.value) {
  //     return (
  //       <View style={styles.info}>
  //         <Text>
  //           Is Valid:{' '}
  //           <Text style={{ fontWeight: 'bold' }}>
  //             {this.state.valid.toString()}
  //           </Text>
  //         </Text>
  //         <Text>
  //           Type: <Text style={{ fontWeight: 'bold' }}>{this.state.type}</Text>
  //         </Text>
  //         <Text>
  //           Value:{' '}
  //           <Text style={{ fontWeight: 'bold' }}>{this.state.value}</Text>
  //         </Text>
  //       </View>
  //     );
  //   }
  // }

  render() {
    const countries = [{ code: 1, name: 'US' }, { code: 260, name: 'ZM' }];
    //const countries = [{ name: 'US' }, { name: 'ZM' }];
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',

          borderColor: 'red',
          borderBottomWidth: 1,
        }}
      >
        <Dropdown
          data={
            countries //label="Country Code"
          }
          valueExtractor={({ name }) => name}
          labelExtractor={({ label }) => label}
          dropdownOffset={{ top: 32, left: 0 }}
          containerStyle={
            { borderWidth: 0, borderRadius: 50, width: 80, paddingLeft: 10 } //paddingTop: 0, //borderColor: 'lightgrey', //height: 40,
          }
          value={
            countries[0].name + ' +1' //rippleCentered={true}
          }
        />

        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 0 }}
          placeholder={'Phone number'}
          onChangeText={text => this.setState({ number })}
          value={this.state.number}
        />
      </View>
    );
  }
}
