import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal
} from 'react-native';
import { styles, defaults } from '../../../constants/Styles';
import { WebBrowser } from 'expo';
import _ from 'lodash';
export default class RedirectModal extends React.Component {
  render() {
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
                marginVertical: (defaults.primaryHeight / 2) - 190,
                marginHorizontal: 20 }]}>
                <View style={[styles.headerContainer]}>
                  <Text style={[styles.headerText]}>
                    YOU HAVE CHOSEN TO COMMIT TO THIS!
                  </Text>
                  <Text style={[styles.textWhite18B]}>
                    Click below to visit our page and take the next step.
                  </Text>
                  <TouchableOpacity
                    style={[styles.buttonContainer]}
                    onPress={() => {
                      const { external_url } = this.props;
                      _.trim(external_url)
                      if (external_url !== '') {
                        WebBrowser.openBrowserAsync(external_url);
                      }
                      this.props.onClose();
                    }}
                  >
                    <Text style={[styles.textGrey18B]}>
                      REDIRECT
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}
