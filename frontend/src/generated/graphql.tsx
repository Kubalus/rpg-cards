import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};


export type Card = {
   __typename?: 'Card',
  id: Scalars['ID'],
  title: Scalars['String'],
  author?: Maybe<Scalars['String']>,
  imageURL: Scalars['String'],
  type: CardType,
};

export type CardSet = {
   __typename?: 'CardSet',
  id: Scalars['ID'],
  title: Scalars['String'],
  author?: Maybe<Scalars['String']>,
  genreCard: Card,
  antagonistCard: Card,
  itemCard: Card,
  placeCard: Card,
  companionCard: Card,
  score?: Maybe<Scalars['Int']>,
};

export enum CardType {
  Genre = 'GENRE',
  Antagonist = 'ANTAGONIST',
  Item = 'ITEM',
  Place = 'PLACE',
  Companion = 'COMPANION'
}

export type Date = {
   __typename?: 'Date',
  year: Scalars['Int'],
  month: Scalars['Int'],
  day: Scalars['Int'],
};

export type Mutation = {
   __typename?: 'Mutation',
  addCard?: Maybe<Scalars['Int']>,
  addSet?: Maybe<Scalars['Int']>,
  voteCard?: Maybe<Scalars['Int']>,
  voteSet?: Maybe<Scalars['Int']>,
};


export type MutationAddCardArgs = {
  title: Scalars['String'],
  cardType: Scalars['String'],
  imageURL: Scalars['String'],
  author: Scalars['String']
};


export type MutationAddSetArgs = {
  title: Scalars['String'],
  author?: Maybe<Scalars['String']>,
  genreCard: Scalars['ID'],
  antagonistCard: Scalars['ID'],
  itemCard: Scalars['ID'],
  placeCard: Scalars['ID'],
  companionCard: Scalars['ID']
};


export type MutationVoteCardArgs = {
  card: Scalars['ID']
};


export type MutationVoteSetArgs = {
  set: Scalars['ID']
};

export type Query = {
   __typename?: 'Query',
  randomCards?: Maybe<Array<Maybe<Card>>>,
  randomSets?: Maybe<Array<Maybe<CardSet>>>,
  randomWaitingCards?: Maybe<Array<Maybe<WaitingCard>>>,
};


export type QueryRandomSetsArgs = {
  number: Scalars['Int']
};


export type QueryRandomWaitingCardsArgs = {
  number: Scalars['Int']
};

export type WaitingCard = {
   __typename?: 'WaitingCard',
  card: Card,
  score: Scalars['Int'],
  date: Date,
};

export type RandomSetQueryVariables = {};


export type RandomSetQuery = (
  { __typename?: 'Query' }
  & { randomCards: Maybe<Array<Maybe<(
    { __typename?: 'Card' }
    & Pick<Card, 'title' | 'imageURL' | 'type' | 'id'>
  )>>> }
);

export type AddSetMutationVariables = {
  title: Scalars['String'],
  author: Scalars['String'],
  genreCard: Scalars['ID'],
  antagonistCard: Scalars['ID'],
  itemCard: Scalars['ID'],
  placeCard: Scalars['ID'],
  companionCard: Scalars['ID']
};


export type AddSetMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addSet'>
);

export type AddCardMutationVariables = {
  title: Scalars['String'],
  author: Scalars['String'],
  type: Scalars['String'],
  imageURL: Scalars['String']
};


export type AddCardMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addCard'>
);


export const RandomSetDocument = gql`
    query RandomSet {
  randomCards {
    title
    imageURL
    type
    id
  }
}
    `;
export type RandomSetComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<RandomSetQuery, RandomSetQueryVariables>, 'query'>;

    export const RandomSetComponent = (props: RandomSetComponentProps) => (
      <ApolloReactComponents.Query<RandomSetQuery, RandomSetQueryVariables> query={RandomSetDocument} {...props} />
    );
    
export type RandomSetProps<TChildProps = {}> = ApolloReactHoc.DataProps<RandomSetQuery, RandomSetQueryVariables> | TChildProps;
export function withRandomSet<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  RandomSetQuery,
  RandomSetQueryVariables,
  RandomSetProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, RandomSetQuery, RandomSetQueryVariables, RandomSetProps<TChildProps>>(RandomSetDocument, {
      alias: 'randomSet',
      ...operationOptions
    });
};

/**
 * __useRandomSetQuery__
 *
 * To run a query within a React component, call `useRandomSetQuery` and pass it any options that fit your needs.
 * When your component renders, `useRandomSetQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRandomSetQuery({
 *   variables: {
 *   },
 * });
 */
export function useRandomSetQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RandomSetQuery, RandomSetQueryVariables>) {
        return ApolloReactHooks.useQuery<RandomSetQuery, RandomSetQueryVariables>(RandomSetDocument, baseOptions);
      }
