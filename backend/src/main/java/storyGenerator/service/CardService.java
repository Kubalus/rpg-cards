package storyGenerator.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import storyGenerator.DAO.CardDAO;
import storyGenerator.model.Card;
import storyGenerator.model.CardSet;
import storyGenerator.model.WaitingCard;

import java.util.List;
import java.util.UUID;

@Service
public class CardService {

    private final CardDAO cardDAO;

    @Autowired
    public CardService(@Qualifier("Postgres") CardDAO cardDAO) {
        this.cardDAO = cardDAO;
    }

    public int addCard(Card card){
        return cardDAO.insertCard(card);
    }


    public List<Card> getRandomCards(){
        return cardDAO.selectRandomCards();
    }

    public int addNewCardSet(CardSet set){
        return cardDAO.insertNewCardSet(set);
    }

    public List<CardSet> getRandomSetsWithCards(int number){ return cardDAO.getRandomSetsWithCards(number);}

    public int voteForCard(UUID id){
        return cardDAO.voteForCard(id);
    }

    public int voteForSet(UUID id){
        return cardDAO.voteForSet(id);
    }

    public List<WaitingCard> getRandomWaitingCards(int number){ return cardDAO.getRandomWaitingCards(number);}

}
