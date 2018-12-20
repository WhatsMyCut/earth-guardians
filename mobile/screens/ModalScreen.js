import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import { Button } from 'react-native-paper';
import navigationService from '../navigation/navigationService';
import RedirectModal from '../components/shared/modals/RedirectModal';
import SubmitModal from '../components/shared/modals/SubmitModal';

import FontAwesome from '@expo/vector-icons/FontAwesome';

export default class ModalScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={[
            styles.container,
            {
              backgroundColor: '#999',
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
        >
          <SubmitModal />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
