package storyGenerator.model;

public class SizePair {
    CardType cardType;
    int size;

    public SizePair(CardType type, int size){
        this.cardType = type;
        this.size = size;
    }

    public CardType getCardType() {
        return cardType;
    }

    public int getSize() {
        return size;
    }
}
