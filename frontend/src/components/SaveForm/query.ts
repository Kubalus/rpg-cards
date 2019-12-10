import gql from 'graphql-tag';

export const QUERY_RANDOM_SET = gql`
    query RandomSet {
        randomCards {
            title
            imageURL
            type
            id
        }
    }
`;

export const QUERY_ADD_SET = gql`
    mutation AddSet(
      $title: String!,
      $author: String!,
      $genreCard: ID!,
      $antagonistCard: ID!,
      $itemCard: ID!,
      $placeCard: ID!,
      $companionCard: ID!,
    ) {
        addSet(title: $title, author: $author,
        genreCard: $genreCard,
        antagonistCard: $antagonistCard,
        itemCard: $itemCard,
        placeCard: $placeCard,
        companionCard: $companionCard)
    }
`;

export const QUERY_ADD_CARD = gql`
    mutation AddCard(
      $title: String!,
      $author: String!,
      $type: String!,
      $imageURL: String!
    ) {
        addCard(
            title: $title,
            cardType: $type,
            imageURL: $imageURL,
            author: $author
        )
    }
`;

export const QUERY_WAITING_CARDS = gql`
query WaitingCards {
    randomWaitingCards(number: 999) {
        card {
            title
            imageURL
            author
            type
            id
        }
        score
    }
}`;

export const QUERY_VOTE_CARD = gql`
    mutation VoteCard($id: ID!) {
        voteCard(card: $id)
    }
`;
