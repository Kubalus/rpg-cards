package storyGenerator.DAO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import storyGenerator.model.*;

import java.text.SimpleDateFormat;
import java.util.*;

@Repository("Postgres")
public class CardDataAccessService implements CardDAO {

    private ScheduledTasks scheduler;
    private final JdbcTemplate jdbcTemplate;
    private Random random;
    private SimpleDateFormat formatter;

    @Autowired
    public CardDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
        random = new Random();
        formatter = new SimpleDateFormat("dd-MM-yyyy");
        scheduler = new ScheduledTasks(jdbcTemplate);
    }

    @Override
    public int insertCard(Card card) {
        Date date = new Date();
        String sql = "INSERT INTO main.\"Cards\"(\n" +
                "\"ID\", title, \"URL\", author, \"cardType\", \"isAccepted\")\n" +
                "VALUES (?, ?, ?, ?, CAST( ? AS main.\"cardType\"), ?);";
        String sql2 = "INSERT INTO main.\"WaitingCards\"(\n" +
                "\"cardID\", score, \"addingDate\")\n" +
                "VALUES (?, ?, ?);";

        jdbcTemplate.update(sql + "\n" + sql2, card.getId(),card.getTitle(), card.getImageURL(),
                card.getAuthor(),card.getType().toString(), false, card.getId(),
                1, date);
    return 0;
    }



    @Override
    public List<Card> selectRandomCards() {
        List<SizePair> sizes = fetchSizes();
        List<Card> cards = new ArrayList<>();
        for (SizePair pair : sizes)
            cards.add(fetchRandomCardByType(pair));
        return cards;
    }

    private List<SizePair> fetchSizes(){
        List<SizePair> sizes = new ArrayList<>();
        final String sql = "SELECT Count(\"ID\") as size, \"cardType\"\n" +
                "\tFROM main.\"Cards\"\n" +
                "\tGROUP BY \"cardType\";";
        sizes = jdbcTemplate.query(sql, (resultSet, i) ->{
            return new SizePair(CardType.valueOf(resultSet.getString("cardType"))
                    ,resultSet.getInt("size"));
        });
        return sizes;
    }

    private Card fetchRandomCardByType(SizePair pair){
        int rand = random.nextInt(pair.getSize());
        final String sql = "SELECT * FROM main.\"Cards\"" +
                " WHERE \"cardType\" = '" + pair.getCardType().toString() +"' OFFSET "+ rand +" LIMIT 1;" ;
        List<Card> cards = jdbcTemplate.query(sql, (resultSet, i) ->{
                    return new Card(UUID.fromString(resultSet.getString("ID")),
                            resultSet.getString("Title"),
                            resultSet.getString("cardType"),
                            resultSet.getString("URL"),
                            resultSet.getString("author"));
                }
        );
        return cards.get(0);
    }

    @Override
    public int insertNewCardSet(CardSet set) {

        String sql = "INSERT INTO main.\"CardSets\" VALUES (?, ?, ?, ?, ?, ?, ?, ?,?);";

        return jdbcTemplate.update(sql, set.getId(), set.getTitle(),set.getAuthor(),
                set.getGenreCard().getId(), set.getAntagonistCard().getId(), set.getItemCard().getId(),
                set.getPlaceCard().getId(), set.getCompanionCard().getId(),set.getScore());


    }




    @Override
    public int voteForCard(UUID id) {
        String sql = "UPDATE main.\"WaitingCards\"\n" +
                "\tSET  score = score + 1\n" +
                "\tWHERE \"cardID\" = ?;";

        return jdbcTemplate.update(sql,id);

    }

    @Override
    public int voteForSet(UUID id) {
        String sql = "UPDATE main.\"CardSets\"\n" +
                "\tSET  score = score + 1\n" +
                "\tWHERE \"cardID\" = ?;";

        return jdbcTemplate.update(sql,id);

    }

    @Override
    public SetContainer getRandomSetsWithCards() {
        List<CardSet> sets = getRandomSets();
        return new SetContainer(sets, fetchCardsForSets(sets));
    }

    private List<Card> fetchCardsForSets(List<CardSet> sets) {
        List<Card> cards = new ArrayList<>();
        for (CardSet set: sets
             ) {
            cards.add(getCardByID(set.getAntagonistCard()));
            cards.add(getCardByID(set.getPlaceCard()));
            cards.add(getCardByID(set.getItemCard()));
            cards.add(getCardByID(set.getCompanionCard()));
            cards.add(getCardByID(set.getGenreCard()));
        }
        return cards;
    }

    private List<CardSet> getRandomSets() {
        int max = countSets();
        int rand = -1;
        List<CardSet> sets = new ArrayList<>();
        for(int i = 0; i < 5; i++){
            while(!between(0, rand, max)){
                rand = (int)random.nextGaussian() * (max / 2);
            }
            sets.add(fetchRandomSet(rand));
            rand = -1;
        }

        return sets;
    }

    private CardSet fetchRandomSet(int rand) {
        String sql = "SELECT * FROM main.\"CardSets\"" +
                " OFFSET "+ rand +" LIMIT 1;" ;
        List<CardSet> set = jdbcTemplate.query(sql, (resultSet, i) ->{
                    return new CardSet(UUID.fromString(resultSet.getString("ID")),
                            resultSet.getString("title"),
                            resultSet.getString("author"),
                            UUID.fromString(resultSet.getString("genreCard")),
                            UUID.fromString(resultSet.getString("antagonistCard")),
                            UUID.fromString(resultSet.getString("itemCard")),
                            UUID.fromString(resultSet.getString("placeCard")),
                            UUID.fromString(resultSet.getString("companionCard")),
                            resultSet.getInt("score"));
                }
        );
        return set.get(0);
    }

    private int countSets() {
        int size;
        final String sql = "SELECT Count(\"ID\") as size \n" +
                "\tFROM main.\"CardSets\";";
        size = jdbcTemplate.query(sql, (resultSet, i) ->{
            return Integer.valueOf(resultSet.getInt("size"));
        }).get(0);
        return size;
    }

    private boolean between(int min, int number, int max){
        if(number > min)
            return number < max;
        return false;
    }

    private Card getCardByID(UUID id){
        String sql = "SELECT * FROM main.\"Cards\" WHERE ID = '" + id +"' ;";

        return jdbcTemplate.query(sql, (resultSet, i) ->{
            return new Card(UUID.fromString(resultSet.getString("id")),
                    resultSet.getString("title"),
                    resultSet.getString("cardType"),
                    resultSet.getString("URL"),
                    resultSet.getString("author"));
        }).get(0);
    }

}
