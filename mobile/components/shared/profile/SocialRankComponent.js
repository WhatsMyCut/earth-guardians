import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import { styles } from '../../../constants/Styles'


export default class SocialRankComponent extends React.Component {
  render() {
    let len = this.props.user_rankings.length;
    return (
      <View style={[styles.greyCard, { margin: 15 }]}>
        <Text style={styles.socialRankHeader}>My Rank</Text>
        <View style={[styles.rankRow, styles.noDivider]}>
          <Text style={[styles.socialRankNumber, styles.myRankNumber]}>538</Text>
          <View style={styles.rankDetail}>
            <Text style={styles.rankName}>
              ME ME ME
            </Text>
            <Text style={styles.smallWhiteText}>
              666
            </Text>
          </View>
          <Text style={styles.rankState}>CO</Text>
        </View>
        <Text style={styles.socialRankHeader}>My Friends Rank</Text>
        {this.props.user_rankings &&
          this.props.user_rankings.map((item, index) =>  {
            let rowStyle = (index == len-1) ? styles.noDivider : ''
            return (
              <View key={index} style={[styles.rankRow, rowStyle]}>
                <Text style={[styles.socialRankNumber]}>{item.rank}</Text>
                <View style={[styles.rankDetail]}>
                  <Text style={[styles.rankName]}>
                    {item.name}
                  </Text>
                  <Text style={styles.smallWhiteText}>
                    {item.total_points}
                  </Text>
                </View>
                <Text style={styles.rankState}>{item.state.substr(0,2).toUpperCase()}</Text>
              </View>
            )
          })
        }
      </View>
    );
  }
}

