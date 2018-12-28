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
import SignPetitionModal from '../components/shared/modals/SignPetitionModal';
import LinearGradientProps from '../constants/LinearGradientProps'
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default class ModalScreen extends React.Component {
  
  render() {
    let previousScreen = this.props.navigation.getParam('previousScreen', 'MyActions');
    console.log('previous screen', previousScreen);
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
          <CommunityEventModal previousScreen={previousScreen}/>
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
