import {
  ADD_TO_READING_LIST,
  DELETE_FROM_READING_LIST,
  TOGGLE_READING_BOOK,
  RATE_BOOK,
} from '../constants/readingList';

export const addToReadingList = (bookId, title) => {
  return {
    type: ADD_TO_READING_LIST,
    payload: {
      bookId,
      title,
    },
  };
};

export const deleteFromReadingList = (bookId) => {
  return {
    type: DELETE_FROM_READING_LIST,
    payload: bookId,
  };
};

export const toogleReadingBook = (bookId) => {
  return {
    type: TOGGLE_READING_BOOK,
    payload: bookId,
  };
};

export const rateBook = (bookId, rating) => {
  return {
    type: RATE_BOOK,
    payload: {
      bookId,
      rating,
    },
  };
};
