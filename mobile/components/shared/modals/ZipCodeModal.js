import React from 'react';
import { View, Text, TouchableOpacity,TextInput, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { WebBrowser } from 'expo';
import NavigationService from '../../../navigation/navigationService';
export default class ZipCodeModal extends React.Component {
  state = { zipcode: true };
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
              SET YOUR ZIPCODE TO SEE FUTURE METRICS FROM YOUR COMMUNITY!
            </Text>

            <TextInput
      style={{
        color: '#fff',
        height: 30,
        width: 200,
        textAlign: 'left',
        marginVertical: 20,
        borderColor: 'gray',
        borderBottomWidth: 1,
      }}
      onChangeText={password => this.setState({ zipcode:password })}
      placeholder="Zipcode"
      placeholderTextColor="#fff"
      keyboardType="default"
      returnKeyType="done"
      // value={this.state.zipCode}
    />

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
              onPress={() => {
                this.props.updateZipcode(this.state.zipcode);
              }}
            >
              <Text style={{ color: '#333', fontSize: 18, fontWeight: 'bold' }}>
                ADD ZIPCODE
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
