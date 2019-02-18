import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { styles } from '../../../constants/Styles'
import { LinearGradient } from 'expo';
import LinearGradientProps from '../../../constants/LinearGradientProps';


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
          <Text
            style={{
              color: '#fff',
              marginBottom: 5,
              fontSize: 18,
              fontWeight: '900',
              paddingRight:10
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
              paddingRight:10
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
              paddingRight:10
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
          height: 150,
          paddingHorizontal: 10,
          paddingRight:20,
          marginVertical: 15,
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

