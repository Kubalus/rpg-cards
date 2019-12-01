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
    & Pick<Card, 'title' | 'imageURL'>
  )>>> }
);


export const RandomSetDocument = gql`
    query RandomSet {
  randomCards {
    title
    imageURL
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