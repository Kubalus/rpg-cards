package storyGenerator.model;

import javax.validation.constraints.NotBlank;
import java.util.UUID;

public class Card {
    UUID id;
    @NotBlank
    String title;
    CardType type;
    String imageURL;
    String author;

    public Card(UUID id,
                String title,
                String type,
                String imageURL,
                String author){
        this.id = id;
        this.title = title;
        this.type = CardType.valueOf(type);
        this.imageURL = imageURL;
        this.author = author;

    }

    public Card(String title, String type, String imageURL, String author){
        this.id = UUID.randomUUID();
        this.title = title;
        this.type = CardType.valueOf(type);
        this.imageURL = imageURL;
        this.author = author;

    }

    public Card(String title, CardType type, String imageURL, String author){
        this.id = UUID.randomUUID();
        this.title = title;
        this.type = type;
        this.imageURL = imageURL;
        this.author = author;

    }

    public Card(UUID id){
        this.id = id;
        this.title = null;
        this.type = null;
        this.imageURL = null;
        this.author = null;
    }

    public CardType getType() {
        return type;
    }

    public String getAuthor() {
        return author;
    }

    public String getTitle() {
        return title;
    }

    public String getImageURL() {
        return imageURL;
    }

    public UUID getId() {
        return id;
    }
}



