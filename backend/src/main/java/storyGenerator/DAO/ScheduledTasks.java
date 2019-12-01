package storyGenerator.DAO;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import storyGenerator.model.WaitingCard;

import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Component
public class ScheduledTasks {
    private JdbcTemplate jdbcTemplate;


    public ScheduledTasks(JdbcTemplate temp){
        this.jdbcTemplate = temp;
    }

    @Scheduled(cron = "0 0 12 * * ?")
    public int checkVotes(){
        List<WaitingCard> waiting = fetchWaitingCards();
        return updateDatabase(waiting);
    }

    private int updateDatabase(List<WaitingCard> waiting) {
        String sql = prepareSQL(waiting);
        return jdbcTemplate.update(sql);

    }

    private String prepareSQL(List<WaitingCard> waiting) {
        StringBuilder expiredCardsSQL = new StringBuilder("DELETE FROM main.\"WaitingCards\"\n" +
                "WHERE ");
        StringBuilder acceptedCardsSQL = new StringBuilder("UPDATE main.\"Cards\"\n" +
                "SET  \"isAccepted\"= true\n" +
                "WHERE ");
        boolean nextExp = false;
        boolean nextAcc = false;
        boolean accepted = false;
        for (WaitingCard card: waiting) {
            if(card.getScore() >= 20){
                if(nextAcc){
                    acceptedCardsSQL.append("OR ");
                }
                acceptedCardsSQL.append("\"ID\" = " + card.getCard().getId() + " ");
                nextAcc = true;
                accepted = true;
            }
            if(accepted || timeExpired(card.getDate()) ){
                if(nextExp){
                    expiredCardsSQL.append("OR ");
                }
                expiredCardsSQL.append("\"ID\" = " + card.getCard().getId() + " ");
                nextExp = true;
                accepted = false;
            }
        }
        return acceptedCardsSQL.toString() + ";\n" + expiredCardsSQL.toString();
    }

    private boolean timeExpired(Date date) {
        LocalDate lDate = convertToLocalDate(date);
        LocalDate now = LocalDate.now();
        Period period = Period.between(lDate, now);
        int diff = period.getDays();
        return diff > 7;
    }

    private List<WaitingCard> fetchWaitingCards() {
        final String sql = "SELECT * FROM main.\"WaitingCards\"";
        return jdbcTemplate.query(sql, (resultSet, i) ->{
//                    return new WaitingCard(UUID.fromString(resultSet.getString("cardID")),
//                            Integer.parseInt(resultSet.getString("score")),
//                            dateFromString(resultSet.getString("addingDate")));
                return null;
                }
        );
    }

    private LocalDate convertToLocalDate(Date dateToConvert) {
        return dateToConvert.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
    }

    private Date dateFromString(String text){
        System.out.println(text);
        return new Date();

    }
}
