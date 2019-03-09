import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
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
        style={{
          backgroundColor: '#333',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            paddingTop: 200,
            paddingHorizontal: 20
          }}
        >
          <View
            style={{
              backgroundColor: '#333',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
              padding: 60,
            }}
          >
            <Text
              style={{
                color: '#fff',
                marginHorizontal: 20,
                fontSize: 18,
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              Notification!
            </Text>
            <Text
            style={{
              color: '#fff',
              marginHorizontal: 20,
              fontSize: 14,
              textAlign: 'center',
              marginTop:10
            }}
            >
              {this.props.notification.data.message}
            </Text>

            <TouchableOpacity
              onPress={() => {
                this.props.onClose();
              }}
              hitSlop={{ top: 15, left: 15, right: 15, bottom: 15 }}
              style={{ position: 'absolute', right: -2, top: -5 }}
            >
              <AntDesign
                name="close"
                size={32}
                color="white"
                style={{ padding: 5 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
