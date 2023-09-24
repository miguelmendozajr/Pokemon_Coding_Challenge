import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';
import { Layout, Typography } from 'antd';
import './App.css'

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ background: 'red', padding: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <Title style={{ color: '#fff', margin: 12 }} level={2}><Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>PokéApp</Link></Title>

          </div>
        </Header>
        <Content style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
          <Switch>
            <Route exact path="/" component={PokemonList} />
            <Route path="/pokemon/:id" component={PokemonDetail} />
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>PokéApp ©2023 Created by ABDOTECH</Footer>
      </Layout>
    </Router>
  );
}

export default App;
