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
import Logo from '../../../constants/Logo';
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
        visible={this.props.visible}
      >
        <TouchableWithoutFeedback style={[styles.container, styles.coverScreen]} onPress={() => {
          this.props.onClose()
          }}
        >
          <View style={[styles.container]}>
            <TouchableWithoutFeedback style={[styles.container, styles.coverScreen]} onPress={() => {
                return false
              }}
            >
                <View style={[styles.modalView, {
                  marginVertical: (defaults.primaryHeight / 2 ) - 150,
                  marginHorizontal: 20 }]}
                >
                  <View style={[styles.container]}>
                    <Text style={[styles.container, styles.headerText]}>
                    HOST A COMMUNITY EVENT
                    </Text>
                  </View>
                  <Dropdown
                    label="Event Type"
                    data={typesOfEvents}
                    style={[styles.textInput]}
                    containerStyle={[styles.container, {
                      width: 200,
                    }]}
                    baseColor={'#fff'}
                    textColor={'#000000'}
                    itemColor={'#000000'}
                    onChangeText={arg => {
                      this.props.setEventType(arg);
                      this.numberOfPeople.focus();
                    }}
                  />
                  <TextInput
                    ref={input => {
                      this.numberOfPeople = input;
                    }}
                    style={[styles.textInput, { marginVertical: 10}]}
                    onChangeText={numberOfPeople => this.props.setNumPeople(numberOfPeople)}
                    value={0}
                    placeholder="Number of People"
                    placeholderTextColor="#fff"
                    keyboardType="numeric"
                    returnKeyType="done"
                  />
                  <TouchableOpacity
                    style={[styles.buttonContainer]}
                    onPress={() => {
                      this.props.submitEvent();
                    }}
                  >
                    <Text style={[styles.textGrey18B]}>
                      SUBMIT
                    </Text>
                  </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}
