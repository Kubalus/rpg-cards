package storyGenerator.API;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import storyGenerator.model.Card;
import storyGenerator.model.CardSet;
import storyGenerator.model.SetContainer;
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

    public SetContainer randomSets(){
        return cardService.getRandomSetsWithCards();
    }

    public List<Card> randomCards(){
        return cardService.getRandomCards();
    }

    //TODO: Implement this method
    public WaitingContainer randomWaitingCards(){
        return null;
    }
}
