import gql from 'graphql-tag';


export const SIGNUP = gql`
 mutation($username: String!, $password: String!){
  signup(username:$username, password:$password, name:"Daniel"){
      token
      user{
        id
        username
        phone
      }
  }
}

`