import React from 'react';
import { View, Image } from 'react-native';
import { LinearGradient } from 'expo';
import { DonutGraph } from './DonutGraph';
import LinearGradientProps from '../../../constants/LinearGradientProps';
export default class GraphComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log('props in graph component', this.props);
    return (
      <LinearGradient
        {...LinearGradientProps.profileItem}
        style={{
          flex: 1,
          borderRadius: 5,
          elevation: 1,

          marginVertical: 5,
        }}
      >
        <View
          style={{
            //backgroundColor: '#666',
            justifyContent: 'center',
            alignItems: 'center',
            width: SCREEN_WIDTH * 0.9,

            height: 150,
          }}
        >
          <DonutGraph
            height={120}
            width={120}
            carbon_dioxide={this.props.carbon_dioxide}
            water={this.props.water}
            waste={this.props.waste}
          />
          {/* <Image
          source={require('./temp/barchart.png')}
          style={{ height: 100, width: 200 }}
        /> */}
        </View>
      </LinearGradient>
    );
  }
}
