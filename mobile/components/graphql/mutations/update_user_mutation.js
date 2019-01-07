import gql from 'graphql-tag';



export const UPDATE_USER = gql`
 mutation($id:ID!, $username: String, $email: String, $name:String, $crew: String, $zipcode:String!){
  updateUser(
        where:{
            id:$id
            }, 
        data:{
                username: $username,
                phone: $username,
                name: $name,
                email: $email,
                crew: $crew,
                zipcode:$zipcode
            }){
      id
  }
}

`