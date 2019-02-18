import React from 'react';
import { View, Image } from 'react-native';
import { LinearGradient } from 'expo';
import { DonutGraph } from './DonutGraph';
import LinearGradientProps from '../../../constants/LinearGradientProps';
import { styles } from '../../../constants/Styles';
export default class GraphComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <LinearGradient
        {...LinearGradientProps.profileItem}
        style={ styles.linearGradientBoxPadded } >
        <View style={ styles.donutGraphContainer } >
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
