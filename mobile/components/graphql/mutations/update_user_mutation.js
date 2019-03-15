import gql from 'graphql-tag';



export const UPDATE_USER = gql`
 mutation($id:ID!,$token:String, $email: String, $name:String, $crew: String,$crew_type:String, $zipcode:String, $photo:String){
  updateUser(
        where:{
            id:$id
            }, 
        data:{
                name: $name,
                email: $email,
                crew: $crew,
                crew_type: $crew_type,
                photo: $photo,
                token: $token,
                zipcode:$zipcode
            }){
      id
  }
}

`