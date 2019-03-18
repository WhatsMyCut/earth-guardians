import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import { styles } from '../../../constants/Styles'


export default class SocialRankComponent extends React.Component {


  render() {
    console.log('this.props._user rankings', this.props);

    let len = this.props.user_rankings.length;
    let my_user_rank = this.props.user_rankings.find(user => user.id == this.props.my_user.id);

    if(!my_user_rank){
      return <View style={[styles.greyCard, { margin: 15 }]}>
      <Text style={styles.socialRankHeader}>My Rank</Text>
      <Text style={styles.socialRankHeader}>No Action recorded, start taking actions today!</Text>
      </View>
    } 
    return (
      <View style={[styles.greyCard, { margin: 15 }]}>
        <Text style={styles.socialRankHeader}>My Rank</Text>
        <View style={[styles.rankRow, styles.noDivider]}>
          <Text style={[styles.socialRankNumber]}>{my_user_rank.rank}</Text>
          <View style={styles.rankDetail}>
            <Text style={styles.rankName}>
              {my_user_rank.name}
            </Text>
            <Text style={styles.smallWhiteText}>
              {my_user_rank.total_points}
            </Text>
          </View>
          <Text style={styles.rankState}>{my_user_rank.state.substr(0,2).toUpperCase()}</Text>
        </View>
        <Text style={styles.socialRankHeader}>My Friends Rank</Text>
        {this.props.user_rankings &&
          this.props.user_rankings.filter(user => {
            return user.id != my_user_rank.id && user.crew == my_user_rank.crew;
          }).map((item, index) =>  {
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

