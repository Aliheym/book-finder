import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { addToReadingList } from '../../redux/actions/readingList';

function Book({ id, title, authors, publishedDate, thumbnail }) {
  const dispatch = useDispatch();
  const bookId = useSelector((state) =>
    state.readingList.find((item) => item.bookId === id)
  );

  const onReadingListAdd = () => {
    dispatch(addToReadingList(id, title));
  };

  return (
    <div className="ui card raised">
      <div className="image fluid">
        <img src={thumbnail} alt={title} />
      </div>
      <div className="content">
        <Link className="header" to={`/book/${id}`}>
          {title}
        </Link>
        <div className="meta left aligned">
          <span className="category">Authors: {authors.join(', ')} </span>
          <span className="right floated time">{publishedDate}</span>
        </div>
      </div>
      <button
        className="ui bottom attached button"
        type="button"
        onClick={onReadingListAdd}
        disabled={!!bookId}
      >
        <i className="icon plus" />
        Add to reading list
      </button>
    </div>
  );
}

export default Book;
