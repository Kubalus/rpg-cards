import Choosing from "./Pages/Choosing/Choosing";
import {ToastContainer} from "react-toastify";
import * as React from 'react';
import {ApolloProvider, ApolloProvider as ApolloHooksProvider} from "react-apollo-hooks";
import ApolloClient from "apollo-boost";
import {useState} from "react";
import Preview from "./Pages/Preview/Preview";
import NewCard from "./Pages/NewCard/NewCard";

const client = new ApolloClient({
    uri: 'http://0f1767e6.ngrok.io/graphql',
});

enum Page {
    Choosing,
    Preview,
    CardSet,
    NewCard
}

const App: React.FC = () => {
    const [page, setPage] = useState<Page>(Page.NewCard);

    return (
            <ApolloProvider client={client}>
                <ApolloHooksProvider client={client}>
                    {
                        page === Page.Choosing ? <Choosing />
                        : page === Page.Preview ? <Preview />
                        : page === Page.NewCard ? <NewCard />
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
