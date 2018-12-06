import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

export default class Test extends React.Component {
  state = {
    valid: false,
    countryCode: '',
    value: '',
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
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TextInput placeholder={'Phone number'} />
      </View>
    );
  }
}
