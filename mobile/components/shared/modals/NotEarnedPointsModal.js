import React from 'react';
import { View, Text, TouchableOpacity, Modal, Image } from 'react-native';
import { styles } from '../../../constants/Styles';

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
        style={[styles.centerAll, {
          backgroundColor: '#333',
        }]}
      >
        <View style={[styles.modalView, { marginTop: 200, marginHorizontal: 20 }]}>
          <View style={[styles.headerContainer]}>
            <Image
              source={require('../../../assets/ribbon.png')}
              style={{ width: 100, height: 123, margin: 20 }}
            />
            <Text style={[styles.headerText]}>
              YOU'VE EARNED
            </Text>
            <Text style={[styles.headerText]}>
              800 POINTS
            </Text>

            <Text style={[styles.textWhite, { marginTop: 20 }]}>
              You are now ranked #127 in your
            </Text>
            <Text style={[styles.textWhite, { marginBottom: 20 }]}>
              community
            </Text>
          </View>
        </View>
      </Modal>
    );
  }
}
