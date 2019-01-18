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

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class ImpactComponent extends React.Component {
  state = {
    front: true,
  };
  _viewA = () => {
    return (
      <View
        style={{
          //backgroundColor: '#666',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: SCREEN_WIDTH * 0.9,
          height: 120,
          flexDirection: 'row',
        }}
      >
        <View>
          <Text>{null}</Text>
          <Text style={{ color: '#fff', marginBottom: 10, fontSize: 11 }}>
            CO2 (lbs)
          </Text>
          <Text style={{ color: '#fff', marginBottom: 10, fontSize: 11 }}>
            H2O (gal)
          </Text>
          <Text style={{ color: '#fff', fontSize: 11 }}>Waste (lbs)</Text>
        </View>
        <View>
          <Text style={{ color: '#fff', marginBottom: 10, fontSize: 10 }}>
            Your Impact
          </Text>
          <Text
            style={{
              color: '#fff',
              marginBottom: 5,
              fontSize: 18,
              fontWeight: '900',
            }}
          >
            {this.props.carbon_dioxide}
          </Text>
          <Text
            style={{
              color: '#fff',
              marginBottom: 5,
              fontSize: 18,
              fontWeight: '900',
            }}
          >
            {this.props.water}
          </Text>
          <Text
            style={{
              color: '#fff',
              marginBottom: 5,
              fontSize: 18,
              fontWeight: '900',
            }}
          >
            {this.props.waste}
          </Text>
        </View>
      </View>
    );
  };
  _viewB = () => {
    return (
      <View
        style={{
          justifyContent: 'space-around',
          alignItems: 'flex-start',
          width: SCREEN_WIDTH * 0.9,
          height: 120,
          paddingHorizontal: 10,
          marginVertical: 10,
        }}
      >
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
        style={{ flex: 1, borderRadius: 5, elevation: 1, marginVertical: 5 }}
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

const styles = StyleSheet.create({
  itemView: { flexDirection: 'row', marginBottom: 10 },
  itemName: { color: '#fff', fontSize: 12, marginRight: 5 },
  itemDescription: { color: '#fff', fontSize: 10, paddingRight: 5 },
});
