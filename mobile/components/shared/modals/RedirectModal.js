import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { styles } from '../../../constants/Styles';
import { WebBrowser } from 'expo';
import NavigationService from '../../../navigation/navigationService';
export default class RedirectModal extends React.Component {
  state = { modalVisible: true };
  toggleModalVisible = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {

        }}
      >
        <View
          style={[styles.modalView, {
            paddingTop: 200,
            paddingHorizontal: 20,
          }]}
        >
          <View style={[styles.headerContainer]}>
            <Text style={[styles.headerText]}>
              YOU HAVE CHOSEN TO COMMIT TO THIS!
            </Text>
            <Text style={[styles.textWhite]}>
               Visit our page to take the next step
            </Text>
            <TouchableOpacity
              style={[styles.buttonContainer]}
              onPress={() => {
                WebBrowser.openBrowserAsync(this.props.external_url.trim());
                this.props.onClose();
              }}
            >
              <Text style={[styles.textGrey18B]}>
                REDIRECT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
