import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import { styles } from '../../../constants/Styles'


export default class WorldRankComponent extends React.Component {
  render() {
    return (
      <View style={styles.rankContainer}>
        <View style={styles.rankRow}>
          <Text style={styles.rankNumber}>1</Text>
          <View style={styles.rankDetail}>
            <Text style={styles.rankName}>
              Iceland
            </Text>
            <Text style={styles.smallWhiteText}>
              9,876,653
            </Text>
          </View>
        </View>
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

