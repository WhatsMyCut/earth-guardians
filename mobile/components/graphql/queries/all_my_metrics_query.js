import gql from 'graphql-tag';


export const ALL_MY_METRICS = gql`
 {
  me{
    id
    username
    name
    phone
    crew
    email
    zipcode
    community_events{
        id
        number_of_people
        type
    }
    recent_actions{
        id
        action{
            id
            points
            carbon_dioxide
            water
            waste
        }
    }
  }
}
`