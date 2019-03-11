import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Modal,
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { styles, defaults } from '../../../constants/Styles';

export default class CommunityEventModal extends React.Component {
  state = { typeOfEvent: '', numberOfPeople: '' };

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
      >
        <TouchableWithoutFeedback style={[styles.container, styles.coverScreen]} onPress={() => {
          this.props.onClose()
        }}>
          <KeyboardAvoidingView
            behavior="position"
            contentContainerStyle={[styles.centerAll, styles.coverAll]}
          >
            <TouchableWithoutFeedback style={[styles.container, styles.coverScreen]} onPress={() => {
              return false
            }}>
              <View style={[styles.container, styles.modalView, styles.centerAll, {
                height: 350,
                marginVertical: (defaults.primaryHeight / 2),
              }]}>
                <View style={[styles.headerContainer]}>
                  <Text style={[styles.headerText]}>
                  HOST A COMMUNITY EVENT
                  </Text>
                </View>
                <View style={[styles.container]}>

                  <Dropdown
                    label="Event Type"
                    data={typesOfEvents}
                    style={[styles.textInput]}
                    containerStyle={{
                      height: 30,
                      width: 200,
                      marginBottom: 40,
                    }}
                    baseColor={'#fff'}
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
                    style={[styles.textInput]}
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
                      this.props.submitEvent(this.state);
                    }}
                  >
                    <Text style={[styles.textGrey18B]}>
                      SUBMIT
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}
