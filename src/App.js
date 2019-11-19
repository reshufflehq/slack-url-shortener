import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Admin from './components/Admin/Admin';
import LiveFrame from './components/LiveFrame';
import './App.css';

function App() {
  return (
    <Container fluid>
      <Router>
        <Route exact path='/' component={Admin} />
      </Router>
    </Container>
  );
}

export default App;
