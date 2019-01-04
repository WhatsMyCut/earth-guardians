import gql from 'graphql-tag';


export const MY_ACTIONS_QUERY = gql`
query($id:ID!){
  eventActions(where:{user:{id:$id}, took_action:true}, orderBy:createdAt_ASC){
    id
    took_action
    action{
      primary_image
      action_taken_description
      carbon_dioxide
      water
      waste
    }
  }
}
`


