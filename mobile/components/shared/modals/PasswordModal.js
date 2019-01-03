import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal, 
  Alert,
  TouchableHighlight,
  KeyboardAvoidingView
} from 'react-native';
import NavigationService from '../../../navigation/navigationService';
import graphql from '../../hoc/graphql';
import { SIGNUP } from '../../graphql/mutations/signup_mutation';
import { LOGIN } from '../../graphql/mutations/login_mutation';
import { USER_EXISTS_QUERY } from '../../graphql/queries/UserExistsQuery';
import { } from '../../../store/Store';


@graphql(SIGNUP, {
    name:'signup_mutation'
})
@graphql(LOGIN, {
  name:"login_mutation"
})
@graphql(USER_EXISTS_QUERY, {
  name:"user_exists_query",
  options: (props) => {
    const username = props.username
    return {
      variables: {
        username
      }
    }
  }
})
export default class PasswordModal extends React.Component {
  state = { password:'', confirmPassword:'', passwordError: null, existsPassword:null, standardError:null };
  
  constructor(props){
      super(props);
      console.log('this.signupmutation', this.props.signup_mutation);
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  signup = () =>{
      const { password, confirmPassword} = this.state;
      if(password === confirmPassword){
          console.log('passwords matched');
          NavigationService.navigate('Main');
      } else{
        this.setState({passwordError: "Passwords do not Match"});
      }
  }

  signIn = () => {
    const { login_mutation, username } = this.props;
    const { existsPassword } = this.state;
    if(existsPassword && username){
      login_mutation({variables:{username:username, password:existsPassword}}).then(res =>{
        console.log('you received some data from login', res);
        this.props.togglePasswordModal();
      })
    } else{
      this.setState({standardError: "You must enter your username and password..."})
    }
  }

  loadingModalContent(){
    return <Modal
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
  }

  _userExistsContent(){
    return <Modal
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
      Welcome Back!
    </Text>
    {this.state.passwordError && (
          <Text style={{
              color: 'red',
              marginHorizontal: 20,
              fontSize: 18,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>{this.state.passwordError}</Text>
      )}
       {this.state.standardError && (
              <Text style={{
                color: 'red',
                marginHorizontal: 20,
                fontSize: 18,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>{this.state.standardError}</Text>
            )}
    <TextInput
      style={{
        color: '#fff',
        height: 30,
        width: 200,
        textAlign: 'left',
        marginVertical: 20,
        borderColor: 'gray',
        borderBottomWidth: 1,
      }}
      onChangeText={password => this.setState({ existsPassword:password, passwordError:null, standardError:null })}
      placeholder="Password"
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
        marginBottom:20
      }}
      onPress={this.signIn}
    >
      <Text style={{ color: '#333', fontSize: 18, fontWeight: 'bold' }}>
        Sign In
      </Text>
    </TouchableOpacity>

    <TouchableHighlight
          onPress={this.props.togglePasswordModal}>
          <Text style={{color:"white"}}>Go Back</Text>
     </TouchableHighlight>
     
    
  </View>
  </View>
  </Modal>
  }

  render() {
    console.log('Community Event Modal', this.props, this.state);
    const { goBack, user_exists_query } = this.props;
    if(user_exists_query.loading) {
      return this.loadingModalContent()
    } 

    if(user_exists_query.user){
      if(user_exists_query.user.id){
        return this._userExistsContent();
      }
    }
   
    return (
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
            Create a Password
          </Text>
          {this.state.passwordError && (
                <Text style={{
                    color: 'red',
                    marginHorizontal: 20,
                    fontSize: 18,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>{this.state.passwordError}</Text>
            )}
            {this.state.standardError && (
              <Text style={{
                color: 'red',
                marginHorizontal: 20,
                fontSize: 18,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>{this.state.standardError}</Text>
            )}
          <TextInput
            style={{
              color: '#fff',
              height: 30,
              width: 200,
              textAlign: 'left',
              marginVertical: 20,
              borderColor: 'gray',
              borderBottomWidth: 1,
            }}
            onChangeText={password => this.setState({ password, passwordError:null })}
            placeholder="Password"
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
              marginTop:20,
              marginBottom:10,
              borderColor: 'gray',
              borderBottomWidth: 1,
            }}
            onChangeText={confirmPassword => this.setState({ confirmPassword, passwordError:null })}
            placeholder="Confirm Password"
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
              marginBottom:20
            }}
            onPress={this.signup}
          >
            <Text style={{ color: '#333', fontSize: 18, fontWeight: 'bold' }}>
              SUBMIT
            </Text>
          </TouchableOpacity>

          <TouchableHighlight
                onPress={this.props.togglePasswordModal}>
                <Text style={{color:"white"}}>Go Back</Text>
           </TouchableHighlight>
           
          
        </View>
        </View>
        </Modal>
    );
  }
}
