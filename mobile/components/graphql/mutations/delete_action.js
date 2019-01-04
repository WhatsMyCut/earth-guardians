import gql from 'graphql-tag';


export const DELETE_ACTION = gql`
 mutation($id: ID!){
  deleteEventAction(
    where:{
      id:$id
    }
  ){
    id
  }
}
`




