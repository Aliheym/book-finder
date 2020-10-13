import {
  FETCH_BOOKS_PENDING,
  FETCH_BOOKS_SUCCESS,
  FETCH_MORE_BOOKS_SUCCESS,
  FETCH_BOOKS_FAIL,
} from '../constants/books';
import googleBooks from '../../api/googleBooks';

const MAX_RESULTS = 9;

export const fetchBooks = (query, startIndex = 0) => {
  return async (dispatch) => {
    dispatch({
      type: FETCH_BOOKS_PENDING,
    });
    try {
      const response = await googleBooks.get('/volumes', {
        params: {
          startIndex,
          q: query,
          maxResults: MAX_RESULTS,
        },
      });

      const items = response.data.items ? response.data.items : [];

      const data = items.map(({ id, volumeInfo }) => ({
        id: id,
        title: volumeInfo.title,
        publishedDate: volumeInfo.publishedDate,
        pageCount: volumeInfo.pageCount,
        authors: volumeInfo.authors || [],
        description: volumeInfo.description,
        thumbnail: volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : '',
      }));

      dispatch({
        type: startIndex === 0 ? FETCH_BOOKS_SUCCESS : FETCH_MORE_BOOKS_SUCCESS,
        payload: {
          items: data,
          query,
          isEnd: response.data.totalItems <= startIndex + MAX_RESULTS,
        },
      });
    } catch (err) {
      dispatch({
        type: FETCH_BOOKS_FAIL,
        payload: err,
      });
    }
  };
};
