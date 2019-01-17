import gql from 'graphql-tag';


export const MY_ACTIONS_QUERY = gql`
{
  myAvailableActions{
  id
    action{
      id
      primary_image
      action_taken_description
      carbon_dioxide
      water
      waste
      schedule
    }
   createdAt
  }
  
}
`


