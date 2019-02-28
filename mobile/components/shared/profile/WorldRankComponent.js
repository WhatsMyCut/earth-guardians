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
        {this.props.rankings.map(item => console.log('Item', item))}
        {this.props.rankings.length == 0 &&
          <Text style={[styles.textWhite]}>No Rankings</Text>
        }
        {this.props.rankings.length > 0 &&
          this.props.rankings.map(({item, index}) => {
            return (
              <View style={styles.rankRow}>
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
        <View style={styles.rankRow}>
          <Text style={styles.rankNumber}>2</Text>
          <View style={styles.rankDetail}>
            <Text style={styles.rankName}>
              Switzerland
            </Text>
            <Text style={styles.smallWhiteText}>
              9,876,653
            </Text>
          </View>
        </View>
        <View style={styles.rankRow}>
          <Text style={styles.rankNumber}>3</Text>
          <View style={styles.rankDetail}>
            <Text style={ styles.rankName}>
              Costa Rica
            </Text>
            <Text style={styles.smallWhiteText}>
              9,876,653
            </Text>
          </View>
        </View>
        <View style={styles.rankRow}>
          <Text style={styles.rankNumber}>4</Text>
          <View style={styles.rankDetail}>
            <Text style={styles.rankName}>
              Sweden
            </Text>
            <Text style={styles.smallWhiteText}>
              9,876,653
            </Text>
          </View>
        </View>
        <View style={styles.rankRow}>
          <Text style={styles.rankNumber}>5</Text>
          <View style={styles.rankDetail }>
            <Text style={styles.rankName}>
              Norway
            </Text>
            <Text style={styles.smallWhiteText}>
              9,876,653
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

