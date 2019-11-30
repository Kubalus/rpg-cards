package storyGenerator.model;

import java.util.Date;
import java.util.UUID;

public class WaitingCard {
    UUID id;
    int score;
    Date date;

    public WaitingCard(UUID id, int score, Date date){
        this.id = id;
        this.score = score;
        this.date = date;
    }

    public Date getDate() {
        return date;
    }

    public int getScore() {
        return score;
    }

    public UUID getId() {
        return id;
    }
}