export function useRandomSetLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RandomSetQuery, RandomSetQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<RandomSetQuery, RandomSetQueryVariables>(RandomSetDocument, baseOptions);
        }
export type RandomSetQueryHookResult = ReturnType<typeof useRandomSetQuery>;
export type RandomSetLazyQueryHookResult = ReturnType<typeof useRandomSetLazyQuery>;
export type RandomSetQueryResult = ApolloReactCommon.QueryResult<RandomSetQuery, RandomSetQueryVariables>;
export const AddSetDocument = gql`
    mutation AddSet($title: String!, $author: String!, $genreCard: ID!, $antagonistCard: ID!, $itemCard: ID!, $placeCard: ID!, $companionCard: ID!) {
  addSet(title: $title, author: $author, genreCard: $genreCard, antagonistCard: $antagonistCard, itemCard: $itemCard, placeCard: $placeCard, companionCard: $companionCard)
}
    `;
export type AddSetMutationFn = ApolloReactCommon.MutationFunction<AddSetMutation, AddSetMutationVariables>;
export type AddSetComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddSetMutation, AddSetMutationVariables>, 'mutation'>;

    export const AddSetComponent = (props: AddSetComponentProps) => (
      <ApolloReactComponents.Mutation<AddSetMutation, AddSetMutationVariables> mutation={AddSetDocument} {...props} />
    );
    
export type AddSetProps<TChildProps = {}> = ApolloReactHoc.MutateProps<AddSetMutation, AddSetMutationVariables> | TChildProps;
export function withAddSet<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddSetMutation,
  AddSetMutationVariables,
  AddSetProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, AddSetMutation, AddSetMutationVariables, AddSetProps<TChildProps>>(AddSetDocument, {
      alias: 'addSet',
      ...operationOptions
    });
};

/**
 * __useAddSetMutation__
 *
 * To run a mutation, you first call `useAddSetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSetMutation, { data, loading, error }] = useAddSetMutation({
 *   variables: {
 *      title: // value for 'title'
 *      author: // value for 'author'
 *      genreCard: // value for 'genreCard'
 *      antagonistCard: // value for 'antagonistCard'
 *      itemCard: // value for 'itemCard'
 *      placeCard: // value for 'placeCard'
 *      companionCard: // value for 'companionCard'
 *   },
 * });
 */
export function useAddSetMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddSetMutation, AddSetMutationVariables>) {
        return ApolloReactHooks.useMutation<AddSetMutation, AddSetMutationVariables>(AddSetDocument, baseOptions);
      }
export type AddSetMutationHookResult = ReturnType<typeof useAddSetMutation>;
export type AddSetMutationResult = ApolloReactCommon.MutationResult<AddSetMutation>;
export type AddSetMutationOptions = ApolloReactCommon.BaseMutationOptions<AddSetMutation, AddSetMutationVariables>;
export const AddCardDocument = gql`
    mutation AddCard($title: String!, $author: String!, $type: String!, $imageURL: String!) {
  addCard(title: $title, cardType: $type, imageURL: $imageURL, author: $author)
}
    `;
export type AddCardMutationFn = ApolloReactCommon.MutationFunction<AddCardMutation, AddCardMutationVariables>;
export type AddCardComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddCardMutation, AddCardMutationVariables>, 'mutation'>;

    export const AddCardComponent = (props: AddCardComponentProps) => (
      <ApolloReactComponents.Mutation<AddCardMutation, AddCardMutationVariables> mutation={AddCardDocument} {...props} />
    );
    
export type AddCardProps<TChildProps = {}> = ApolloReactHoc.MutateProps<AddCardMutation, AddCardMutationVariables> | TChildProps;
export function withAddCard<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddCardMutation,
  AddCardMutationVariables,
  AddCardProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, AddCardMutation, AddCardMutationVariables, AddCardProps<TChildProps>>(AddCardDocument, {
      alias: 'addCard',
      ...operationOptions
    });
};

/**
 * __useAddCardMutation__
 *
 * To run a mutation, you first call `useAddCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCardMutation, { data, loading, error }] = useAddCardMutation({
 *   variables: {
 *      title: // value for 'title'
 *      author: // value for 'author'
 *      type: // value for 'type'
 *      imageURL: // value for 'imageURL'
 *   },
 * });
 */
export function useAddCardMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddCardMutation, AddCardMutationVariables>) {
        return ApolloReactHooks.useMutation<AddCardMutation, AddCardMutationVariables>(AddCardDocument, baseOptions);
      }
export type AddCardMutationHookResult = ReturnType<typeof useAddCardMutation>;
export type AddCardMutationResult = ApolloReactCommon.MutationResult<AddCardMutation>;
export type AddCardMutationOptions = ApolloReactCommon.BaseMutationOptions<AddCardMutation, AddCardMutationVariables>;