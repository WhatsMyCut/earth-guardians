import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { WebBrowser } from 'expo';
import NavigationService from '../../../navigation/navigationService';
export default class RedirectModal extends React.Component {
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
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{
              backgroundColor: '#333',
              justifyContent: 'center',
              alignItems: 'center',

              borderRadius: 20,
              padding: 30,
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
              YOU HAVE CHOSEN TO COMMIT TO THIS!
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
               Visit our page to take the next step
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#fff',
                width: 130,
                height: 50,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 40,
              }}
              onPress={() => {
                WebBrowser.openBrowserAsync(this.props.external_url.trim());
                this.props.onClose();
              }}
            >
              <Text style={{ color: '#333', fontSize: 18, fontWeight: 'bold' }}>
                REDIRECT
              </Text>
            </TouchableOpacity>
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
