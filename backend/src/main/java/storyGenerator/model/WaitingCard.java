package storyGenerator.model;

import java.util.Date;
import java.util.UUID;

public class WaitingCard {
    Card card;
    int score;
    Date date;

    public WaitingCard(Card card, int score, Date date){
        this.card = card;
        this.score = score;
        this.date = date;
    }

    public Date getDate() {
        return date;
    }

    public int getScore() {
        return score;
    }

    public Card getCard() {
        return card;
    }
}
