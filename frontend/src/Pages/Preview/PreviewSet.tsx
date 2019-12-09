import {CardSet} from "../../generated/graphql";
import * as React from 'react';
import {Typography} from "@material-ui/core";
import CardRead from "../../components/CardRead";
import {BookOpen, Frown, Heart, Key, MapPin} from "react-feather";

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
                    <CardRead card={cardSet.placeCard}>
                        {/*<MapPin />*/}
                    </CardRead>
                    <CardRead card={cardSet.genreCard}>
                        {/*<BookOpen />*/}
                    </CardRead>
                    <CardRead card={cardSet.itemCard}>
                        {/*<Key />*/}
                    </CardRead>
                    <CardRead card={cardSet.companionCard}>
                        {/*<Heart/>*/}
                    </CardRead>
                    <CardRead card={cardSet.antagonistCard}>
                        {/*<Frown/>*/}
                    </CardRead>
                </div>
            </>)
        }
    </>);
};

export default PreviewSet;