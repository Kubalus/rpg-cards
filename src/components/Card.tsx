import React from 'react';
import './Card.css';
import {User} from 'react-feather';

type Props = {
    isChosen: boolean;
    cardRef: React.Ref<any>;
}

const Card: React.FC<Props> = ({ isChosen, cardRef }) => {
    return (
        <div ref={cardRef} className='Card__Container__Container'>
            <div className='Card__Container'>
                <div className={isChosen ? 'Card' : 'Card Card__Backface'}>
                    <div className='Card__Title__Container'/>
                    <div className='Card__Title'>
                        Karta
                    </div>
                </div>
            </div>
            <div className='Card__Symbol'>
                <User/>
            </div>
        </div>
    );
};

export default Card;
