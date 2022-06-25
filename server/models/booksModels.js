const { Pool } = require('pg');

// add elephant SQL url here. Queries to create tables are below :) 
const PG_URI = 'postgres://lqksgrmm:s11cLWh9kbkjbzvkZ_BL7GD3P1ua50lO@kashin.db.elephantsql.com/lqksgrmm';

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};

// CREATE TABLE users (
// user_id SERIAL PRIMARY KEY,
// username VARCHAR(50) NOT NULL,
// password VARCHAR(50) NOT NUL
// email VARCHAR(100),
// phone VARCHAR(50),
// address VARCHAR(500)
// );

// CREATE TABLE books (
//   isbn VARCHAR(30) PRIMARY KEY,
//   title VARCHAR(500),
//   author VARCHAR(500),
//   genre VARCHAR(50)
//   );

// CREATE TABLE users_books (
//   old_book_id SERIAL PRIMARY KEY,
//   user_id int references users(user_id),
//   bookisbn VARCHAR(30) references books(isbn),
//   condition VARCHAR(100)
//   );

// INSERT INTO books (isbn, title, author, genre)
// VALUES ('9780060244194', 'The Giving Tree', 'Shel Silverstein', 'Childrens Books');