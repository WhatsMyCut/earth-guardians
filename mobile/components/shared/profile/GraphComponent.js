import React from 'react';
import { View, Image } from 'react-native';
import { DonutGraph } from './DonutGraph';
export default class GraphComponent extends React.Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: '#666',
          justifyContent: 'center',
          alignItems: 'center',
          width: SCREEN_WIDTH * 0.9,
          borderRadius: 20,
          height: 150,
          marginVertical: 5,
        }}
      >
        <DonutGraph height={150} width={150} />
        {/* <Image
          source={require('./temp/barchart.png')}
          style={{ height: 100, width: 200 }}
        /> */}
      </View>
    );
  }
}
