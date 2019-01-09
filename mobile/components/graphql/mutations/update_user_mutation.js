import gql from 'graphql-tag';



export const UPDATE_USER = gql`
 mutation($id:ID!, $username: String, $email: String, $name:String, $crew: String,$crew_type:String, $zipcode:String){
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
                crew_type: $crew_type,
                zipcode:$zipcode
            }){
      id
  }
}

`