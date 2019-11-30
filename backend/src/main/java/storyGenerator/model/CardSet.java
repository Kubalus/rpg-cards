package storyGenerator.model;

import java.util.UUID;

public class CardSet {
    UUID id;
    String title;
    String author;
    Card genreCard;
    Card antagonistCard;
    Card itemCard;
    Card placeCard;
    Card companionCard;
    int score;

    public CardSet(UUID id, String title, String author, Card genreCard,
                   Card antagonistCard, Card itemCard, Card placeCard, Card companionCard, int score){
        this.id = id;
        this.title = title;
        this.author = author;
        this.genreCard = genreCard;
        this.antagonistCard = antagonistCard;
        this.itemCard = itemCard;
        this.placeCard = placeCard;
        this.companionCard = companionCard;
        this.score = score;

    }

    public CardSet(String title, String author, Card genreCard, Card antagonistCard,
                   Card itemCard, Card placeCard, Card companionCard){
        this.id = UUID.randomUUID();
        this.title = title;
        this.author = author;
        this.genreCard = genreCard;
        this.antagonistCard = antagonistCard;
        this.itemCard = itemCard;
        this.placeCard = placeCard;
        this.companionCard = companionCard;
        this.score = 1;

    }

    public UUID getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getAuthor() {
        return author;
    }

    public Card getGenreCard() {
        return genreCard;
    }

    public Card getAntagonistCard() {
        return antagonistCard;
    }

    public Card getItemCard() {
        return itemCard;
    }

    public Card getPlaceCard() {
        return placeCard;
    }

    public Card getCompanionCard() {
        return companionCard;
    }

    public int getScore() {
        return score;
    }
}
