import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { styles } from '../../../constants/Styles';
export default class GameCompleteModal extends React.Component {
  state = { modalVisible: true };
  toggleModalVisible = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {

        }}
      >
        <View
          style={[styles.modalView, {
            paddingTop: 200,
            paddingHorizontal: 20
          }]}
        >
          <View style={[styles.headerContainer]}>
            <Text style={[styles.headerText]}>
              Thank You!
            </Text>
            <Text style={[styles.textWhite18B]}>
               Check 'My Actions' to keep track of the action you committed to.
            </Text>
          </View>
        </View>
      </Modal>
    );
  }
}
