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
import CommunityImpactModal from '../components/shared/modals/CommunityImpactModal';
import CommunityEventModal from '../components/shared/modals/CommunityEventModal';

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
          <CommunityImpactModal />
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
