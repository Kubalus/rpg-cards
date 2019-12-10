import {useApolloClient} from "react-apollo-hooks";
import {Card, useWaitingCardsQuery} from "../../generated/graphql";
import CardPreview from "../../components/CardPreview";
import * as React from 'react';
import './Waiting.css';

type CardWithScore = {
    card: Card;
    score: number;
}

export const Waiting: React.FC = () => {
    const client = useApolloClient();
    const waitingCardsQuery = useWaitingCardsQuery({ client });
    const [cards, setCards] = React.useState<CardWithScore[]>([]);

    React.useEffect(() => {
        // const refetch = async () => {
        //     await waitingCardsQuery.refetch();
        //
        //
        // };
        //
        // refetch();

        if (waitingCardsQuery.data) {
            // @ts-ignore
            setCards(waitingCardsQuery.data.randomWaitingCards || []);
        }
    }, [waitingCardsQuery]);

    return (
        <div className='WaitingContainer'>
            {
                cards.map(card => card && <CardPreview card={card.card} score={card.score} />)
            }
        </div>
    )
};