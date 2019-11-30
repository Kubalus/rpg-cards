//package storyGenerator.API;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//import storyGenerator.model.Card;
//import storyGenerator.model.CardSet;
//import storyGenerator.service.CardService;
//
//import javax.validation.Valid;
//import javax.validation.constraints.NotNull;
//import java.util.List;
//import java.util.UUID;
//
//@RequestMapping("api/v1/card")
//@RestController
//public class CardController {
//    private final CardService cardService;
//
//    @Autowired
//    public CardController(CardService cardService) {
//        this.cardService = cardService;
//    }
//
//    @PostMapping
//    public void addCard(@Valid @NotNull @RequestBody Card card){
//        cardService.addCard(card);
//    }
//
//
//    @GetMapping
//    public List<Card> getRandomCards(){
//        return cardService.getRandomCards();
//    }
//
//
//
//    @PutMapping(path = "{id}")
//    public  void voteForCard(@PathVariable("id") UUID id){
//        cardService.voteForCard(id);
//    }
//
//    @PutMapping
//    public void addNewSet(@Valid @NotNull @RequestBody CardSet set){
//        cardService.addNewCardSet(set);
//    }
//}
