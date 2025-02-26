import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppHeader from './components/Header';
import AppFooter from './components/Footer';  
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import Signuplogin from './pages/Signuplogin';
import Trivia from './pages/Trivia';
import { Layout } from 'antd';
import React from 'react';


const { Header, Footer, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#4096ff',
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 128px)',  // Fills remaining space
  padding: '24px',
  backgroundColor: '#0958d9',
  color: '#fff',
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#4096ff',
  height: 64,
  lineHeight: '64px',
};

const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
    <Router>
      <div className="page-container">
      <Layout>
        <Header style={headerStyle}>
          <AppHeader />
        </Header>

        <Content style={contentStyle}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Leaderboard" element={<Leaderboard />} />
            <Route path="/Signuplogin" element={<Signuplogin />} />
            <Route path="/Trivia" element={<Trivia />} />
          </Routes>
        </Content>

        <Footer style={footerStyle}>
          <AppFooter />
        </Footer>
      </Layout>
      </div>
    </Router>
    </ApolloProvider>
  );
};

export default App;