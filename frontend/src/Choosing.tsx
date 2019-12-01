import React, {useRef, useState} from 'react';
import Card from "./components/Card";
import './Choosing.css';
import {Button} from '@material-ui/core';
import {animateCardRotation} from "./animations";
import {BookOpen, Frown, Heart, Key, MapPin} from 'react-feather';
import SaveForm from "./components/SaveForm/SaveForm";

export type CardData = {
    title: string;
    isChosen: boolean;
    imageURL: string;
}

const initialCards: CardData[] = [
    { title: 'Miejsce', isChosen: false, imageURL: '' },
    { title: 'Antagonista', isChosen: false, imageURL: '' },
    { title: 'Przedmiot', isChosen: false, imageURL: '' },
    { title: 'Towarzysz', isChosen: false, imageURL: '' },
    { title: 'Gatunek', isChosen: false, imageURL: '' },
];

const Choosing: React.FC = () => {
    const [cards, setCards] = useState<CardData[]>(initialCards);
    const cardElts = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
    const symbolElts = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
    const icons = [MapPin, Frown, Key, Heart, BookOpen];

    const animate = (idx: number) => {
        animateCardRotation(cardElts[idx].current!, symbolElts[idx].current!,
            () => setCards(prev => {
                const next = [...prev];
                next[idx].isChosen = true;
                return next;
            }), idx);
    };

    const handleClick = () => {
        cardElts.forEach((el, idx) => {
            animate(idx);
        })
    };

    return (
        <div className='Choosing'>
            <div className='Choosing__Cards'>
                {
                    cardElts.map((el, idx) =>
                        <Card card={cards[idx]} key={idx} cardRef={el} symbolRef={symbolElts[idx]} Icon={icons[idx]}/>
                    )
                }
            </div>
            <Button variant="contained" color="primary" onClick={handleClick}>
                LOSUJ
            </Button>
            <SaveForm />
        </div>
    );
};

export default Choosing;
