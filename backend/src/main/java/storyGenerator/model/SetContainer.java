package storyGenerator.model;

import java.util.List;

public class SetContainer {
    private List<CardSet> sets;
    private List<Card> cards;

    public SetContainer (List<CardSet> sets, List<Card> cards){
        this.sets = sets;
        this.cards = cards;
    }
}
