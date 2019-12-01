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
                "\"ID\",  \"title\", \"URL\",  \"author\", \"cardType\", \"isAccepted\")\n" +
                "VALUES (?, ?, ?, ?, CAST( ? AS main.\"cardType\"), ?);";
        String sql2 = "INSERT INTO main.\"WaitingCards\"(\n" +
                "\"cardID\", score, \"addingDate\")\n" +
                "VALUES (?, ?, ?);";

        jdbcTemplate.update(sql + "\n" + sql2, card.getId(), card.getTitle(), card.getImageURL(),
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
                "\tWHERE \"ID\" = ?;";

        return jdbcTemplate.update(sql,id);

    }

    @Override
    public List<CardSet> getRandomSetsWithCards(int number) {
        List<UUID> sets = getRandomSets(number);
        return buildSets(sets);
    }

    @Override
    public List<WaitingCard> getRandomWaitingCards(int number) {
       List<UUID> cards = getRandomWaitingIDs(number);
       return buildWaiting(cards);
    }

    private List<WaitingCard> buildWaiting(List<UUID> cards) {
        List<WaitingCard> result;
        boolean next = false;
        StringBuilder sql = new StringBuilder("SELECT \"ID\" as card, \"title\", \"URL\"," +
                " \"author\", \"cardType\", \"score\", \"addingDate\"\n" +
                "\tFROM main.\"WaitingCards\" INNER JOIN main.\"Cards\"\n" +
                "\tON \"cardID\" = \"ID\" \n" +
                "WHERE ");
        for (UUID id : cards) {
            if (next) {
                sql.append(" OR \n");
            }
            sql.append("\"cardID\" = '").append(id.toString()).append("'");
            next = true;
        }
        sql.append(";");
        result = jdbcTemplate.query(sql.toString(),(resultSet, i) ->{
            return new WaitingCard(new Card(resultSet.getString("title"),
                                            resultSet.getString("cardType"),
                                            resultSet.getString("URL"),
                                            resultSet.getString("author")),
                    resultSet.getInt("score"),
                    resultSet.getDate("addingDate")
                    );} );
        return result;
    }

    private List<UUID> getRandomWaitingIDs(int number) {
        int max = countWaiting();
        int rand = -1;
        UUID temp;
        List<UUID> cards = new ArrayList<>();
        if(number > max){
            for(int i = 0; i < max; i++){
                cards.add(fetchRandomWaiting(i));
            }
            return cards;
        }
        for(int i = 0; i < number; i++){
            while(!between(-1, rand, max)){
                rand = (int)random.nextGaussian() * (max / 2);
            }
            temp = fetchRandomWaiting(rand);
            if(cards.contains(temp)){
                i--;
            }
            else cards.add(temp);
            rand = -1;
        }
        ;
        return cards;
    }

    private UUID fetchRandomWaiting(int rand) {
        String sql = "SELECT \"cardID\" FROM main.\"WaitingCards\"" +
                " OFFSET "+ rand +" LIMIT 1;" ;
        List<UUID> set = jdbcTemplate.query(sql, (resultSet, i) ->{
                    return UUID.fromString(resultSet.getString("cardID"));
                }
        );
        return set.get(0);
    }

    private int countWaiting() {
        int size;
        final String sql = "SELECT Count(\"cardID\") as size \n" +
                "\tFROM main.\"WaitingCards\";";
        size = jdbcTemplate.query(sql, (resultSet, i) ->{
            return Integer.valueOf(resultSet.getInt("size"));
        }).get(0);
        return size;
    }

    private List<CardSet> buildSets(List<UUID> sets) {
        List<CardSet> result;
        boolean next = false;
        StringBuilder sql = new StringBuilder("SELECT Set.\"ID\" as setID, Set.\"title\" as setTitle, Set.\"author\" as setAuthor, Set.\"score\",\n" +
                " \tgenre.\"title\" as genreTitle, genre.\"URL\" as genreURL, genre.\"author\" as genreAuthor,\n" +
                "\titem.\"title\" as itemTitle, item.\"URL\" as itemURL, item.\"author\" as itemAuthor,\n" +
                "\tcompanion.\"title\" as companionTitle, companion.\"URL\" as companionURL, companion.\"author\" as companionAuthor,\n" +
                "\tplace.\"title\" as placeTitle, place.\"URL\" as placeURL, place.\"author\" as placeAuthor,\n" +
                "\tantagonist.\"title\" as antagonistTitle, antagonist.\"URL\" as antagonistURL, antagonist.\"author\" as antagonistAuthor\n" +
                "FROM main.\"CardSets\" as Set \n" +
                "\tINNER JOIN main.\"Cards\" as genre ON Set.\"genreCard\" = genre.\"ID\"\n" +
                "\tINNER JOIN main.\"Cards\" as item ON Set.\"itemCard\" = item.\"ID\"\n" +
                "\tINNER JOIN main.\"Cards\" as companion ON Set.\"companionCard\" = companion.\"ID\"\n" +
                "\tINNER JOIN main.\"Cards\" as place ON Set.\"placeCard\" = place.\"ID\"\n" +
                "\tINNER JOIN main.\"Cards\" as antagonist ON Set.\"antagonistCard\" = antagonist.\"ID\"\n" +
                "WHERE ");
        for (UUID id : sets) {
            if (next) {
                sql.append(" OR \n");
            }
            sql.append("Set.\"ID\" = '").append(id.toString()).append("'");
            next = true;
        }
        sql.append(";");
        result = jdbcTemplate.query(sql.toString(), (resultSet, i) ->{
            return new CardSet(UUID.fromString(resultSet.getString("setID")),
                    resultSet.getString("setTitle"), resultSet.getString("setAuthor"),
                    new Card(null, resultSet.getString("genreTitle"),
                            "GENRE", resultSet.getString("genreURL"),
                            resultSet.getString("genreAuthor")),
                    new Card(null, resultSet.getString("antagonistTitle"),
                            "ANTAGONIST", resultSet.getString("antagonistURL"),
                            resultSet.getString("antagonistAuthor")),
                    new Card(null, resultSet.getString("itemTitle"),
                            "ITEM", resultSet.getString("itemURL"),
                            resultSet.getString("itemAuthor")),
                    new Card(null, resultSet.getString("placeTitle"),
                            "PLACE", resultSet.getString("placeURL"),
                            resultSet.getString("placeAuthor")),
                    new Card(null, resultSet.getString("companionTitle"),
                            "COMPANION", resultSet.getString("companionURL"),
                            resultSet.getString("companionAuthor")),
                    resultSet.getInt("score"));

        });

        return result;
    }


    private List<UUID> getRandomSets(int number) {
        int max = countSets();
        int rand = -1;
        UUID temp;
        List<UUID> sets = new ArrayList<>();
        if(number > max){
            for(int i = 0; i < max; i++){
                sets.add(fetchRandomSet(i));
            }
            return sets;
        }
        for(int i = 0; i < number; i++){
            while(!between(-1, rand, max)){
                rand = (int)random.nextGaussian() * (max / 2);
            }
            temp = fetchRandomSet(rand);
            if(sets.contains(temp)){
                i--;
            }
            else sets.add(temp);
            rand = -1;
        }
        ;
        return sets;
    }

    private UUID fetchRandomSet(int rand) {
        String sql = "SELECT \"ID\" FROM main.\"CardSets\"" +
                " OFFSET "+ rand +" LIMIT 1;" ;
        List<UUID> set = jdbcTemplate.query(sql, (resultSet, i) ->{
                    return UUID.fromString(resultSet.getString("ID"));
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
