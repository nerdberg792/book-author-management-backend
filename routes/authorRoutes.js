// Purpose: To route the author requests to the correct controller functions
const express = require("express");
const {
authors , 
authorbyId,
authorme , 
register , 
login ,
deleteAuthor,
updateAuthor
} = require("../controllers/authorControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/me").get(protect, authorme);  
router.route("/:id").get(protect, authorbyId);
router.route("/").get(protect, authors);
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/deleteAuthor').delete(protect, deleteAuthor);
router.route('/updateAuthor').put(protect, updateAuthor);



module.exports = router;
