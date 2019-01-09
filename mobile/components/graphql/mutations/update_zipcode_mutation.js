import gql from 'graphql-tag';



export const UPDATE_ZIPCODE = gql`
 mutation($id:ID!, $zipcode:String!){
  updateUser(
        where:{
            id:$id
            }, 
        data:{
                zipcode:$zipcode
            }){
      id
      zipcode
  }
}

`