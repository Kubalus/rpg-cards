package storyGenerator.DAO;

import storyGenerator.model.Card;
import storyGenerator.model.CardSet;
import storyGenerator.model.WaitingCard;

import java.util.List;
import java.util.UUID;

public interface CardDAO {


    int insertCard(Card card);

    List<Card> selectRandomCards();

    int insertNewCardSet(CardSet set);

    int voteForCard(UUID id);

    int voteForSet(UUID id);

    List<CardSet> getRandomSetsWithCards(int number);

    List<WaitingCard> getRandomWaitingCards(int number);


}
