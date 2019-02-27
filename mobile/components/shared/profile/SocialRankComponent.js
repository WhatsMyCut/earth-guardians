import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import { styles } from '../../../constants/Styles'


export default class SocialRankComponent extends React.Component {
  render() {
    return (
      <View style={[styles.greyCard, { margin: 15 }]}>
        <Text style={styles.socialRankHeader}>My Rank</Text>
        <View style={[styles.rankRow, styles.noDivider]}>
          <Text style={[styles.socialRankNumber, styles.myRankNumber]}>538</Text>
          <View style={styles.rankDetail}>
            <Text style={styles.rankName}>
              John Mattia
            </Text>
            <Text style={styles.smallWhiteText}>
              502
            </Text>
          </View>
          <Text style={styles.rankState}>CO</Text>
        </View>
        <Text style={styles.socialRankHeader}>My Friends Rank</Text>
        <View style={styles.rankRow}>
          <Text style={styles.socialRankNumber}>397</Text>
          <View style={styles.rankDetail}>
            <Text style={styles.rankName}>
              Jane Carroll
            </Text>
            <Text style={styles.smallWhiteText}>
              383
            </Text>
          </View>
          <Text style={styles.rankState}>NY</Text>
        </View>
        <View style={styles.rankRow}>
          <Text style={styles.socialRankNumber}>835</Text>
          <View style={styles.rankDetail}>
            <Text style={styles.rankName}>
              Rita Olsen
            </Text>
            <Text style={styles.smallWhiteText}>
              196
            </Text>
          </View>
          <Text style={styles.rankState}>CO</Text>
        </View>
        <View style={[styles.rankRow, styles.noDivider]}>
          <Text style={styles.socialRankNumber}>1074</Text>
          <View style={styles.rankDetail}>
            <Text style={styles.rankName}>
              Ben Hewitt
            </Text>
            <Text style={styles.smallWhiteText}>
              75
            </Text>
          </View>
          <Text style={styles.rankState}>CO</Text>
        </View>
      </View>
    );
  }
}

