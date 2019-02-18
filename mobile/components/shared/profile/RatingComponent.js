import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo';
import LinearGradientProps from '../../../constants/LinearGradientProps';
import { styles } from '../../../constants/Styles'


export default class RatingComponent extends React.Component {
  state = {
    front: true,
  };
  _viewA = () => {
    return (
      <View style={ styles.viewA_container }>
        <View>
          <Text>User</Text>
          <Text style={{ color: '#fff', marginBottom: 10, fontSize: 14 }}>
            CO2 (lbs)
          </Text>
          <Text style={{ color: '#fff', marginBottom: 10, fontSize: 14 }}>
            H2O (gal)
          </Text>
          <Text style={{ color: '#fff', fontSize: 14 }}>Waste (lbs)</Text>
        </View>
        <View>
          <Text style={{ color: '#fff', marginBottom: 10, fontSize: 10 }}>
            Your Rating
          </Text>
          <Text style={ styles.itemPoint}>
            {this.props.carbon_dioxide}
          </Text>
          <Text style={ styles.itemPoint}>
            {this.props.water}
          </Text>
          <Text style={ styles.itemPoint}>
            {this.props.waste}
          </Text>
        </View>
      </View>
    );
  };
  _viewB = () => {
    return (
      <View style={ styles.viewB_container }>
        <View style={styles.itemView}>
          <Text style={styles.itemName}>CO2 (lbs): </Text>
          <Text style={styles.itemDescription}>
            You’ve offset the equivalent of driving a car for 20 miles.
          </Text>
        </View>

        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <Text style={styles.itemName}>H2O (gal): </Text>
          <Text style={styles.itemDescription}>
            You’ve offset the equivalent of taking 100 showers.
          </Text>
        </View>

        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <Text style={styles.itemName}>Waste (lbs): </Text>
          <Text style={styles.itemDescription}>
            You’ve offset the equivalent of 2 months of trash.
          </Text>
        </View>
      </View>
    );
  };
  render() {
    return (
      <LinearGradient
        {...LinearGradientProps.profileItem}
        style={ styles.linearGradientBox} >
        <TouchableOpacity
          onPress={() =>
            this.setState({
              front: !this.state.front,
            })
          }
        >
          {this.state.front ? this._viewA() : this._viewB()}
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}

