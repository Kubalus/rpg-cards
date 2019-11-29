import React from 'react';
import './Card.css';
import {CardData} from "../Choosing";

type Props = {
    card: CardData;
    cardRef: React.Ref<any>;
    symbolRef: React.Ref<any>;
    Icon: React.ComponentType;
}

const Card: React.FC<Props> = ({ card: { imageURL, isChosen, title }, cardRef, symbolRef, Icon }) => {
    return (
        <div className='Card__Container__Container'>
            <div className='Card__Container' ref={cardRef}>
                <div className={isChosen ? 'Card' : 'Card Card__Backface'}>
                    <div className='Card__Title__Container'/>
                    <div className='Card__Title'>
                        {title}
                    </div>
                </div>
            </div>
            <div className='Card__Symbol' ref={symbolRef}>
                <Icon />
            </div>
        </div>
    );
};

export default Card;
