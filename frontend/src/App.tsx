import Choosing from "./Pages/Choosing/Choosing";
import {ToastContainer} from "react-toastify";
import * as React from 'react';
import {ApolloProvider, ApolloProvider as ApolloHooksProvider} from "react-apollo-hooks";
import ApolloClient from "apollo-boost";
import {useState} from "react";
import Preview from "./Pages/Preview/Preview";
import NewCard from "./Pages/NewCard/NewCard";
import PreviewSet from "./Pages/Preview/PreviewSet";
import {CardSet} from "./generated/graphql";
import {Button} from "@material-ui/core";

const client = new ApolloClient({
    uri: 'http://5be40026.ngrok.io/graphql',
});

enum Page {
    Choosing = 'Choosing',
    Preview = 'Preview',
    CardSet = 'CardSet',
    NewCard = 'NewCard'
}

type MenuProps = {
    handleRandom: () => void;
    handleSets: () => void;
    handleWaiting: () => void;
    handleNew: () => void;
}

const Menu: React.FC<MenuProps> = ({ handleRandom, handleSets, handleWaiting, handleNew }) => (
  <div style={{ display: "flex", justifyContent: "center", width: '100%', padding: 30, position: 'fixed', bottom: '0px', left: '50%', transform: 'translateX(-50%)'}}>
      <Button onClick={handleRandom}
          type="submit" style={{margin: 16, width: '32pxs'}} variant="outlined" color="primary">
          Losuj zestaw
      </Button>
      <Button onClick={handleSets}
          type="submit" style={{margin: 16, width: '32pxs'}} variant="outlined" color="primary">
          Zestawy
      </Button>
      <Button onClick={handleWaiting}
          type="submit" style={{margin: 16, width: '32pxs'}} variant="outlined" color="primary">
          Oczekujące karty
      </Button>
      <Button onClick={handleNew}
              type="submit" style={{margin: 16, width: '32pxs'}} variant="outlined" color="primary">
          Dodaj kartę
      </Button>
  </div>
);

const App: React.FC = () => {
    const [page, setPage] = useState<Page>(Page.Preview);
    const [currentSet, setSet] = useState<CardSet | undefined>(undefined);

    const setCurrentSet = async (cardSet: CardSet) => {
        await setSet(cardSet);
        setPage(Page.CardSet);
    };

    const handleRandom = () => setPage(Page.Choosing);
    const handleSets = () => setPage(Page.Preview);
    const handleWaiting = () => setPage(Page.Choosing);
    const handleNew = () => setPage(Page.NewCard);

    return (
            <ApolloProvider client={client}>
                <ApolloHooksProvider client={client}>
                    <Menu handleRandom={handleRandom} handleSets={handleSets} handleWaiting={handleWaiting} handleNew={handleNew}/>
                    {
                        page === Page.Choosing ? <Choosing />
                        : page === Page.Preview ? <Preview setCurrentSet={setCurrentSet} />
                        : page === Page.NewCard ? <NewCard />
                        : page === Page.CardSet ? <PreviewSet cardSet={currentSet} />
                        : null
                    }
                    <ToastContainer
                        position={"bottom-left"}
                        autoClose={3000}
                        hideProgressBar
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        draggable
                        pauseOnHover
                    />
                </ApolloHooksProvider>
            </ApolloProvider>
    );
};

export default App;
