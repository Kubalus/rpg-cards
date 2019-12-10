import {ExpansionPanel, ExpansionPanelDetails, Grid, IconButton, Typography} from "@material-ui/core";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import React, {useState} from "react";
import {CardSet} from "../../generated/graphql";
import {useMutation, useQuery} from "react-apollo-hooks";
import {QUERY_VOTE_SET} from "./query";
import { toast } from "react-toastify";


const CardName: React.FC<{ name: string; category: string }> = ({ name, category }) => (
    <Grid item style={{display: 'flex', flexDirection: 'column'}}>
        <Typography style={{fontSize: 8}} color={"textSecondary"}>{category}</Typography>
        <Typography style={{fontSize: 15}}>{name}</Typography>
    </Grid>
);

type Props = {
    cardSet: CardSet;
    setCurrentSet: (set: CardSet) => void;
}

const CardSetPanel: React.FC<Props> = ({ setCurrentSet, cardSet: { id, title, antagonistCard, author, companionCard, genreCard, itemCard, placeCard, score }}) => {
    const [setVote] = useMutation(QUERY_VOTE_SET);
    const [voted, setVoted] = useState(false);

    const handleClickVote = async (e: React.MouseEvent<SVGSVGElement>) => {
        e.stopPropagation();
        if (voted) {
            toast.error(`Zagłosowałeś już na zestaw ${title}!`);
        } else {
            await setVote({ variables: { id } });
            toast.info(`Zagłosowano na zestaw ${title}`);
            setVoted(true);
        }
    };

    const handleClickPreview = async (e: React.MouseEvent<SVGSVGElement>) => {
        e.stopPropagation();
        setCurrentSet({ id, title, antagonistCard, companionCard, genreCard, placeCard, itemCard, author, score });
    };

    return <ExpansionPanel style={{width: '95%'}}>
        <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
        >
            <Grid container spacing={1}>
                <Grid container item xs={9} spacing={1}>
                    <CardName name={placeCard.title} category={'Miejsce'}/>
                    <CardName name={genreCard.title} category={'Gatunek'}/>
                    <CardName name={itemCard.title} category={'Przedmiot'}/>
                    <CardName name={companionCard.title} category={'Towarzysz'}/>
                    <CardName name={antagonistCard.title} category={'Antagonista'}/>
                </Grid>
                <Grid container item xs={2} spacing={1}>
                    <IconButton>
                        <ThumbUpIcon onClick={handleClickVote} color={!voted ? "disabled" : "primary"}/>
                    </IconButton>
                    <IconButton>
                        <VisibilityIcon onClick={handleClickPreview} color={"action"}/>
                    </IconButton>
                </Grid>
            </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <Grid container justify={"space-between"}>
                <Grid item>
                    <Typography color={"textSecondary"}>{title}: </Typography>
                    <Typography color={"textPrimary"}>{score} punktów</Typography>
                </Grid>
                <Grid item>
                    <Typography color={"textSecondary"}>{author}</Typography>
                </Grid>
            </Grid>
        </ExpansionPanelDetails>
    </ExpansionPanel>
};

export default CardSetPanel;
