import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { DonutGraph } from './DonutGraph';
import LinearGradientProps from '../../../constants/LinearGradientProps';
import { styles, defaults } from '../../../constants/Styles';
export default class GraphComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <LinearGradient
        {...LinearGradientProps.profileItem}
        style={ styles.linearGradientBoxPadded } >
        <View style={[styles.componentContainer ]} >
          <DonutGraph
            height={120}
            width={120}
            carbon_dioxide={this.props.carbon_dioxide}
            water={this.props.water}
            waste={this.props.waste}
          />
        </View>
      </LinearGradient>
    );
  }
}
