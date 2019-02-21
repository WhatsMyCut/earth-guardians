import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { styles } from '../../constants/Styles'

class GameControls extends React.Component {
   render() {
      return (
         <View style={styles.gameRow}>
            <TouchableOpacity
               onPress={this.props.leftPress}
               style={styles.swipeButton}
               disable={this.props.loading}
            >
               <Icon name="close" size={56} color="#824A4A" />
            </TouchableOpacity>
            <TouchableOpacity
               onPress={this.props.goBack}
               style={[styles.swipeButton, { padding: 10 }]}
               disable={this.props.loading}
            >
               <Icon name="refresh" size={16} color="rgba(0, 0, 0, 0.4)" />
            </TouchableOpacity>
            <TouchableOpacity
               onPress={this.props.rightPress}
               style={styles.swipeButton}
               disable={this.props.loading}
            >
               <Icon name="check" size={56} color="#4A825F" />
            </TouchableOpacity>
         </View>
      );
   }
}

export default GameControls;
