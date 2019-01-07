import React from 'react';
import { View, Image } from 'react-native';
import { DonutGraph } from './DonutGraph';
export default class GraphComponent extends React.Component {
  constructor(props){
    super(props);
    
  }
  render() {
    console.log('props in graph component', this.props);
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
        <DonutGraph height={120} width={120} carbon_dioxide={this.props.carbon_dioxide} water={this.props.water} waste={this.props.waste}/>
        {/* <Image
          source={require('./temp/barchart.png')}
          style={{ height: 100, width: 200 }}
        /> */}
      </View>
    );
  }
}
