import React from 'react';
import { View, Text, TouchableWithoutFeedback, Modal } from 'react-native';
import { styles, defaults } from '../../../constants/Styles';
import Logo from '../../../constants/Logo';
export default class GameCompleteModal extends React.Component {
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.visible}
      >
        <TouchableWithoutFeedback style={[styles.container, styles.coverScreen]} onPress={() => {
          this.props.onClose()
        }}>
          <View style={[styles.container]}>
            <TouchableWithoutFeedback style={[styles.container, styles.coverScreen]} onPress={() => {
                return false
              }}>
              <View style={[styles.modalView, {
                marginVertical: (defaults.primaryHeight / 2) - 150,
                marginHorizontal: 20 }]}>
                <Logo style={[styles.container, { width: 72, height: 72 }]} />
                <View style={[styles.headerContainer]}>
                  <Text style={[styles.headerText]}>
                    Thank You!
                  </Text>
                </View>
                <Text style={[styles.textWhite18B]}>
                  Check 'My Actions' to keep track of the action you committed to.
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}
