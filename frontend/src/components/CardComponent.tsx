import React from 'react';
import './CardComponent.css';
import {Card} from "../generated/graphql";
import {getIcon} from "../Pages/Choosing/utils";

type Props = {
    card: Card;
    cardRef?: React.Ref<any>;
    symbolRef?: React.Ref<any>;
}

const CardComponent: React.FC<Props> =
    ({ card: { type, imageURL, title },
        cardRef,
        symbolRef}) => {

        const Icon = getIcon(type) as React.FC;

        return (
        <div className='Card__Container__Container'>
            <div className='Card__Container' ref={cardRef}>
                <div className={!!imageURL ? 'Card' : 'Card Card__Backface'} style={{backgroundImage: imageURL && `url(${imageURL})`}}>
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

export default CardComponent;
