import CardSetPanel from "./CardSetPanel";
import * as React from 'react';
import {useQuery} from "react-apollo-hooks";
import {CardSet} from "../../generated/graphql";
import {QUERY_GET_SETS} from "./query";

type Props = {
    setCurrentSet: (set: CardSet) => void;
}
const Preview: React.FC<Props> = ({ setCurrentSet }) => {
    const [cardSets, setSets] = React.useState<CardSet[]>([]);
    const randomSetsQuery = useQuery(QUERY_GET_SETS);

    React.useEffect(() => {
        const refetch = async () => {
            await randomSetsQuery.refetch();

            // @ts-ignore
            if (randomSetsQuery.data) {
                setSets(randomSetsQuery.data.randomSets || []);
            }
        };

        refetch();
    }, [randomSetsQuery]);

    return (
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            { cardSets.map(set => <CardSetPanel setCurrentSet={setCurrentSet} cardSet={set}/>)}
        </div>
    )
};

export default Preview;
