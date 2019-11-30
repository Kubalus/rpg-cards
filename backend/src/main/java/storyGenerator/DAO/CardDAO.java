package storyGenerator.DAO;

import storyGenerator.model.Card;
import storyGenerator.model.CardSet;
import storyGenerator.model.SetContainer;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CardDAO {


    int insertCard(Card card);

    List<Card> selectRandomCards();

    int insertNewCardSet(CardSet set);

    int voteForCard(UUID id);

    int voteForSet(UUID id);

    SetContainer getRandomSetsWithCards();


}
