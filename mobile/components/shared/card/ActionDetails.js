import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient, Icon } from 'expo';
import { TouchableRipple, Button } from 'react-native-paper';

export default class ActionDetails extends React.Component {
  state ={

  }

  _takeInAction = () => {
    // TODO update Database

    this.setState(
      prevState => ({
        in: !prevState.in,
      }),
      () => {
        console.log(`The state is ${this.state.in}`);
      }
    );

    this.props.takeTheAction();
  };


  render() {
    const { data } = this.props;
    if(!data){
      return <Text>Nothing available</Text>
    }

    const status_icon_name = this.state.in
      ? 'circle-slice-8'
      : 'circle-outline';
    const color = this.state.in ? 'green' : '#aaa';
    console.log('item inside of actiondetails', data);
    let item = data.action ? data.action : data;
    return (
      <View style={{ flex: 1, margin: 5 }}>
        <View style={{ flex: 1, marginTop: 10, marginBottom: 3 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              fontFamily: 'Proxima Nova Bold',
              color: '#666',
            }}
          >
            METRICS
          </Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', marginLeft:-16}}>
          <View style={{ flex: 1, justifyContent:"space-between"}}>
            <Text style={{ fontFamily: 'Proxima Nova', color: '#666', textAlign:"center"  }}>
              CO2
            </Text>
            <Text style={{ fontFamily: 'Proxima Nova', color: '#666', fontSize:8, textAlign:"center" }}>
              (lbs)
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                fontFamily: 'Proxima Nova Bold',
                color: '#666',
                textAlign:"center" 
              }}
            >
              {item.carbon_dioxide}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: 'Proxima Nova', color: '#666', textAlign:"center"  }}>
              Water
            </Text>
            <Text style={{ fontFamily: 'Proxima Nova', color: '#666', fontSize:8, textAlign:"center" }}>
              (gal)
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                fontFamily: 'Proxima Nova Bold',
                color: '#666',
                textAlign:"center" 
              }}
            >
              {item.water}

            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: 'Proxima Nova', color: '#666', textAlign:"center"  }}>
              Waste
            </Text>
            <Text style={{ fontFamily: 'Proxima Nova', color: '#666', fontSize:8, textAlign:"center"}}>
              (lbs)
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                fontFamily: 'Proxima Nova Bold',
                color: '#666',
                textAlign:"center" 
              }}
            >
              {item.waste}
            </Text>
          </View>
        </View>

    
       
       <View style={{ flex: 1 }}>
          <Text
            style={{ fontFamily: 'Proxima Nova', color: '#666', marginTop: 20 }}
          > COMMUNITY
          </Text>
        </View>
        
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              fontFamily: 'Proxima Nova Bold',
              color: '#eee',
            }}
          >
            Zip Code
          </Text>
          
        </View> 
        <View style={{ flex: 1, marginBottom: 10 }}>
          <Text
            style={{
              fontSize: 10,
              fontFamily: 'Proxima Nova',
              color: '#666',
            }}
          >
            You’ve offset the equivalent of 50 showers.
          </Text>
        </View>
        {!this.props.canDelete && (
        <TouchableOpacity
                  onPress={() => this._takeInAction()}
                  style={{flexDirection:'row', justifyContent:'flex-end', alignContent:"center"}}
                >
                  <Text style={{fontSize: 18,fontWeight: '700', fontFamily: 'Proxima Nova Bold',color:'#000000', paddingRight:10}}>I'm in!</Text>
                  <Icon.MaterialCommunityIcons
                    name={status_icon_name}
                    style={{ color: color, fontSize: 18 }}
                  />
        </TouchableOpacity>
        )}
      </View>
    );
  }
}
