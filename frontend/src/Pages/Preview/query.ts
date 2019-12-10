import gql from 'graphql-tag';

export const QUERY_GET_SETS = gql`
    query RandomSets {
        randomSets(number: 99) {
            id
            title
            author
            score
            genreCard {
                title
                author
                imageURL
                type
            }
            antagonistCard {
                title
                author
                imageURL
                type
            }
            itemCard {
                title
                author
                imageURL
                type
            }
            placeCard {
                title
                author
                imageURL
                type
            }
            companionCard {
                title
                author
                imageURL
                type
            }
        }
    }
`;

export const QUERY_VOTE_SET = gql`
    mutation VoteSet($id: ID!) {
        voteSet(set: $id)
    }
`;

