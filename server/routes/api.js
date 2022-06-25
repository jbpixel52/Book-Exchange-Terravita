const express = require('express');
const router = express.Router();

const dbController = require('../controllers/dbController');
const apiController = require('../controllers/apiController');
const userController = require('../controllers/userController');
//const db = require('../models/booksModels');

// Route is not being used in app
router.get('/findBook', apiController.findBook, apiController.findAuthor, (req, res) => {
  return res.status(200).json(res.locals.bookInDB);
});

// input is JSON object that must include { "isbn": "9780060244194"}
router.post('/addOldBook', dbController.findBook, apiController.findBook, apiController.findAuthor, dbController.addBook, dbController.addOldBook, (req, res) => {
  return res.status(200).json(res.locals);
});

router.post('/findOldBook', dbController.findOldBook, (req, res) => {
  return res.status(200).json(res.locals.oldbooks);
});

// To request a book from Find Books page
router.post('/requestBook', dbController.requestBook, (req, res) => {
  return res.status(200).json(res.locals.requestBooks)
});

//Interactions for Exchange Page

//route to get incoming requests for exchange page
router.get('/getIncomingInfo/:userId', dbController.getMyBookRequests, (req, res) => {
  return res.status(200).json(res.locals.incomingRequests)
})
router.get('/getOutgoingInfo/:userId', dbController.getOutgoingRequests, (req, res) => {
  return res.status(200).json(res.locals.outgoingRequests)
})

router.post('/shipped', dbController.shipBook, (req, res) => {
  return res.status(200).json(res.locals.shipped)
})
////////////////////////////////


//interactions in MyPage
router.post('/deleteOldBook', dbController.deleteOldBook, (req, res) => {
  return res.status(200).json(req.body.myOldBookId);
});

router.get('/getMyOldBookList/:userId', dbController.findMyBookList, (req, res) => {
  return res.status(200).json(res.locals.mybooks);
});

//interactions in Register
router.post('/register', userController.createUser, (req, res) => {
  return res.status(200).json(res.locals);
});

router.post('/verifyUser', userController.verifyUser, (req, res) => {
  return res.status(200).json(res.locals);
});

///temp stuff
const db = require('../models/booksModels');
router.get('/seeuser', (req, res) => {
  const query = `SELECT * FROM users`;
  // make a request to db 
  // working with the entier table in order to find an attribute
  db.query(query)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err)
    });
  return res.status(200).json({ msg: 'hhihi' });
});



module.exports = router;