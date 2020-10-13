import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { fetchBooks } from '../../redux/actions/books';

import './style.css';

function FindBookForm() {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    dispatch(fetchBooks(query));
    setQuery('');
  };

  return (
    <div className="FindBookForm ui grid centered">
      <form
        action="/"
        className="ui column eight wide segment raised"
        onSubmit={onFormSubmit}
      >
        <div className="ui fluid input action">
          <input
            type="text"
            placeholder="Enter a book name or title or author..."
            value={query}
            onChange={(evt) => setQuery(evt.target.value)}
          />
          <button className="ui button" type="submit">
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default FindBookForm;
