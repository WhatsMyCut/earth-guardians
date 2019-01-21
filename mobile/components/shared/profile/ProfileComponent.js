import React from 'react';
import { View, Text, TextInput,ActivityIndicator, Image, StyleSheet, Dimensions, TouchableHighlight } from 'react-native';
import graphql from '../../hoc/graphql';
const SCREEN_WIDTH = Dimensions.get('window').width;
import { GET_USER } from '../../graphql/queries/get_user';



@graphql(GET_USER,{
  name:"my_user",
  options:{
    pollInterval:500
  }
})
export default class Profileomponent extends React.Component {
  render() {
    const { my_user } = this.props;

    if(my_user.loading){
      return <View style={styles.container}>
        <ActivityIndicator size="large"/>
      </View>
      
    }

    return (
      <TouchableHighlight onPress={this.props.onPress}>
      <View style={styles.container}>
        <Image source={require('../../../assets/Group_427.png')} style={styles.profileImage} />
        <View style={{ width: SCREEN_WIDTH * 0.9 }}>
          <View style={styles.info}>
            <View style={styles.labelWrapper}>
            <Text style={styles.label}>{my_user.me.name || 'Name'}</Text>
            </View>
            <View style={styles.labelWrapper}>
              <Text style={styles.label}>{my_user.me.zipcode || 'Zipcode'}</Text>
            </View>
            {/* <View style={styles.labelWrapper}>
              <Text style={styles.label}>Last Name</Text>
            </View> */}
          </View>
          <View style={styles.info}>
            <View style={styles.labelWrapper}>
              <Text style={styles.label}>{my_user.me.phone || 'phone'}</Text>
            </View>
            <View style={styles.labelWrapper}>
              <Text style={styles.label}>{my_user.me.email ? my_user.me.email.length > 15 ? `${my_user.me.email.substring(0, 15)}...` :my_user.me.email : 'Email' }</Text>
            </View>
            
          </View>
          <View style={styles.info}>
            

            <View style={styles.labelWrapper}>
              <Text style={styles.label}>{my_user.me.crew || 'Affiliation'}</Text>
            </View>
            <View style={styles.labelWrapper}>
              <Text style={styles.label}>{my_user.me.crew_type || 'Affiliation Type'}</Text>
            </View>
            
          </View>
        </View>
      </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.9
  },
  profileImage: {
    width: 40,
    height: 40,
    marginVertical: 10,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  labelWrapper: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    paddingBottom: 1,
    marginRight: 20,
  },
  label: { color: '#fff' },
});
