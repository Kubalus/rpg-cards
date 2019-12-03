import {ExpansionPanel, Typography, ExpansionPanelDetails, Grid, IconButton} from "@material-ui/core";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import React from "react";
import {CardSet} from "../../generated/graphql";

const CardName: React.FC<{ name: string; category: string }> = ({ name, category }) => (
    <Grid item style={{display: 'flex', flexDirection: 'column'}}>
        <Typography style={{fontSize: 8}} color={"textSecondary"}>{category}</Typography>
        <Typography style={{fontSize: 15}}>{name}</Typography>
    </Grid>
);

type Props = {
    cardSet: CardSet;
}

const CardSetPanel: React.FC<Props> = ({ cardSet: { id, title, antagonistCard, author, companionCard, genreCard, itemCard, placeCard, score }}) => {
    return <ExpansionPanel style={{width: '95%'}}>
        <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
        >
            <Grid container spacing={1}>
                <Grid container item xs={9} spacing={1}>
                    <CardName name={'asdsadasd'} category={"blebel"}/>
                </Grid>
                <Grid container item xs={2} spacing={1}>
                    <IconButton>
                        <ThumbUpIcon color={"primary"}/>
                    </IconButton>
                    <IconButton>
                        <ThumbDownIcon color={"error"}/>
                    </IconButton>
                    <IconButton>
                        <VisibilityIcon color={"action"}/>
                    </IconButton>
                </Grid>
            </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <Grid item>
                <Typography color={"textSecondary"}>Name</Typography>
            </Grid>
            <Grid item>
                <Typography color={"textSecondary"}>Author</Typography>
            </Grid>
        </ExpansionPanelDetails>
    </ExpansionPanel>
};

export default CardSetPanel;
