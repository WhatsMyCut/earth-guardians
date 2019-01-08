import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class ImpactComponent extends React.Component {

  render() {

    return (
      <View
        style={{
          backgroundColor: '#666',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: SCREEN_WIDTH * 0.9,
          borderRadius: 20,
          height: 120,
          marginVertical: 5,
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
              fontWeight: 'bold',
            }}
          >
            {this.props.carbon_dioxide}
          </Text>
          <Text
            style={{
              color: '#fff',
              marginBottom: 5,
              fontSize: 18,
              fontWeight: 'bold',
            }}
          >
            {this.props.water}
          </Text>
          <Text
            style={{
              color: '#fff',
              marginBottom: 5,
              fontSize: 18,
              fontWeight: 'bold',
            }}
          >
            {this.props.waste}
          </Text>
        </View>
        {/* <View>
          <Text style={{ color: '#fff', marginBottom: 10, fontSize: 10 }}>
            Community
          </Text>
          <Text
            style={{
              color: '#fff',
              marginBottom: 5,
              fontSize: 18,
              fontWeight: 'bold',
            }}
          >
            27,894
          </Text>
          <Text
            style={{
              color: '#fff',
              marginBottom: 5,
              fontSize: 18,
              fontWeight: 'bold',
            }}
          >
            {this.state.points}
          </Text>
          <Text
            style={{
              color: '#fff',
              marginBottom: 5,
              fontSize: 18,
              fontWeight: 'bold',
            }}
          >
            27,940
          </Text>
        </View> */}
      </View>
    );
  }
}
