# Server Reqests in GraphQL
## Data Types
### Card
Object used to pass data about single Card.

    type Card {  
      id : ID !,  
      title : String !,  
      author : String,  
      imageURL : String !,  
      type : CardType ! 
    }
### CardType
Enum Type for each of 5 card types.

        enum CardType{  
		GENRE 
		ANTAGONIST 
	        ITEM 
	        PLACE 
	        COMPANION
	     }
### CardSet
Type for storing prepared by Users card Sets.

    type CardSet {  
      id : ID !,  
        title : String !,  
        author : String,  
        genreCard : Card !,  
        antagonistCard : Card !,  
        itemCard : Card !,  
        placeCard : Card !,  
        companionCard : Card !,  
        score : Int  
    }
### WaitingCard
Type for hadling cards, that are still not accepted by Users.

 

    type WaitingCard{  
      card : Card !,  
        score : Int !,  
        date : Date !  
    }
### Date
Type for passing dates.

    type Date{  
	      year : Int !,  
	      month : Int !,  
	      day : Int !  
    }

## Queries
### Choosing random 5 Cards for Set
This query is returning 5 random Card, one for each card type.

#### example request
       query{
	       randomCards{
		       title
		       imageURL
	       }
	  }
	 
#### response for example

        {
      "data": {
        "randomCards": [
          {
            "title": "Small Town",
            "imageURL": "https://i.imgur.com/VOQXfw0.jpg"
          },
          {
            "title": "Dog",
            "imageURL": "https://i.imgur.com/5I9kY8G.jpg"
          },
          {
            "title": "Joker",
            "imageURL": "https://i.imgur.com/FyAnQ2O.jpg"
          },
          {
            "title": "Western",
            "imageURL": "https://i.imgur.com/HXXp79E.jpg"
          },
          {
            "title": "Old Book",
            "imageURL": "https://i.imgur.com/IxGhKmV.jpg"
          }
        ]
      }
    }

### randomSets
This Query return reqeusted number of random choosed sets. If number will be greater than number of sets in DB, then it will return all of them. 
#### Example Request

    query{
      randomSets(number: 1){
        title
        genreCard{
          title
        }
      }
    }

#### Response for Example

    {
      "data": {
        "randomSets": [
          {
            "title": "Western Madness!",
            "genreCard": {
              "title": "Western"
            }
          }
        ]
      }
    }

### randomWaitingCards
This Query will return the requested number of waiting for acceptation cards.

#### Example Request

    query{
	    randomWaitingCards(number: 2){
		card{
		    	title
		    	imageURL
	    	}
    	score
    	
	    }
    }
#### Response for Example

    {
      "data": {
        "randomWaitingCards": [
          {
            "card": {
              "title": "Western",
              "imageURL": "https://i.imgur.com/HXXp79E.jpg"
            },
            "score": 2
          },
          {
            "card": {
              "title": "Joker",
              "imageURL": "https://i.imgur.com/FyAnQ2O.jpg"
            },
            "score": 1
          }
        ]
      }
    }

## Mutations
### addCard
Mutation for adding new Cards to DB.
#### Mutation Body 
 

    mutation{
        addCard(title: "Title",
         cardType: "enumType",
          imageURL: "LINK",
          author: "author")
    }

### addSet
Mutation for adding new Sets to DB.

     mutation{
       addSet(title: "Western Madness!", author: "Kubalus",
       genreCard: "UUID",
       antagonistCard: "UUID",
       itemCard: "UUID",
       placeCard: "UUID",
       companionCard: "UUID")
     }
### voteCard
Mutation for voting for Card to Acceptation.

    mutation{
	    voteCard(card: "UUID")
    {
### voteSet
Mutation for voting for Card to Acceptation.

    mutation{
	    voteSet(set: "UUID")
    {
