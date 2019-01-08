import React from 'react';
import { View, Text, TouchableOpacity, Modal, Image } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';

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
            {/* <Entypo name="water" color="white" size={50} /> */}
           
            <Text
              style={{
                color: '#fff',
                marginHorizontal: 5,
                fontSize: 18,
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              YOU'VE JOINED THIS COMMUNITY EVENT!
            </Text>
            <Text
              style={{
                color: '#fff',
                marginHorizontal: 5,
                paddingTop:15,
                fontSize: 14,
                textAlign: 'center',
              }}
            >
              You should go back and checkout some of our other community events!
            </Text>
{/* 
            <Text
              style={{
                color: '#fff',
                fontSize: 12,
                paddingTop: 10,
                textAlign: 'center',
              }}
            >
              You've offset the equivalent of
            </Text>
            <Text
              style={{
                color: '#fff',
                fontSize: 12,
                paddingBottom: 10,
                textAlign: 'center',
              }}
            >
              taking 50 ten minutes shower
            </Text> */}
            <TouchableOpacity
              onPress={() => {
                this.props.onClose()
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
