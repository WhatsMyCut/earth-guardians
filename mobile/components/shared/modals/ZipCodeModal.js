import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Modal,
} from 'react-native';
import { styles, defaults } from '../../../constants/Styles';
import Colors from '../../../constants/Colors';

export default class ZipCodeModal extends React.Component {

  constructor(props) {
    super(props)
    this.setState({zipcode: this.props.zip})
  }
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
              <View style={[styles.container, styles.modalView, styles.centerAll, {
                marginVertical: (defaults.primaryHeight / 2) - 200,
              }]}>
                <View style={[styles.container, styles.centerAll]}>
                  <View style={[styles.componentHeader]}>
                    <Text style={[styles.headerText]}>SET YOUR ZIPCODE TO SEE FUTURE METRICS FROM YOUR COMMUNITY!</Text>
                  </View>
                  <TextInput
                    style={[styles.textInput]}
                    onChangeText={zipcode => this.props.inputZipCode(zipcode)}
                    placeholder={ "Zipcode"}
                    placeholderTextColor={Colors.lightGray}
                    keyboardType="number-pad"
                    returnKeyType="done"
                    value={this.props.zipcode}
                  />
                  <TouchableOpacity
                    style={[styles.buttonContainer]}
                    onPress={() => this.props.updateZipCode()}
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
