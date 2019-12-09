import * as React from 'react';
import './CardComponent.css';
import { Card } from "../generated/graphql";

type Props = {
    card: Card;
}

const CardRead: React.FC<Props> =
    ({ card: { imageURL = '', title = '' } } ) => {
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
                    ?
                </div>
            </div>
        );
    };

export default CardRead;
