import {CardSet} from "../../generated/graphql";
import * as React from 'react';
import {Typography} from "@material-ui/core";
import CardRead from "../../components/CardRead";

type Props = {
    cardSet?: CardSet;
}

export const PreviewSet: React.FC<Props> = ({ cardSet }) => {
    return (<>
        {
            cardSet &&
            (<>
                <Typography>{cardSet.title}</Typography>
                <div className='Choosing__Cards'>
                    <CardRead card={cardSet.placeCard} />
                    <CardRead card={cardSet.genreCard} />
                    <CardRead card={cardSet.itemCard} />
                    <CardRead card={cardSet.companionCard} />
                    <CardRead card={cardSet.antagonistCard} />
                </div>
            </>)
        }
    </>);
};

export default PreviewSet;