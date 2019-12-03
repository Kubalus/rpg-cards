import {CardSet} from "../../generated/graphql";
import CardSetPanel from "./CardSetPanel";
import * as React from 'react';

// @ts-ignore
const getCardSets = (): CardSet[] => {};

const Preview: React.FC = () => {
    const cardSets = getCardSets();

    return (
        <div>
            { cardSets.map(set => <CardSetPanel cardSet={set}/>)}
        </div>
    )
};

export default Preview;
