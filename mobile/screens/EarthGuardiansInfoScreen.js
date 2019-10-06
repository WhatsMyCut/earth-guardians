import React from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { styles, defaults } from '../constants/Styles'

class EarthGuardiansInfoScreen extends React.Component {
  //TODO, navigate back to the previos screen
  componentDidMount() {
    // Analytics
  }

  render() {
    return (
      <LinearGradient colors={['#333333', '#1a1a1a']} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <View style={styles.topNav}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('MyActions')}
              >
                <Ionicons name="ios-arrow-round-back" size={42} color="#ccc" />
              </TouchableOpacity>
            </View>
            <ScrollView style={{ flex: 1, paddingRight: 20, paddingLeft: 20, paddingTop:15 }}>
              <View style={{ marginBottom: 10 }}>
                <Image style={{ width: defaults.SCREEN_WIDTH, height: 200, marginLeft:-20 }} source={{uri:"https://farm8.staticflickr.com/7887/46833317801_75cbc31625_b.jpg"}} />
                <View style={{flex:1, justifyContent:'center', flexDirection:'row', alignContent:'center'}}>
                  <Image style={{width: 120, height: 120}} resizeMode="contain" source={require('../assets/eye_w.png')} />
                </View>
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    paddingBottom: 10,
                    paddingTop: 20,
                    color: '#ffffff',
                    textAlign: 'center',
                  }}
                >
                  EARTH GUARDIANS
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    paddingBottom: 20,
                    color: '#ffffff',
                    textAlign: 'center',
                    lineHeight: 25,
                  }}
                >
                  We empower young people by providing them with leadership
                  opportunities and tools to bring their innovative solutions to
                  the world’s most pressing issues.
                </Text>
              </View>
              <View style={{ marginBottom: 10 }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 16,
                    paddingBottom: 20,
                    color: '#ffffff',
                    lineHeight: 25,
                  }}
                >
                  Earth Guardians began as an accredited high school in Maui,
                  Hawaii in 1992, focusing on environmental awareness and action
                  in its core curriculum. Students studied the history of social
                  movements and took action to restore sandalwood forests and
                  shut down the toxic practice of burning sugar cane. The school
                  became recognized throughout the Hawaiian Islands and beyond,
                  with the Dalai Lama presenting the Children's Torch of Hope to
                  twenty-five Earth Guardian students.
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 16,
                    paddingBottom: 20,
                    color: '#ffffff',
                    lineHeight: 25,
                  }}
                >
                  Seeing the need to empower and give voice to a wider audience
                  prompted Earth Guardians to relocate to Colorado in 1997 and
                  engage more young people in programs to empower and amplify
                  their voice. Earth Guardians began teaching youth about the
                  involvement in political action and activism, working to stop
                  the spraying of pesticides in public parks, establishing an
                  environmental fee on plastic bags, advocating for
                  municipalizing Boulder's energy grid, and helping to achieve a
                  moratorium on fracking. Earth Guardians received a great deal
                  of press and attention for local actions, allowing the
                  organization to expand into national and international work.
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 16,
                    paddingBottom: 20,
                    color: '#ffffff',
                    lineHeight: 25,
                  }}
                >
                  Now with thousands of engaged youth on six continents, Earth
                  Guardians has given youth a voice and direction worldwide in
                  order to become effective leaders and make measurable change
                  in their communities. Earth Guardians is developing the
                  resources to build a stronger collaborative network and
                  cultivate this large wave of youth engagement.
                </Text>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }
}

export default EarthGuardiansInfoScreen;
