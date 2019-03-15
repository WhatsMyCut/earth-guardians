import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import CommunityEventModal from '../components/shared/modals/CommunityEventModal';
import { styles } from '../constants/Styles'

export default class ModalScreen extends React.Component {
  render() {
    // let previousScreen = this.props.navigation.getParam(
    //   'previousScreen',
    //   'MyActions'
    // );

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
          <CommunityEventModal previousScreen={previousScreen} />
        </View>
      </SafeAreaView>
    );
  }
}
