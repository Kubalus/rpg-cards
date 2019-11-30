package storyGenerator.model;

import java.util.List;

public class WaitingContainer {
    private List<WaitingCard> waiting;
    private List<Card> cardList;

    public WaitingContainer(List<WaitingCard> waiting, List<Card> cardList){
        this.cardList = cardList;
        this.waiting = waiting;
    }
}
