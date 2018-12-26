import React from 'react';

import { View, Text } from 'react-native';

export default class ActionDetails extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, margin: 5 }}>
        <View style={{ flex: 1, marginTop: 10, marginBottom: 5 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              fontFamily: 'Proxima Nova Bold',
              color: '#666',
            }}
          >
            MY POINTS
          </Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: 'Proxima Nova', color: '#666' }}>
              Today
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                fontFamily: 'Proxima Nova Bold',
                color: '#666',
              }}
            >
              20
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: 'Proxima Nova', color: '#666' }}>
              Total
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                fontFamily: 'Proxima Nova Bold',
                color: '#666',
              }}
            >
              480
            </Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{ fontFamily: 'Proxima Nova', color: '#666', marginTop: 20 }}
          >
            community
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              fontFamily: 'Proxima Nova Bold',
              color: '#eee',
            }}
          >
            Zip Code
          </Text>
        </View>
        <View style={{ flex: 1, marginBottom: 10 }}>
          <Text
            style={{
              fontSize: 10,
              fontFamily: 'Proxima Nova',
              color: '#666',
            }}
          >
            You’ve offset the equivalent of 50 showers.
          </Text>
        </View>
      </View>
    );
  }
}
