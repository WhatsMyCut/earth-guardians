import gql from 'graphql-tag';


export const USER_EXISTS_QUERY = gql`
 query($username:String){
    user(where:{username:$username}){
      id
      username
    }
}

`