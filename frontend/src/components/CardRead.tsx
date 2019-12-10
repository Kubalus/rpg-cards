import * as React from 'react';
import './CardComponent.css';
import {Card, CardType} from "../generated/graphql";
import {BookOpen, Frown, Heart, Key, MapPin} from "react-feather";

type Props = {
    card: Card;
}

const CardRead: React.FC<Props> =
    ({ card: { imageURL = '', title = '', type } } ) => {
        return (
            <div className='Card__Container__Container'>
                <div className='Card__Container'>
                    <div className={!!imageURL ? 'Card' : 'Card Card__Backface'} style={{backgroundImage: imageURL && `url(${imageURL})`}}>
                        <div className='Card__Title__Container'/>
                        <div className='Card__Title'>
                            {title}
                        </div>
                    </div>
                </div>
                <div className='Card__Symbol'>
                    {type === CardType.Place && <MapPin />}
                    {type === CardType.Antagonist && <Frown />}
                    {type === CardType.Item && <Key />}
                    {type === CardType.Companion && <Heart />}
                    {type === CardType.Genre && <BookOpen />}
                </div>
            </div>
        );
    };

export default CardRead;
