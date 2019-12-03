import React, {useRef, useState} from 'react';
import CardComponent from "../../components/CardComponent";
import './Choosing.css';
import {Button} from '@material-ui/core';
import {useApolloClient} from "react-apollo-hooks";
import {initialCards, findByType, RandomCardsSet} from "./utils";
import {animateCardRotation} from "../../animations";
import {Card, CardType, useRandomSetQuery} from "../../generated/graphql";
import SaveForm from "../../components/SaveForm/SaveForm";
import _ from "lodash/fp";

const Choosing: React.FC = () => {
    const [cards, setCards] = useState<RandomCardsSet>(initialCards);

    const cardElts = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
    const symbolElts = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

    const client = useApolloClient();

    const animate = (idx: number) => {
        animateCardRotation(cardElts[idx].current!, symbolElts[idx].current!, idx);
    };

    const randomSetQuery = useRandomSetQuery({client});

    const handleClick = async () => {
        await randomSetQuery.refetch();
        const { data } = randomSetQuery;
        if (data && data.randomCards) {
            const randomCards = (data.randomCards as Card[]);
            // @ts-ignore
            setCards(({ placeCard, genreCard, antagonistCard, companionCard, itemCard }) => ({
                placeCard: {...placeCard, ...findByType(CardType.Place)(randomCards)},
                genreCard: {...genreCard, ...findByType(CardType.Genre)(randomCards)},
                itemCard: {...itemCard, ...findByType(CardType.Item)(randomCards)},
                antagonistCard: {...antagonistCard, ...findByType(CardType.Antagonist)(randomCards)},
                companionCard: { ...companionCard, ...findByType(CardType.Companion)(randomCards)},
            }))
        }

        cardElts.forEach((el, idx) => {
            animate(idx);
        })
    };

    return (
        <>
            <div className='Choosing__Cards'>
                {
                    _.values(cards).map((card, idx) =>
                        <CardComponent card={card} key={idx} cardRef={cardElts[idx]} symbolRef={symbolElts[idx]}/>
                    )
                }
            </div>
            <Button variant="contained" color="primary" onClick={handleClick} style={{margin: 30}}>
                LOSUJ
            </Button>
            <SaveForm cardSet={cards}/>
        </>
    );
};

export default Choosing;
