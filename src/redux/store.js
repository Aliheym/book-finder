import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import booksReducer from './reducers/books';
import readingListReducer from './reducers/readingList';

const store = createStore(
  combineReducers({
    books: booksReducer,
    readingList: readingListReducer,
  }),
  {},
  applyMiddleware(thunk)
);

export default store;
