import gql from 'graphql-tag';


export const ALL_ACTION_CATEGORIES = gql`
{
  actionCategories{
    id
    name
    primary_image
    video_url
  }
}

`