// Desc: Book routes
const express = require("express");
const {
 fetchBooks, 
 likeBook,
 unlikeBook , 
 addBook ,
 deleteBook,
 updateBook
} = require("../controllers/bookControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect , fetchBooks);
router.route("/like").post(protect , likeBook);
router.route("/unlike").post(protect , unlikeBook);
router.route('/addBook').post(protect , addBook);
router.route('/deleteBook').delete(protect , deleteBook);
router.route('/updateBook').put(protect , updateBook);

module.exports = router;


