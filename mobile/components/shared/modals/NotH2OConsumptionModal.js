import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Modal,
  Image
} from 'react-native';
import { styles, defaults } from '../../../constants/Styles';

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
        style={{}}
      >
        <TouchableWithoutFeedback style={[styles.container, styles.coverScreen]} onPress={() => {
          this.props.onClose()
        }}>
          <View style={[styles.container]}>
            <TouchableWithoutFeedback style={[styles.container, styles.coverScreen]} onPress={() => {
                return false
              }}>
              <View style={[styles.modalView, styles.centerAll, {
                marginVertical: (defaults.primaryHeight / 2) - 80,
                flexJustify: 'flex-start',
              }]}>
                <View style={[styles.headerContainer]}>
                  {/* <Entypo name="water" color="white" size={50} /> */}
                  <Image
                    source={require('../../../assets/water_drops.png')}
                    style={{ width: 100, height: 100, margin: 20, resizeMode: 'contain' }}
                  />
                  <Text style={[styles.headerText]}>
                    YOU'VE REDUCED YOUR H2O COSUMPTION BY {parseFloat(this.props.water || 0).toFixed(2)} GALLONS!
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}
