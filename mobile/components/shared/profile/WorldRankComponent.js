import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import { styles } from '../../../constants/Styles'


export default class WorldRankComponent extends React.Component {
  render() {
    return (
      <View style={[styles.rankContainer]}>
        {this.props.rankings &&
          this.props.rankings.map((item, index) => {
            return (
              <View key={index} style={styles.rankRow}>
                <Text style={styles.rankNumber}>{index+1}</Text>
                <View style={styles.rankDetail}>
                  <Text style={styles.rankName}>
                    {item.country}
                  </Text>
                  <Text style={styles.smallWhiteText}>
                    {item.points}
                  </Text>
                </View>
              </View>
            )
          })
        }
      </View>
    );
  }
}

