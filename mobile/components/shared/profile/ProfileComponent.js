import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableHighlight,
  Image
} from 'react-native';
import graphql from '../../hoc/graphql';
import { GET_USER } from '../../graphql/queries/get_user';
import { styles } from '../../../constants/Styles'


@graphql(GET_USER,{
  name:"my_user",
})
export default class ProfileComponent extends React.Component {
  componentWillUnmount() {
    this.props.my_user = null
  }
  render() {
    const { my_user } = this.props;

    if(my_user.loading){
      return <View style={styles.container}>
        <ActivityIndicator size="large"/>
      </View>

    }

    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={[styles.componentContainer, styles.centerAll]}>
          <Image source={require('../../../assets/Group_427.png')} style={styles.profileImage} />
          <View style={styles.container}>
            <View style={styles.detailRow}>
              <Text style={[styles.detailCell, styles.underline]}>{my_user.me.name || 'Name'}</Text>
              <Text style={[styles.detailCell, styles.underline]}>{my_user.me.zipcode || 'Zipcode'}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={[styles.detailCell, styles.underline]}>{my_user.me.phone || 'Phone'}</Text>
              <Text style={[styles.detailCell, styles.underline]}>{my_user.me.email ? my_user.me.email.length > 15 ? `${my_user.me.email.substring(0, 15)}...` :my_user.me.email : 'Email' }</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={[styles.detailCell, styles.underline]}>{my_user.me.crew || 'Affiliation'}</Text>
              <Text style={[styles.detailCell, styles.underline]}>{my_user.me.crew_type || 'Affiliation Type'}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
