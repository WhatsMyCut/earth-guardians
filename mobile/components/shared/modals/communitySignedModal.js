import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  Image } from 'react-native';
import { styles, defaults } from '../../../constants/Styles';
export default class CommunitySignedModal extends React.Component {
  state = { modalVisible: true };
  toggleModalVisible = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.visible}
        onDismiss={this.props.onClose}
        onRequestClose={() => {
          this.props.onClose()
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
              <Text style={[styles.componentHeader]}>
                YOU'VE JOINED THIS COMMUNITY EVENT!
              </Text>
              <Text style={[styles.textWhite]}>
                You should go back and checkout some of our other community events!
              </Text>
            </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}
