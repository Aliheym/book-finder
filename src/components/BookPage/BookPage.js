import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Rating from '../Rating';
import googleBooks from '../../api/googleBooks';

function BookPage() {
  const { bookId } = useParams();

  const [book, setBook] = useState(null);

  useEffect(() => {
    async function fetchBook() {
      try {
        const data = (await googleBooks.get(`/volumes/${bookId}`)).data;

        const {
          title,
          authors = [],
          description,
          pageCount,
          publisher,
          publishedDate,
          averageRating,
          imageLinks,
        } = data.volumeInfo;

        setBook({
          id: data.id,
          title,
          authors,
          description,
          pageCount,
          publisher,
          publishedDate,
          averageRating,
          link: data.accessInfo.webReaderLink,
          thumbnail: imageLinks ? imageLinks.thumbnail : '',
        });
      } catch (err) {
        console.error('Error was occurred');
      }
    }

    fetchBook();
  }, [bookId]);

  if (!book) return null;

  const rating = Math.min(Math.max(0, Math.round(book.averageRating)), 5);

  return (
    <div className="BookPage ui relaxed grid divided">
      <div className="five wide column">
        <img className="ui image fluid" src={book.thumbnail} alt={book.title} />
        <div className="ui buttons fluid vertical">
          <a className="ui button blue" href="/">
            Buy this book
          </a>
          <a className="ui button red" href={book.link}>
            Read a sample
          </a>
        </div>
      </div>
      <div className="eleven wide column">
        <h2 className="ui header">{book.title}</h2>
        <div className="ui segment">{book.description}</div>
        <div className="ui segment">
          <div className="ui horizontal relaxed list">
            <div className="item">
              <h4 className="ui header">Author(s):</h4>
              {book.authors.join(', ')}
            </div>
            <div className="item">
              <h4 className="ui header">Publisher:</h4>
              {book.publisher}
            </div>
            <div className="item">
              <h4 className="ui header">Published date:</h4>
              {book.publishedDate}
            </div>
            <div className="item">
              <h4 className="ui header">Number of pages:</h4>
              {book.pageCount}
            </div>
            <div className="item">
              <h4 className="ui header">Critics:</h4>
              <Rating
                defaultRating={rating}
                maxRating={5}
                size="tiny"
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookPage;
