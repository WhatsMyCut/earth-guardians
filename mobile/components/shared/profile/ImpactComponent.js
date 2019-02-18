import React from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo';
import LinearGradientProps from '../../../constants/LinearGradientProps';
import { styles } from '../../../constants/Styles'

export default class ImpactComponent extends React.Component {
  state = {
    front: true,
  };
  _viewA = () => {
    return (
      <View style={ styles.viewA_container }>
        <View>
          <Text>{null}</Text>
          <Text style={styles.itemName}>
            CO2 (lbs)
          </Text>
          <Text style={styles.itemName}>
            H2O (gal)
          </Text>
          <Text style={styles.itemName}>Waste (lbs)</Text>
        </View>
        <View>
          <Text style={{ color: '#fff', marginBottom: 10, fontSize: 10 }}>
            Your Impact
          </Text>
          <Text style={styles.itemPoint}>
            {this.props.carbon_dioxide}
          </Text>
          <Text style={styles.itemPoint}>
            {this.props.water}
          </Text>
          <Text style={styles.itemPoint}>
            {this.props.waste -= this.props.waste%.01}
          </Text>
        </View>
      </View>
    );
  };
  _viewB = () => {
    return (
      <View style={ styles.viewB_container }>
        <View style={styles.itemView}>
          <Text style={styles.itemName}>CO2 (lbs):</Text>
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
        style={{
          flex: 1,
          borderRadius: 5,
          elevation: 1,
          marginVertical: 5,
          shadowColor: "#000",
          shadowRadius: 2,
          shadowOpacity: 0.35,
          shadowOffset: {
            width: 0,
            height: 2
          },
        }}
      >
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

