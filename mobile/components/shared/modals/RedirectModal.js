import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

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
          Alert.alert('Modal has been closed.');
        }}
        style={{
          backgroundColor: '#333',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            marginTop: 200,
            marginHorizontal: 20,
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
              EARTH GUARDIANS WILL REDIRECT YOU TO WWW.CHOOSE.TODAY
            </Text>

            <TouchableOpacity
              style={{
                backgroundColor: '#fff',
                width: 130,
                height: 50,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}
              onPress={() => console.log('button pressed')}
            >
              <Text style={{ color: '#333', fontSize: 18, fontWeight: 'bold' }}>
                REDIRECT
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.toggleModalVisible();
              }}
              hitSlop={{ top: 15, left: 15, right: 15, bottom: 15 }}
              style={{ position: 'absolute', right: -2, top: -5 }}
            >
              <AntDesign
                name="close"
                size={42}
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
