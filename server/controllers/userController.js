const db = require('../models/booksModels');
const userController = {};
const bcrypt = require('bcrypt');

userController.createUser = (req, res, next) => {
  const { username, password, email, phone, address } = req.body;
  //username = hashedusername
  bcrypt.hash(password, 12)
  .then((hash) => {
      const query = `INSERT INTO users ("username", "password", "email", "phone", "address") VALUES ($1, $2, $3, $4, $5) RETURNING user_id, username, email, phone, address`;
      const values = [username, hash, email, phone, address];
      db.query(query, values)
        .then((sqlRes) => {
          res.locals.user = sqlRes.rows[0];
          res.locals.loggedIn = true;
          next()
        })
        .catch((err) => {
          console.log(err)
          next(err);
        });
    }
  )
  .catch(err => {
    return next({
      log: "error hashing password",
      message: { err: "error hashing password" }
    })
  })
}

userController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  const query1 = `SELECT password FROM users WHERE username = $1`;
  const values1 = [username];
  
  db.query(query1, values1)
    .then(sqlRes => {
      const hash = sqlRes.rows[0].password;
      bcrypt.compare(password, hash)
        .then(result => {
          console.log('hash result ' + result)
          if (result) {
            const query2 = `SELECT user_id, username, email, phone, address FROM users WHERE username = $1`;
            const values2 = [username];
          
            db.query(query2, values2)
              .then((verifiedUser) => {
                res.locals.user = verifiedUser.rows[0];
                console.log(verifiedUser)
                res.locals.loggedIn = true;
                return next();
              })
               .catch(err => {
                const errObj = {
                  log: err,
                  message: { Error: 'Login Failed' }
                }
                next(errObj)
              })
          } else {
            res.locals.loggedIn = false;
            res.locals.user = {user_id: 'imnotreal'};
            return next();
          }
        })
        .catch(error => {
          return next({
            log: "error in bcrypt compare",
            message: { err: "error in bcrypt compare" }
          })
        })
    })
    .catch(err => {
      return next({
        log: "username or password not found",
        message: { err: "username or password not found" }
      })
    })

}

userController.selectAllUsers = (req, res, next) => {
  db.query(`SELECT * FROM users`)
    .then(users => console.log(users))
}


module.exports = userController;