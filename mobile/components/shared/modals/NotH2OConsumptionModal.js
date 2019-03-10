import React from 'react';
import { View, Text, TouchableOpacity, Modal, Image } from 'react-native';
import { styles } from '../../../constants/Styles';

export default class WaterModal extends React.Component {
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
        style={{
          backgroundColor: '#333',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={[styles.modalView, { marginTop: 200, marginHorizontal: 20 }]}>
          <View style={[styles.headerContainer]}>
            {/* <Entypo name="water" color="white" size={50} /> */}
            <Image
              source={require('../../../assets/water_drops.png')}
              style={{ width: 100, height: 138, margin: 20 }}
            />
            <Text style={[styles.headerText]}>
              YOU'VE REDUCED YOUR H2O COSUMPTION BY {parseFloat(this.props.water || 0).toFixed(2)} GALLONS!
            </Text>
          </View>
        </View>
      </Modal>
    );
  }
}
