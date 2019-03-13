import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Modal,
  Image
} from 'react-native';
import { styles, defaults } from '../../../constants/Styles';

export default class WasteModal extends React.Component {
  render() {
    const { waste } = this.props
    const value = parseFloat(waste.data || 0).toFixed(2);
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
              <View
                style={[styles.modalView, {
                  marginVertical: (defaults.primaryHeight / 2) - 150,
                  marginHorizontal: 20
                }]}
              >
                <View style={[styles.headerContainer]}>
                  <Image
                    source={require('../../../assets/waste.png')}
                    style={{ width: 138, height: 100, margin: 20 }}
                  />
                  <Text style={[styles.headerText]}>
                    YOU'VE REDUCED YOUR WASTE BY { value } POUNDS!
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
