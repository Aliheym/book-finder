import {
  ADD_TO_READING_LIST,
  DELETE_FROM_READING_LIST,
  TOGGLE_READING_BOOK,
  RATE_BOOK,
} from '../constants/readingList';

const initialState = [];

const readingListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_READING_LIST:
      return [
        ...state,
        {
          ...action.payload,
          readed: false,
          rating: null,
        },
      ];
    case DELETE_FROM_READING_LIST:
      return state.filter((book) => book.bookId !== action.payload);
    case TOGGLE_READING_BOOK:
      return state.map((book) =>
        book.bookId === action.payload
          ? { ...book, readed: !book.readed }
          : book
      );
    case RATE_BOOK:
      return state.map((book) =>
        book.bookId === action.payload.bookId
          ? { ...book, rating: action.payload.rating }
          : book
      );
    default:
      return state;
  }
};

export default readingListReducer;
