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
        style={ styles.linearGradientBox } >
        <View style={ styles.graphContainer } >
          <DonutGraph
            height={120}
            width={120}
            carbon_dioxide={35}
            water={59}
            waste={21}
          />
        </View>
      </LinearGradient>
    );
  }
}
