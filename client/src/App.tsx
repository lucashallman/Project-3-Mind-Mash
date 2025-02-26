import './App.css';
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

const App: React.FC = () => {
  return (
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
  );
};

export default App;