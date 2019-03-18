import React from 'react';
import { View, Text, TouchableOpacity, Modal, Image } from 'react-native';
import { styles } from '../../../constants/Styles';

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
      >
        <View style={[styles.modalView, { marginTop: 200, marginHorizontal: 20 }]}>
          <View style={[styles.headerContainer]}>
            <Image
              source={require('../../../assets/popcorn_bucket.png')}
              style={{ width: 103, height: 100, margin: 20 }}
            />
            <Text style={[styles.headerText]}>
              YOU EARNED 100 POINTS FOR WATCHING THIS VIDEO
            </Text>
            <Text style={[styles.textWhite, { marginVertical: 20 }]}>
              Join Jackson, take action!
            </Text>
          </View>
        </View>
      </Modal>
    );
  }
}
