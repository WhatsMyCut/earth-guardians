import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  PickerIOS
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import graphql from '../../hoc/graphql';
import { CREATE_COMMUNITY_EVENT } from '../../graphql/mutations/create_community_mutation';
import {GET_USER} from '../../graphql/queries/get_user';
import { AntDesign } from '@expo/vector-icons';

import NavigationService from '../../../navigation/navigationService';


@graphql(GET_USER, {
  name:"my_user"
})
@graphql(CREATE_COMMUNITY_EVENT, {
  name:"community_mutation"
})
export default class CommunityEventModal extends React.Component {
  state = { typeOfEvent: '', numberOfPeople: '' };



  _submitCommunityEvent(){
    const { community_mutation } = this.props;
    const { me } = this.props.my_user;
    if(me.id){
      let variables ={
        id: me.id,
        type: this.state.typeOfEvent,
        number_of_people: parseInt(this.state.numberOfPeople)
      }

      community_mutation({variables}).then(response =>{
        this.props.onClose()
      })

    }
  }
  render() {
    
    const { goBack } = this.props;
    const typesOfEvents = [
      {value:"Rally"},
      {value:"March"},
      {value:"Climate Action Fundraiser"},
      {value:"Climate Action Gathering"},
      {value:"Concert"},
      {value:"Educational Film Night"},
      {value:"Climate Workshop"},
      {value:"Clean Up"},
      {value:"Tree Planting"},
      {value:"Zero Waste Event"}
    ]

    return (
      <KeyboardAvoidingView
        // style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
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
    
            <Dropdown
              label='Event Type'
              data={typesOfEvents}
              containerStyle={{
                height: 30,
                width: 200,
                marginBottom: 40,
              }}
              baseColor={'#ffffff'}
              textColor={'#000000'}
              itemColor={'#000000'}
              onChangeText={arg => {
                this.setState({typeOfEvent:arg})
                this.numbOfPeople.focus();
              }}
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
            disabled={!this.state.numberOfPeople || !this.state.typeOfEvent}
            onPress={() => {
              this._submitCommunityEvent()
            }}
          >
            <Text style={{ color: '#333', fontSize: 18, fontWeight: 'bold' }}>
              SUBMIT
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.onClose()}
            hitSlop={{ top: 15, left: 15, right: 15, bottom: 15 }}
            style={{ position: 'absolute', right: -2, top: -5 }}
          >
            <AntDesign
              name="close"
              size={42}
              color="white"
              style={{ padding: 5 }}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
