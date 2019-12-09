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
            }
            antagonistCard {
                title
                author
                imageURL
            }
            itemCard {
                title
                author
                imageURL
            }
            placeCard {
                title
                author
                imageURL
            }
            companionCard {
                title
                author
                imageURL
            }
        }
    }
`;

export const QUERY_VOTE_SET = gql`
    mutation VoteSet($id: ID!) {
        voteSet(set: $id)
    }
`;

