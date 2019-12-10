import * as React from 'react';
import './CardComponent.css';
import {Card, CardType, useVoteCardMutation} from "../generated/graphql";
import {BookOpen, Frown, Heart, Key, MapPin} from "react-feather";
import {Fade, IconButton, Typography} from '@material-ui/core';
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import {toast} from "react-toastify";
import {useApolloClient, useMutation} from "react-apollo-hooks";
import './CardPreview.css';
import {QUERY_VOTE_SET} from "../Pages/Preview/query";
import {QUERY_VOTE_CARD} from "./SaveForm/query";

type Props = {
    card: Card;
    score: number;
}

const CardPreview: React.FC<Props> =
    ({ card: { imageURL = '', title = '', type, id, author}, score }) => {
    const [voted, setVoted] = React.useState(false);
    const [isVoteVisible, setVoteVisibility] = React.useState(false);

    const handleEnter = () => setVoteVisibility(true);
    const handleLeave = () => setVoteVisibility(false);

    const [voteOnCard] = useMutation(QUERY_VOTE_CARD);

    const handleClickVote = async (e: React.MouseEvent<SVGSVGElement>) => {
        e.stopPropagation();
        if (voted) {
            toast.error(`Zagłosowałeś już na kartę ${title}!`);
        } else {
            await voteOnCard({ variables: { id } });
            toast.info(`Zagłosowano na kartę ${title}`);
            setVoted(true);
        }
    };

    return (
        <div className='Card__Container__Container'>
            <div
                className='WaitingCardInfo'
            >
                <Typography>Autor: {author}</Typography>
                <Typography>{score} punktów</Typography>
            </div>
            <div className='Card__Container'>
                <div className={!!imageURL ? 'Card' : 'Card Card__Backface'} style={{backgroundImage: imageURL && `url(${imageURL})`}}>
                    <div className='Card__Title__Container'/>
                    <div className='Card__Title'>
                        {title}
                    </div>
                </div>
            </div>
            <div className='Card__Symbol' onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
                <Fade in={!isVoteVisible}>
                    <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', justifyContent: 'center', alignItems: 'center' }}>
                        {type === CardType.Place && <MapPin />}
                        {type === CardType.Antagonist && <Frown />}
                        {type === CardType.Item && <Key />}
                        {type === CardType.Companion && <Heart />}
                        {type === CardType.Genre && <BookOpen />}
                    </div>
                </Fade>
                <Fade in={isVoteVisible}>
                    <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', justifyContent: 'center', alignItems: 'center' }}>
                        <IconButton>
                            <ThumbUpIcon onClick={handleClickVote} color={!voted ? "disabled" : "primary"}/>
                        </IconButton>
                    </div>
                </Fade>
            </div>
        </div>
    );
};

export default CardPreview;