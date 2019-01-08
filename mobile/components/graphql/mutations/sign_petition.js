import gql from 'graphql-tag';



export const SIGN_PETITION = gql`
mutation($id: ID!, $petition_id: ID!){
 updateUser(where:{ 
   id:$id
 }, 
   data:{
     petitions_signed:{
       connect:{
         id:$petition_id
       }
     }
   }
 ){
   id
 }
}
`

export const UNSIGN_PETITION = gql`
mutation($id: ID!, $petition_id: ID!){
 updateUser(where:{ 
   id:$id
 }, 
   data:{
     petitions_signed:{
       disconnect:{
         id:$petition_id
       }
     }
   }
 ){
   id
 }
}
`