package storyGenerator.API;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import storyGenerator.model.Card;
import storyGenerator.model.CardSet;
import storyGenerator.model.WaitingCard;
import storyGenerator.model.WaitingContainer;
import storyGenerator.service.CardService;

import java.util.List;

@Component
public class Query implements GraphQLQueryResolver {

    private final CardService cardService;

    @Autowired
    public Query(CardService cardService) {
        this.cardService = cardService;
    }

    public List<CardSet> randomSets(int number){
        return cardService.getRandomSetsWithCards(number);
    }

    public List<Card> randomCards(){
        return cardService.getRandomCards();
    }

    public List<WaitingCard> randomWaitingCards(int number){
        return cardService.getRandomWaitingCards(number);
    }
}
