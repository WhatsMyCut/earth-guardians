import gql from 'graphql-tag';

export const SIGNUP = gql`
	mutation($username: String!, $password: String!, $token: String, $country_name:String, $country: String, $state: String, $zipcode: String) {
		signup(username: $username, password: $password, token: $token, zipcode: $zipcode, country: $country, country_name: $country_name, state: $state) {
			token
			user {
				id
				username
				phone
			}
		}
	}
`;
