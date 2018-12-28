import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import NavigationService from '../../../navigation/navigationService';

export default class CommunityEventModal extends React.Component {
  state = { typeOfEvent: '', numberOfPeople: '' };
  
  render() {
    console.log('Community Event Modal', this.props);
    const { goBack } = this.props;
    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        behavior="padding"
        enabled
      >
        <View
          style={{
            backgroundColor: '#333',
            justifyContent: 'center',
            alignItems: 'center',

            borderRadius: 20,
            padding: 30,
            paddingHorizontal: 60,
          }}
        >
          <Text
            style={{
              color: '#fff',
              marginHorizontal: 20,
              fontSize: 18,
              fontWeight: 'bold',
            }}
          >
            HAVE YOU HOSTED A COMMUNITY EVENT?
          </Text>
          <TextInput
            style={{
              color: '#fff',
              height: 30,
              width: 200,
              marginTop: 30,
              marginBottom: 20,
              borderColor: 'gray',
              borderBottomWidth: 1,
            }}
            onChangeText={typeOfEvent => this.setState({ typeOfEvent })}
            value={this.state.typeOfEvent}
            placeholder="Type of Event"
            placeholderTextColor="#fff"
            returnKeyType="next"
            onSubmitEditing={() => {
              this.numbOfPeople.focus();
            }}
            blurOnSubmit={false}
          />
          <TextInput
            ref={input => {
              this.numbOfPeople = input;
            }}
            style={{
              color: '#fff',
              height: 30,
              width: 200,
              marginBottom: 30,
              borderColor: 'gray',
              borderBottomWidth: 1,
            }}
            onChangeText={numberOfPeople => this.setState({ numberOfPeople })}
            value={this.state.numberOfPeople}
            placeholder="Number of People"
            placeholderTextColor="#fff"
            keyboardType="numeric"
            returnKeyType="done"
          />
          <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              width: 130,
              height: 50,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}
            onPress={() =>{
              console.log(
                'The type of event was' +
                  this.state.typeOfEvent +
                  ' and the number of people was ' +
                  this.state.numberOfPeople
              )
              NavigationService.navigate(this.props.previousScreen || 'MyActions');
            }}
          >
            <Text style={{ color: '#333', fontSize: 18, fontWeight: 'bold' }}>
              SUBMIT
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
