package storyGenerator.API;

import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import storyGenerator.model.Card;
import storyGenerator.model.CardSet;
import storyGenerator.model.CardType;
import storyGenerator.service.CardService;

import java.util.UUID;

@Component
public class Mutation implements GraphQLMutationResolver {
    private final CardService cardService;

    @Autowired
    public Mutation(CardService cardService) {
        this.cardService = cardService;
    }

    public int addCard(String title, String cardType, String imageURL, String author){
        return cardService.addCard(new Card(title, cardType, imageURL, author));
    }

    public int addSet(String title, String author, UUID genreCard, UUID antagonistCard,
                      UUID itemCard, UUID placeCard, UUID companionCard){

        return cardService.addNewCardSet(new CardSet(title, author, genreCard, antagonistCard,
                itemCard, placeCard, companionCard));
    }

    public int voteCard(UUID id){
        return cardService.voteForCard(id);
    }

    public int voteSet(UUID id){
        return cardService.voteForSet(id);
    }


}
