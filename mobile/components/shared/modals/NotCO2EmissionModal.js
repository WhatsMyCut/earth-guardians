import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Modal,
  Image
} from 'react-native';
import { styles, defaults } from '../../../constants/Styles';

export default class CarbonModal extends React.Component {
  render() {
    const { carbon_dioxide } = this.props
    const value = parseFloat(carbon_dioxide.data || 0).toFixed(2);
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.visible}
      >
        <TouchableWithoutFeedback style={[styles.container, styles.coverScreen]} onPress={() => {
          this.props.onClose()
        }}>
          <View style={[styles.container]}>
            <TouchableWithoutFeedback style={[styles.container, styles.coverScreen]} onPress={() => {
                return false
              }}>
              <View style={[styles.modalView, {
                marginVertical: (defaults.primaryHeight / 2) - 180,
                marginHorizontal: 20 }]}>
                <View style={[styles.headerContainer]}>
                  <Image
                    source={require('../../../assets/clouds.png')}
                    style={{ width: 106, height: 100, margin: 20 }}
                  />
                  <Text style={[styles.headerText]}>
                    YOU'VE REDUCED YOUR CO2 EMISSION BY { value }{' '}
                    POUNDS!
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
