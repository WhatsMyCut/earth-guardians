import React from 'react';
import { View, Text, TouchableOpacity, Modal, Image } from 'react-native';
import { styles } from '../../../constants/Styles';

export default class WasteModal extends React.Component {
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
      >
        <View style={[styles.modalView, { marginTop: 200, marginHorizontal: 20 }]}>
          <View style={[styles.headerContainer]}>
            <Image
              source={require('../../../assets/waste.png')}
              style={{ width: 138, height: 100, margin: 20 }}
            />
            <Text style={[styles.headerText]}>
              YOU'VE REDUCED YOUR WASTE BY {parseFloat(this.props.waste || 0 ).toFixed(2)} POUNDS!
            </Text>
          </View>
        </View>
      </Modal>
    );
  }
}
