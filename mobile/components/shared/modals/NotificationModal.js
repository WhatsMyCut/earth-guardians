import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal } from 'react-native';
import { styles, defaults } from '../../../constants/Styles';
import Logo from '../../../constants/Logo'
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
                flexJustify: 'flex-start',
              }]}>
                <View style={[styles.container, styles.centerAll, {flexDirection: 'row'}]}>
                  <View style={{maxHeight: 72, maxWidth: 72, marginRight: 20}}>
                    <Logo style={{width: 72, height: 72}} />
                  </View>
                  <Text style={[styles.headerText]}>
                    NOTIFICATION!
                  </Text>
                </View>
                <View style={[styles.container, { flexDirection: 'column'}]}>
                  <Text style={[styles.textWhiteBold]}>
                    {this.props.notification.data.message}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}
