import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  TouchableHighlight,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';

import { Dropdown} from 'react-native-material-dropdown';
import NavigationService from '../../../navigation/navigationService';
import graphql from '../../hoc/graphql';
import { UPDATE_USER } from '../../graphql/mutations/update_user_mutation';
import { GET_USER } from '../../graphql/queries/get_user';
import { fromPromise } from 'apollo-link';

@graphql(UPDATE_USER, {
  name: 'update_user_mutation',
})
@graphql(GET_USER, {
  name:"my_user",
  fetchPolicy: 'network-only',
})
export default class UpdateUserModal extends React.Component {
    state = { phone:null, zipcode:'000000', crew: null, name:null, email:null, crew_type: null };
  
  constructor(props){
      super(props);

  }
  updateUser = () => {
    const { password, confirmPassword } = this.state;
    const { update_user_mutation, my_user } = this.props;
    let variables={
        id : my_user.me.id,
        phone: this.state.phone ? this.state.phone : my_user.me.username,
        username: this.state.phone ? this.state.phone : my_user.me.username,
        name: this.state.name ? this.state.name : my_user.me.name,
        zipcode: this.state.zipcode ? this.state.zipcode : my_user.me.zipcode,
        crew: this.state.crew ? this.state.crew : my_user.me.crew,
        email: this.state.email ? this.state.email : my_user.me.email,
        crew_type: this.state.crew_type ? this.state.crew_type : my_user.me.crew_type
        
    }
      update_user_mutation({variables}).then(res =>{
        console.log('response stuffs', res.data);
        this.props.onClose();
      })
    
  };

  loadingModalContent(){
    return <KeyboardAvoidingView behavior="padding">
    <Modal
    animationType="slide"
    transparent={true}
    visible={this.props.isVisible}
    onRequestClose={() => {
      Alert.alert('Modal has been closed.');
    }}
    >
    <View 
          style={{
              flex:1,
              justifyContent: 'center',
              flexDirection:'column',
              alignItems: 'center',
              paddingHorizontal: 5,
          }}
      >
     <View
    style={{
      backgroundColor: '#333',
      alignItems: 'center',
      height:'50%',
      width:'75%',
      borderRadius: 15,
      paddingTop:20,
    }}
  > 
  
   
    <Text
      style={{
        color: '#fff',
        marginHorizontal: 20,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
      }}
    >
      Loading ... 
    </Text>
    
    
  </View>
  </View>
  </Modal>
  </KeyboardAvoidingView>
  }

  render() {
    const { goBack, my_user } = this.props;
    if(my_user.loading) {
      return this.loadingModalContent()
    } 

    const typesOfCrews = [
        {value:"School"},
        {value:"Business"},
        {value:"Crew"}
      ]

    const { me } = this.props.my_user;
    console.log('me', me);
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
      >
     
        <ScrollView
            contentContainerStyle={{
                flex: 1,
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: 15,
                backgroundColor: '#333',
            }}
          
        > 
         <KeyboardAvoidingView 
         behavior="padding"
            style={{
                flex: 1,
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: 15,
                backgroundColor: '#333',
            }}
        >
        <View
            style={{
            backgroundColor: '#333',
            alignItems: 'center',
            paddingTop:20,
            }}
        > 
          <Text
            style={{
              color: '#fff',
              marginHorizontal: 20,
              fontSize: 18,
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Update Profile
          </Text>
   
          <TextInput
            style={{
              color: '#fff',
              height: 30,
              width: 200,
              textAlign: 'left',
              marginVertical: 10,
              borderColor: 'gray',
              borderBottomWidth: 1,
            }}
            onChangeText={phone => this.setState({phone})}
            placeholder={this.props.my_user.me.username || 'Phone'}
            placeholderTextColor="#fff"
            keyboardType="default"
            secureTextEntry={true}
            returnKeyType="done"
            // value={this.state.zipCode}
          />
          <TextInput
            style={{
              color: '#fff',
              height: 30,
              width: 200,
              textAlign: 'left',
              marginTop:10,
              marginBottom:10,
              borderColor: 'gray',
              borderBottomWidth: 1,
            }}
            onChangeText={name => this.setState({name})}
            placeholder={this.props.my_user.me.name || 'Name'}
            placeholderTextColor="#fff"
            keyboardType="default"
            secureTextEntry={true}
            returnKeyType="done"
            // value={this.state.zipCode}
          />
          <TextInput
            style={{
              color: '#fff',
              height: 30,
              width: 200,
              textAlign: 'left',
              marginTop:5,
              marginBottom:10,
              borderColor: 'gray',
              borderBottomWidth: 1,
            }}
            onChangeText={email => this.setState({email})}
            placeholder={this.props.my_user.me.email|| 'Email'}
            placeholderTextColor="#fff"
            keyboardType="default"
            secureTextEntry={true}
            returnKeyType="done"
            // value={this.state.zipCode}
          />
          <Dropdown
              label='Crew Type'
              data={typesOfCrews}
              containerStyle={{
                // height: 10,
                width: 200,
                marginBottom: 10,
              }}
              
              baseColor={'#ffffff'}
              textColor={'#000000'}
              itemColor={'#000000'}
              value={this.state.crew_type || my_user.me.crew_type}
              onChangeText={arg => {
                this.setState({crew_type:arg})
              }}
            />
          <TextInput
            style={{
              color: '#fff',
              height: 30,
              width: 200,
              textAlign: 'left',
              marginTop:10,
              marginBottom:10,
              borderColor: 'gray',
              borderBottomWidth: 1,
            }}
            onChangeText={crew => this.setState({crew})}
            placeholder={this.props.my_user.me.crew || 'Crew'}
            placeholderTextColor="#fff"
            keyboardType="default"
            secureTextEntry={true}
            returnKeyType="done"
            // value={this.state.zipCode}
          />
          <TextInput
            style={{
              color: '#fff',
              height: 30,
              width: 200,
              textAlign: 'left',
              marginTop:10,
              marginBottom:10,
              borderColor: 'gray',
              borderBottomWidth: 1,
            }}
            onChangeText={zipcode => this.setState({zipcode})}
            placeholder={this.props.my_user.me.zipcode || 'Zipcode'}
            placeholderTextColor="#fff"
            keyboardType="default"
            secureTextEntry={true}
            returnKeyType="done"
            // value={this.state.zipCode}
          />
         
          
            <TouchableOpacity
              style={{
                backgroundColor: '#fff',
                width: 130,
                height: 50,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
                marginBottom: 20,
              }}
              onPress={()=>this.updateUser()}
            >
              <Text style={{ color: '#333', fontSize: 18, fontWeight: 'bold' }}>
                SUBMIT
              </Text>
            </TouchableOpacity>

          <TouchableHighlight
                onPress={()=>this.props.onClose()}>
                <Text style={{color:"white"}}>Go Back</Text>
           </TouchableHighlight>
           
            </View>
            </KeyboardAvoidingView>
        </ScrollView>
      </Modal>
    );
  }
}
