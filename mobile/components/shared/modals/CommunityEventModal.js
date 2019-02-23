import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  PickerIOS,
  Modal,
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import graphql from '../../hoc/graphql';
import { CREATE_COMMUNITY_EVENT } from '../../graphql/mutations/create_community_mutation';
import { GET_USER } from '../../graphql/queries/get_user';
import { styles, defaults } from '../../../constants/Styles';

@graphql(GET_USER, {
  name: 'my_user',
})
@graphql(CREATE_COMMUNITY_EVENT, {
  name: 'community_mutation',
})
export default class CommunityEventModal extends React.Component {
  state = { typeOfEvent: '', numberOfPeople: '' };

  _submitCommunityEvent() {
    const { community_mutation } = this.props;
    const { me } = this.props.my_user;
    if (me.id) {
      let variables = {
        id: me.id,
        type: this.state.typeOfEvent,
        number_of_people: parseInt(this.state.numberOfPeople),
      };

      community_mutation({ variables }).then(response => {
        this.props.onClose();
      });
    }
  }
  render() {
    const { goBack } = this.props;
    const typesOfEvents = [
      { value: 'Rally' },
      { value: 'March' },
      { value: 'Climate Action Fundraiser' },
      { value: 'Climate Action Gathering' },
      { value: 'Concert' },
      { value: 'Educational Film Night' },
      { value: 'Climate Workshop' },
      { value: 'Clean Up' },
      { value: 'Tree Planting' },
      { value: 'Zero Waste Event' },
    ];

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.openModal}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}
        onBackDropPress={() => {
          console.log('backdroppress')
        }}
      >
        <TouchableWithoutFeedback style={[styles.container, styles.coverScreen]} onPress={() => {
          this.props.onClose()
        }}>
        <KeyboardAvoidingView
          behavior="position"
          contentContainerStyle={[styles.centerAll, {
            marginVertical: (defaults.primaryHeight / 2) - 150,
          }]}
        >
        <TouchableWithoutFeedback style={[styles.container, styles.coverScreen]} onPress={() => {
          return false
        }}>
          <View style={[styles.modalView, styles.centerAll, ]}>
            <Text style={[styles.componentHeader]}>
              HOST A COMMUNITY EVENT
            </Text>

            <Dropdown
              label="Event Type"
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
                this.setState({ typeOfEvent: arg });
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
              style={[styles.buttonContainer]}
              disabled={!this.state.numberOfPeople || !this.state.typeOfEvent}
              onPress={() => {
                this._submitCommunityEvent();
              }}
            >
              <Text style={[styles.textGrey18B]}>
                SUBMIT
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      </Modal>
    );
  }
}
