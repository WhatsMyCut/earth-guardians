import React from 'react';
import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  TouchableHighlight,
  TouchableOpacity,
  Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LinearGradientProps from '../../../constants/LinearGradientProps';
import graphql from '../../hoc/graphql';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { GET_USER } from '../../graphql/queries/get_user';
import { styles, defaults } from '../../../constants/Styles'

export default class ProfileComponent extends React.Component {
  constructor(props) {
    super(props)
  }
  greyOrWhite = (el) => {
    return (el !== null) ? styles.textWhite18B : styles.profilePlaceholerText;
  }
  render() {
    const { my_user } = this.props;

    if(my_user.loading){
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large"/>
        </View>
      )
    }
    const profilepic= my_user.me.photo ? { uri: my_user.me.photo} : require('../../../assets/Group_427.png');
    const namestyle = this.greyOrWhite(my_user.me.name);
    const zipstyle = this.greyOrWhite(my_user.me.zipcode);
    const phonestyle = this.greyOrWhite(my_user.me.phone);
    const emailstyle = this.greyOrWhite(my_user.me.email);
    const crewstyle = this.greyOrWhite(my_user.me.crew);
    const crewtypestyle = this.greyOrWhite(my_user.me.crew_type);
    return (
      <ScrollView style={[styles.container]}>
        <TouchableOpacity
          onPress={() => this.props.updatePic()}
          style={[styles.container,]}
        >
          <LinearGradient
          {...LinearGradientProps.profileItem}
          style={[ styles.linearGradientBox, styles.centerAll, {width: '100%', padding: 20}]}>
            <View style={[styles.container]}>
              <Image source={profilepic} style={[styles.profileImage, {alignSelf: 'center', marginBottom: 30}]} />
              <View style={[styles.centerAll, { flexDirection: 'row', top: -10}]}>
                <MaterialCommunityIcons
                  name="camera-front-variant"
                  size={22}
                  color={'#fff'}
                  style={[styles.container, styles.centerText]}
                />
                <Text style={[styles.container, styles.smallWhiteText, { flexBasis: 80 }]}>Click to Update</Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
        <View style={[styles.container, styles.centerText, { marginTop: 20,}]}>
          <View style={[styles.profileRow]}>
            <Text style={[styles.profileCell, styles.underline, namestyle]}>{my_user.me.name || 'Name'}</Text>
          </View>
          <View style={[styles.profileRow]}>
            <Text style={[styles.profileCell, styles.underline, zipstyle]}>{my_user.me.zipcode || 'Zipcode'}</Text>
          </View>
          <View style={[styles.profileRow]}>
            <Text style={[styles.profileCell, styles.underline, phonestyle]}>{my_user.me.phone || 'Phone'}</Text>
          </View>
          <View style={[styles.profileRow]}>
            <Text style={[styles.profileCell, styles.underline, emailstyle]}>{my_user.me.email ? my_user.me.email.length > 15 ? `${my_user.me.email.substring(0, 15)}...` :my_user.me.email : 'Email' }</Text>
          </View>
          <View style={[styles.profileRow]}>
            <Text style={[styles.profileCell, styles.underline, crewstyle]}>{my_user.me.crew || 'Affiliation'}</Text>
          </View>
          <View style={[styles.profileRow]}>
            <Text style={[styles.profileCell, styles.underline, crewtypestyle]}>{my_user.me.crew_type || 'Affiliation Type'}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.buttonContainer]}
          onPress={() => this.props.openModal()}
        >
          <Text style={[styles.textGrey18B]}>Update Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
