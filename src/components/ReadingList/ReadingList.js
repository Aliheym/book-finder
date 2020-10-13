import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Rating from '../Rating';
import {
  deleteFromReadingList,
  rateBook,
  toogleReadingBook,
} from '../../redux/actions/readingList';

function ReadingList({ filter }) {
  const readingList = useSelector((state) => state.readingList);
  const dispatch = useDispatch();

  const renderRow = ({ bookId, title, readed, rating }) => {
    const iconClassName = readed ? '' : 'outline';

    return (
      <tr key={bookId}>
        <td>
          <h3 className="ui center aligned header">
            <Link to={`/book/${bookId}`}>{title}</Link>
          </h3>
        </td>
        <td className="collapsing">
          <Rating
            defaultRating={rating}
            maxRating={5}
            onRate={(rating) => dispatch(rateBook(bookId, rating))}
          />
        </td>
        <td className="collapsing">
          <button
            className="ui button"
            type="button"
            onClick={() => dispatch(deleteFromReadingList(bookId))}
          >
            <i className="icon trash" /> Remove
          </button>
          <button
            className="ui button"
            type="button"
            onClick={() => dispatch(toogleReadingBook(bookId))}
          >
            <i className={`icon sticky note ${iconClassName}`} />
            {readed ? 'Unread' : 'Read'}
          </button>
        </td>
      </tr>
    );
  };

  const filteredList = filter ? readingList.filter(filter) : readingList;

  return (
    <div className="ReadingList">
      {filteredList.length === 0 ? (
        <div className="ui raised segment center aligned">Empty</div>
      ) : (
        <table className="ui table celled selectable">
          <thead>
            <tr>
              <th>Book title</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{filteredList.map(renderRow)}</tbody>
        </table>
      )}
    </div>
  );
}

export default ReadingList;
