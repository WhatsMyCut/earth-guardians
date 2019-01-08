import gql from 'graphql-tag';


export const ALL_PETITIONS = gql`
{
  petitions(where:{active:false}, orderBy:order_ASC){
    id
    title
    primary_image
    order
    active
    short_description
    body
  }
}
`