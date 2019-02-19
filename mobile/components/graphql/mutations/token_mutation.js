import gql from 'graphql-tag';

export const TOKEN = gql`
	mutation($token: String) {
		tokenize(token: $token) {
			token
		}
	}
`;
