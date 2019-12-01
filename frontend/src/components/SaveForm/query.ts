import gql from 'graphql-tag';

export const QUERY_RANDOM_SET = gql`
    query RandomSet {
        randomCards {
            title
            imageURL
        }
    }
`;