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
