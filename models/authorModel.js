//mongoose model for author
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const authorModel = mongoose.Schema(
  {
    name : { type: String, trim: true },
    email : {type: String, trim: true },
    books : [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
    password : { type: String , trim : true  },
    phone_no : { type: String , trim : true  },
  },
  { timestamps: true }
);
authorModel.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

authorModel.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
const Author = mongoose.model("Author", authorModel);



module.exports = Author ;
