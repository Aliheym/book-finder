import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Book from '../Book';
import { fetchBooks } from '../../redux/actions/books';

import './style.css';

function BooksList() {
  const [loadMoreStatus, setLoadMoreStatus] = useState('idle');

  const { query, isEnd, items: books, status, error } = useSelector(
    (state) => state.books
  );
  const dispatch = useDispatch();

  const onLoadMore = async () => {
    setLoadMoreStatus('pending');
    await dispatch(fetchBooks(query, books.length));
    setLoadMoreStatus('succeeded');
  };

  let content;

  if (status === 'pending' && loadMoreStatus !== 'pending') {
    content = (
      <div className="ui active inverted dimmer">
        <div className="ui text loader">Searching...</div>
      </div>
    );
  } else if (status === 'failed') {
    content = <div className="segment">{error.toString()}</div>;
  } else {
    const btnClassName = loadMoreStatus === 'pending' ? 'loading' : '';

    content = (
      <>
        <div className="BookList__list ui centered cards">
          {books.map((bookProps) => (
            <Book key={bookProps.id} {...bookProps} />
          ))}
        </div>
        {!isEnd && (
          <button
            className={`ui big button ${btnClassName}`}
            onClick={onLoadMore}
          >
            Load more...
          </button>
        )}
      </>
    );
  }

  return <div className="BookList ui grid centered">{content}</div>;
}

export default BooksList;
