import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import { styles } from '../../../constants/Styles'


export default class WorldRankComponent extends React.Component {
  render() {
    console.log('WorldRankComponent', this.props.rankings)
    return (
      <View style={styles.rankContainer}>
        {this.props.rankings.length <= 0 &&
          <Text style={[styles.textWhite]}>No Rankings</Text>
        }
        {this.props.rankings.length > 0 &&
          this.props.rankings.map(({country, points}, index) => {
            return (
              <View style={styles.rankRow}>
                <Text style={styles.rankNumber}>{index+1}</Text>
                <View style={styles.rankDetail}>
                  <Text style={styles.rankName}>
                    {country}
                  </Text>
                  <Text style={styles.smallWhiteText}>
                    {points}
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

