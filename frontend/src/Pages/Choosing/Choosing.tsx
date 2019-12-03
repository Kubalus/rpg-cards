import React, {useRef, useState} from 'react';
import CardComponent from "../../components/CardComponent";
import './Choosing.css';
import {Button} from '@material-ui/core';
import {useApolloClient} from "react-apollo-hooks";
import {initialCards, RandomCardsSet} from "./utils";
import {animateCardRotation} from "../../animations";
import {Card, useRandomSetQuery} from "../../generated/graphql";
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

            console.log(randomCards);

            // @ts-ignore
            setCards(({ placeCard, genreCard, antagonistCard, companionCard, itemCard }) => ({
                // placeCard: pickByType(CardType.Place)(randomCards),
                // genreCard: pickByType(CardType.Genre)(randomCards),
                // itemCard: pickByType(CardType.Item)(randomCards),
                // antagonistCard: pickByType(CardType.Antagonist)(randomCards),
                // companionCard: pickByType(CardType.Companion)(randomCards),
                placeCard: { ...placeCard, ...randomCards[0] },
                genreCard: { ...genreCard, ...randomCards[3] },
                itemCard: { ...itemCard, ...randomCards[4] },
                antagonistCard: { ...antagonistCard, ...randomCards[2] },
                companionCard: { ...companionCard, ...randomCards[1] },
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
            <SaveForm/>
        </>
    );
};

export default Choosing;
