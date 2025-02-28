import './App.css';


// import { Outlet } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
//import Trivia from './pages/Trivia';
// import Navbar from './components/Navbar';



import { Route, Routes } from 'react-router-dom';
import AppHeader from './components/Header';
import AppFooter from './components/Footer';  

import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import Signuplogin from './pages/Signuplogin';
import Trivia from './pages/Trivia';
import Riddles from './pages/Riddles';
import Profile from './pages/Profile';

import { Layout } from 'antd';
import React from 'react';



const { Header, Footer, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: 'left',
  height: 150,
  paddingInline: 48,
  lineHeight: '68px',
  backgroundColor: '#46467A',
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 128px)',  // Fills remaining space
  padding: '24px',
  backgroundColor: '#7766c6',
  color: '#e0DFFD',
};

const footerStyle: React.CSSProperties = {
  textAlign: 'left',
  color: '#e0dffd',
  backgroundColor: '#46467a',
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
            <Route path = "/Riddle" element={<Riddles />} />
            <Route path="/Profile" element={<Profile />} />
          </Routes>
        </Content>

        <Footer style={footerStyle}>
          <AppFooter />
        </Footer>
      </Layout>
      </div>

    </ApolloProvider>
  );
};

export default App;