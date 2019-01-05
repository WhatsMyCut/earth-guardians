import React from 'react';
import { View, Text, TouchableOpacity, Modal, Image } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

export default class NotWatchVideoModal extends React.Component {
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
        <View style={{ marginTop: 200, marginHorizontal: 20 }}>
          <View
            style={{
              backgroundColor: '#333',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
              padding: 30,
            }}
          >
            {/* <MaterialCommunityIcons name="popcorn" color="white" size={50} /> */}
            <Image
              source={require('../../../assets/popcorn_bucket.png')}
              style={{ width: 103, height: 100, margin: 20 }}
            />
            <Text
              style={{
                color: '#fff',
                marginHorizontal: 5,
                fontSize: 18,
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              YOU EARNED 100 POINTS FOR WATCHING THIS vIDEO
            </Text>

            <Text style={{ color: '#fff', fontSize: 12, marginVertical: 20 }}>
              Join Jackson, take action!
            </Text>
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
