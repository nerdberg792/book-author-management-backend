//mongoose model for books
const mongoose = require("mongoose");

const bookModel = mongoose.Schema(
  {
    title : { type: String, trim: true },
    likes : [{ type: mongoose.Schema.Types.ObjectId, ref: "Author" }],
    author : { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookModel);

module.exports = Book ;
