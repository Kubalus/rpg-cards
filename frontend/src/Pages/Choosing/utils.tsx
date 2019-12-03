import {Card, CardType} from "../../generated/graphql";
import {BookOpen, Frown, Heart, Key, MapPin} from "react-feather";
import _ from "lodash/fp";
import * as React from "react";

export type RandomCardsSet = {
    genreCard : Card;
    antagonistCard : Card;
    itemCard : Card;
    placeCard : Card;
    companionCard : Card;
}

export const initialCards: RandomCardsSet = {
    genreCard: {
        author: '',
        imageURL: '',
        title: 'Gatunek',
        id: '',
        type: CardType.Genre,
        __typename: "Card",
    },
    itemCard: {
        author: '',
        imageURL: '',
        title: 'Przedmiot',
        id: '',
        type: CardType.Item,
        __typename: "Card",
    },
    placeCard: {
        author: '',
        imageURL: '',
        title: 'Miejsce',
        id: '',
        type: CardType.Place,
        __typename: "Card",
    },
    companionCard: {
        author: '',
        imageURL: '',
        title: 'Towarzysz',
        id: '',
        type: CardType.Companion,
        __typename: "Card",
    },
    antagonistCard: {
        author: '',
        imageURL: '',
        title: 'Antagonista',
        id: '',
        type: CardType.Antagonist,
        __typename: "Card",
    }
};

const genreIconMap = new Map<CardType, React.FC>(
    [
        [CardType.Place, () => <MapPin />],
        [CardType.Antagonist, () => <Frown />],
        [CardType.Item, () => <Key />],
        [CardType.Companion, () => <Heart />],
        [CardType.Genre, () => <BookOpen />]
    ]
);

export const getIcon = (type: CardType) => genreIconMap.get(type);

export const findByType = (type: CardType) => _.find((card: Card) => card.type === type);
