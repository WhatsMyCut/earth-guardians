import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export default class CommunityEventModal extends React.Component {
  state = { typeOfEvent: '', numberOfPeople: '' };
  render() {
    return (
      <View
        style={{
          backgroundColor: '#333',
          justifyContent: 'center',
          alignItems: 'center',
          width: '90%',
          borderRadius: 20,
          padding: 30,
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
            marginVertical: 30,
            borderColor: 'gray',
            borderBottomWidth: 1,
          }}
          onChangeText={typeOfEvent => this.setState({ typeOfEvent })}
          value={this.state.typeOfEvent}
          placeholder="Type of Event"
          placeholderTextColor="#fff"
        />
        <TextInput
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
          onPress={() =>
            console.log(
              'The type of event was' +
                this.state.typeOfEvent +
                ' and the number of people was ' +
                this.state.numberOfPeople
            )
          }
        >
          <Text style={{ color: '#333', fontSize: 18, fontWeight: 'bold' }}>
            SUBMIT
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
