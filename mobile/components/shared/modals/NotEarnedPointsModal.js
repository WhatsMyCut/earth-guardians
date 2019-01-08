import React from 'react';
import { View, Text, TouchableOpacity, Modal, Image } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';

export default class PointsModal extends React.Component {
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
            {/* <Ionicons name="ios-ribbon" color="white" size={50} /> */}
            <Image
              source={require('../../../assets/ribbon.png')}
              style={{ width: 100, height: 123, margin: 20 }}
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
              YOU'VE EARNED
            </Text>
            <Text
              style={{
                color: '#fff',
                marginHorizontal: 5,
                fontSize: 18,
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              800 POINTS
            </Text>

            <Text style={{ color: '#fff', fontSize: 12, marginTop: 20 }}>
              You are now ranked #127 in your
            </Text>
            <Text style={{ color: '#fff', fontSize: 12, marginBottom: 20 }}>
              community
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.props.onClose()
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
