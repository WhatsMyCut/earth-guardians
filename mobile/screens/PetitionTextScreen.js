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
import { styles, defaults } from '../constants/Styles'

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
    let stylez = `
      <style>
        h1,h2,h3,h4,h5,h6{
          font-family: sans-serif, Roboto;
          color:#fff;
          margin-bottom: 0;
          padding-bottom: 0;
        }

        p {
          font-family: sans-serif, Roboto;
          font-weight: '300' !important;
          font-size:14px;
          collapse: all;
          color:#fff !important;
        }
        span{
          color:#fff !important;
          font-weight: 100;
          margin-top: 0;
        }

      </style>
    `
    let renderBody = stylez + body;
    return (
      <SafeAreaView style={[styles.greyCard, styles.coverScreen, {}]}>
        <View style={[styles.container, styles.padded ]}>
          <WebView
            // style={{height:600, width:480}}
            style={[styles.coverScreen, styles.coverAll, { maxWidth: defaults.width, backgroundColor: 'transparent' }]}
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
        <View style={[styles.container]}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Petition', {
                screen: 'Community',
                image: this.image,
                title: this.title,
              })
            }
            style={[styles.container, styles.centeredRow, {
              position: 'absolute',
              bottom: 0,
              flexDirection: 'column'
            }
          ]}>
            <Text style={[styles.smallWhiteText, styles.centerText]}>GO BACK</Text>
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
        </View>
      </SafeAreaView>
    )
  }
}

export default PetitionTextScreen;
