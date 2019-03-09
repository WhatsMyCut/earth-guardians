import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'expo';
import PubSub from 'pubsub-js'
import { Analytics, Event } from 'expo-analytics';
import { RetrieveData } from '../../../store/AsyncStore';
import { styles } from '../../../constants/Styles'
export default class ActionDetails extends React.Component {

  constructor(props) {
    super(props)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }
  state = {
    in: false
  };
  openModal() {
    PubSub.publish('showZipCodeModal', true);
  }
  closeModal() {
    PubSub.publish('closeModal');
  }
  _takeInAction = async () => {
    try {
      // TODO update Database

      this.setState(
        prevState => ({
          in: !prevState.in,
        })
      );

      this.props.takeTheAction();
      const item_id = await this.props.data.id;
      const phone = await RetrieveData('phone');
      const analytics = new Analytics('UA-131896215-1');
      analytics
        .event(new Event('MyAction', 'Press', phone, item_id))
        .then(() => {
          this.setState({in:false})
        })
        .catch(e => console.log(e.message));
    } catch (e) {
      console.log(e.message);
    }
  };

  render() {
    const { data } = this.props;
    if (!data) {
      return <Text>Nothing available</Text>;
    }

    const status_icon_name = this.state.in ? 'circle-slice-8' : 'circle-outline';
    const color = this.state.in ? 'green' : '#aaa';
    const yourverbiage = !this.props.canDelete || this.props.canGoThrough ? "I'm In!":"Can't Take Yet!"

    let item = data.action ? data.action : data;

    return (
      <View style={[styles.container, { justifyContent: 'space-between', flexDirection: 'column'}]}>
        <View style={[styles.contianer, { marginTop: 5, marginBottom: 3 }]}>
          <Text style={[styles.actionCardHeader, styles.centerText]}>
            {this.props.canDelete ? 'METRICS EARNED' : 'METRICS'}
          </Text>
        </View>

        <View style={[styles.container, {}]}>
          <View style={[styles.container, { flexDirection: 'row', alignContent:" flex-start"}]}>
            <View style={[styles.container]}>
              <Text style={[styles.actionCardLabel]}>
                CO2
              </Text>
              <Text style={[styles.actionCardTinyLabel]}>
                (lbs)
              </Text>
              <Text style={[styles.actionCardValue]}>
                {item.carbon_dioxide || 0}
              </Text>
            </View>
            <View style={[styles.container]}>
              <Text style={[styles.actionCardLabel]}>
                Water
              </Text>
              <Text style={[styles.actionCardTinyLabel]}>
                (gal)
              </Text>
              <Text style={[styles.actionCardValue]}>
                {item.water}
              </Text>
            </View>
            <View style={[styles.container]}>
              <Text style={[styles.actionCardLabel]}>
                Waste
              </Text>
              <Text style={[styles.actionCardTinyLabel]}>
                (lbs)
              </Text>
              <Text style={[styles.actionCardValue]}>
                {item.waste}
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.container, { marginVertical: '5%'}]}>
          <View style={[styles.container]}>
            <Text style={[styles.actionCardSubHeader]}>
              COMMUNITY
            </Text>
          </View>

          {this.props.zipcode && (
            <View style={[styles.contianer]}>
              <Text style={[styles.actionCardValue]}>
                {this.props.zipcode}
              </Text>
            </View>
          )}
          {!this.props.zipcode && (
            <TouchableOpacity style={[styles.container]} onPress={()=> {
              if(this.props.visible){
                this.openModal()
              }
            }}>
              <Text style={[styles.actionCardPlaceholderText]}>
                Zip Code
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          onPress={() => {
            if(this.props.visible){
              this._takeInAction()
            }
          }}
          disabled={this.props.canDelete ? !this.props.canGoThrough : false}
          style={{flexDirection:'row', justifyContent:'flex-end', alignContent:"center"}}
        >
          <Text style={[styles.actionCardSubHeader]}>{ yourverbiage }</Text>
          <Icon.MaterialCommunityIcons
            name={status_icon_name}
            style={{ color: color, fontSize: 18 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
