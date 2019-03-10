import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { styles } from '../../../constants/Styles';
import { WebBrowser } from 'expo';
import NavigationService from '../../../navigation/navigationService';
export default class NotificationModal extends React.Component {
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
        <View style={[styles.modalView]}>
          <View style={[styles.headerContainer]}>
            <Text style={[styles.textWhite18B]}>
              Notification!
            </Text>
            <Text style={[styles.textWhite]}>
              {this.props.notification.data.message}
            </Text>
          </View>
        </View>
      </Modal>
    );
  }
}
