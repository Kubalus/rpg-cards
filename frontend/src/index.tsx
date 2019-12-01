import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './App';
import 'react-toastify/dist/ReactToastify.min.css';
import {ApolloProvider} from "react-apollo-hooks";

const client = new ApolloClient({
    uri: 'http://6c688693.ngrok.io/graphql',
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
            <App />
        </ApolloHooksProvider>
    </ApolloProvider>,
    document.getElementById('root'));

serviceWorker.unregister();
