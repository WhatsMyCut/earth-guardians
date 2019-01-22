import React from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  StyleSheet,
  Platform,
  WebView,
  Dimensions,
} from 'react-native';
import { Button, Searchbar } from 'react-native-paper';
import { all } from 'rsvp';
import { LinearGradient, Icon, WebBrowser } from 'expo';
import { AntDesign } from '@expo/vector-icons';

class PetitionTextScreen extends React.Component {
  state = { in: false }; //TODO, when Database is established, do a componentDidMount to load status
  image = this.props.navigation.getParam('image');
  title = this.props.navigation.getParam('title');
  
  togglePetition = () => {
    // TODO update Database
    const { sign_petition, my_user } = this.props;

    let variables = {
      id:my_user.me.id
    }

    sign_petition({variables})

    this.setState(
      prevState => ({
        in: !prevState.in,
      })
    );
  };


  render() {
    const body = this.props.navigation.getParam('body');
    let styles = `
      <style>
        h1,h2,h3,h4,h5,h6{
          font-family: sans-serif, Roboto;
          color:#ffffff;
        }

        p {
          font-family: sans-serif, Roboto;
          font-size:14px;
          color:#ffffff !important;
        }
        span{
          color:#ffffff !important;
        }

      </style>
    `
    let renderBody = styles + body;
    return <SafeAreaView style={{flex:1, justifyContent:"center", backgroundColor:"#1a1a1a"}}>
          <View style={{flex:1, paddingHorizontal:20, paddingTop:40}}>
            <WebView 
              // style={{height:600, width:480}}
              style={{backgroundColor: 'transparent'}}
              originWhitelist={['*']} 
              source={{ html: renderBody}} 
              scalesPageToFit={false}
              onNavigationStateChange={(event) => {
                if(event.url !== 'about:blank'){
                  let url = event.url.indexOf('https://') !== -1 ? event.url : `https://${event.url}`
                  WebBrowser.openBrowserAsync(url);
                }
              }}
              />
             </View>
             <TouchableOpacity
               onPress={() =>
                this.props.navigation.navigate('Petition', {
                  screen: 'Community',
                  image: this.image,
                  title: this.title,
                })
              }
               style={{ color: '#fff', alignSelf: 'center', paddingBottom: 0 }}
             >
               <AntDesign
                  name="down"
                  style={{
                  color: '#fff',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: 20,
                    // marginHorizontal: 10,
                 }}
               />
             </TouchableOpacity>
        </SafeAreaView>

    // return (
    //   <View style={{ flex: 1 }}>
    //     <View style={styles.container}>
        
          
    //       <View
    //         style={{
    //           flex: 1,
    //           paddingRight: 10,
    //           paddingLeft: 20,
    //         }}
    //       >
    //         <Text
    //           style={{
    //             fontSize: 30,
    //             fontWeight: 'bold',
    //             paddingBottom: 10,
    //             paddingTop: 30,
    //             color: 'blue',
    //           }}
    //         >
    //           {this.title}
    //         </Text>

    //         <WebView 
    //           // style={{height:600, width:480}}
    //           originWhitelist={['*']} 
    //           source={{ html: body}} 
    //           scalesPageToFit={false}
    //           />
    //       </View>
    //       <View
    //         style={{
    //           flex:1
    //         }}
    //       >
    //         <TouchableOpacity
    //           onPress={() =>
    //             navigationService.navigate('TODOAnotherPetitionTextScreen', {
    //               screen: 'Petition',
    //               image: this.image,
    //             })
    //           }
    //           style={{ color: '#fff', alignSelf: 'center', paddingBottom: 10 }}
    //         >
    //           <TabBarIcon
    //             name={
    //               Platform.OS === 'ios' ? `ios-arrow-down` : 'md-arrow-down'
    //             }
    //           />
    //         </TouchableOpacity>
    //       </View>
    //     </View>
    //   </View>
    // );
  }
}

const styles = {
  container: {
    flex: 1
  },
  topBackNav: {
    flex: 1,
    paddingHorizontal: 5,
  },
};

export default PetitionTextScreen;
