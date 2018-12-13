import gql from 'graphql-tag';


export const ALL_PERSONS_QUERY = gql`
{
  allPersons {
    name
    films {
      director
    }
  }
}

`