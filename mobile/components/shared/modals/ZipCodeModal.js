import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Modal,
} from 'react-native';
import { BlurView } from 'expo';
import { styles, defaults } from '../../../constants/Styles';

export default class ZipCodeModal extends React.Component {
  state = { zipcode: true };
  toggleModalVisible = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}
      >
        <TouchableWithoutFeedback style={[styles.container, styles.coverScreen]} onPress={() => {
          this.props.onClose()
        }}>
          <View style={[styles.container]}>
            <TouchableWithoutFeedback style={[styles.container, styles.coverScreen]} onPress={() => {
              return false
            }}>
              <View style={[styles.modalView, styles.centerAll, {
                marginVertical: (defaults.primaryHeight / 2) - 80,
              }]}>
                <View style={[styles.container, styles.centerAll]}>
                  <View style={[styles.componentHeader]}>
                    <Text style={[styles.headerText]}>SET YOUR ZIPCODE TO SEE FUTURE METRICS FROM YOUR COMMUNITY!</Text>
                  </View>
                  <TextInput
                    style={[styles.cardHeaderText]}
                    onChangeText={password => this.setState({ zipcode:password })}
                    placeholder="Zipcode"
                    placeholderTextColor="#fff"
                    keyboardType="default"
                    returnKeyType="done"
                    // value={this.state.zipCode}
                  />

                  <TouchableOpacity
                    style={[styles.buttonContainer]}
                    onPress={() => {
                      this.props.updateZipcode(this.state.zipcode);
                    }}
                  >
                    <Text style={[styles.textGrey18B]}>
                      ADD ZIPCODE
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}
