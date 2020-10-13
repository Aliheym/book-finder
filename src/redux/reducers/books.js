import {
  FETCH_BOOKS_PENDING,
  FETCH_BOOKS_FAIL,
  FETCH_BOOKS_SUCCESS,
  FETCH_MORE_BOOKS_SUCCESS,
} from '../constants/books';

const initialState = {
  query: '',
  items: [],
  status: 'idle',
  error: null,
  isEnd: true,
};

const booksReducer = function (state = initialState, action) {
  switch (action.type) {
    case FETCH_BOOKS_PENDING: {
      return {
        ...state,
        status: 'pending',
      };
    }
    case FETCH_BOOKS_SUCCESS: {
      return {
        ...action.payload,
        status: 'succeeded',
        error: null,
      };
    }
    case FETCH_BOOKS_FAIL: {
      return {
        ...state,
        status: 'failed',
        error: action.payload,
      };
    }
    case FETCH_MORE_BOOKS_SUCCESS: {
      return {
        ...action.payload,
        items: state.items.concat(action.payload.items),
        status: 'succeeded',
        error: null,
      };
    }
    default:
      return state;
  }
};

export default booksReducer;
