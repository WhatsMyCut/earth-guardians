import gql from 'graphql-tag';


export const TAKE_ACTION = gql`
 mutation($id: ID!, $action: ID!){
  createEventAction(
    data:{
      user:{
        connect:{
          id:$id
        }
      }, 
      action:{
        connect:{
          id:$action
        }
      },
      took_action: true
    }
  ){
    id
  }
}
`




