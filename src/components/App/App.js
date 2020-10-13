import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from '../Header';
import FindBookForm from '../FindBookForm';
import BooksList from '../BooksList';
import ReadingList from '../ReadingList';
import BookPage from '../BookPage';

import './style.css';

function App() {
  return (
    <div className="App ui container">
      <Router>
        <Header />

        <Switch>
          <Route exact path="/">
            <FindBookForm />
            <BooksList />
          </Route>
          <Route exact path="/list">
            <ReadingList filter={(book) => !book.readed} />
          </Route>
          <Route exact path="/readed">
            <ReadingList filter={(book) => book.readed} />
          </Route>
          <Route exact path="/book/:bookId" component={BookPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
