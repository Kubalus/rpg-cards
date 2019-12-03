import Choosing from "./Pages/Choosing/Choosing";
import {ToastContainer} from "react-toastify";
import * as React from 'react';
import {ApolloProvider, ApolloProvider as ApolloHooksProvider} from "react-apollo-hooks";
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
    uri: 'http://0f1767e6.ngrok.io/graphql',
});

const App: React.FC = () => (
    <>
        <ApolloProvider client={client}>
            <ApolloHooksProvider client={client}>
                <Choosing/>
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
    </>
);

export default App;
