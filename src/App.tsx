import React from 'react';
import logo from './logo.svg';
import './App.css';
import { WebSocketLink } from '@apollo/link-ws';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ApolloProvider, split } from '@apollo/react-hooks';
import { getMainDefinition } from '@apollo/client/utilities';
import { addScore } from './store/actionCreators';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import Score from './components/Score';
const GRAPHQL_ENDPOINT = 'romantic-shrew-59.hasura.app/v1/graphql';
const httpLink = new HttpLink({
  uri: `https://${GRAPHQL_ENDPOINT}`,
});
const wsLink = new WebSocketLink({
  uri: `ws://${GRAPHQL_ENDPOINT}`,
  options: {
    reconnect: true,
  },
});
const splitLink = split(
  ({ query }) => {
    const def = getMainDefinition(query);
    return (
      def.kind === 'OperationDefinition' && def.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink,
  });
  const highScores: readonly IScore[] = useSelector(
    (s: ScoreState) => s.scores,
    shallowEqual
  );
  const dispatch = useDispatch();

  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <button
            onClick={() => dispatch(addScore({ name: 'me', seconds: 123 }))}
          >
            Add
          </button>
          {highScores.map((h, i) => {
            return (
              <div key={i}>
                Name: {h.name}, Score: {h.seconds}
              </div>
            );
          })}
          <Score></Score>
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
