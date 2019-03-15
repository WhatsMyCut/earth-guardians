import gql from 'graphql-tag';


export const GET_USER = gql`
 {
  me{
    id
    phone
    name
    email
    username
    crew
    crew_type
    zipcode
    photo
    petitions_signed{
      id
    }
  }
}
`


