import gql from 'graphql-tag';


export const ALL_PETITIONS = gql`
{
  petitions(where:{active:true}, orderBy:order_ASC){
    id
    title
    primary_image
    order
    active
    external_url
    video_url
    short_description
    body
  }
}
`