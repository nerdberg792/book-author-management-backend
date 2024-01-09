const asyncHandler = require("express-async-handler");
const Author = require("../models/authorModel");
const generateToken = require("../config/generateToken");
//endpoint to fetch all the authors from the database
const authors = asyncHandler(async (req, res) => {
try 
 {   const authorsList = await Author.find().select('-password').populate("books");
    res.json(authorsList);}
catch(error){
    res.status(404).json({message : error.message})

}
});
//endpoint to register a new author
const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please Enter all the Feilds");
    }
  
    const authorExists = await Author.findOne({ email });
  
    if (authorExists) {
      res.status(400);
      throw new Error("User already exists");
    }
  
    const author = await Author.create({
      name,
      email,
      password,
    });
  
    if (author) {
      res.status(201).json({
        _id: author._id,
        name: author.name,
        email: author.email,
        token: generateToken(author._id),
      });
    } else {
      res.status(400);
      throw new Error("User not found");
    }
  });
//endpoint to login an author
const login = asyncHandler(async (req, res) => {
    try{
        const {email , password} = req.body;
        const author = await Author.findOne({email});
        if (author && (await author.matchPassword(password))) {
            res.json({
              _id: author._id,
              name: author.name,
              email: author.email,
              token: generateToken(author._id),
            });
          } else {
            res.status(401);
            throw new Error("Invalid Email or Password");
          }

    }catch(error){
        res.status(404).json({message : error.message})

    }
})
//endpoint to fetch an author by id
const authorbyId = asyncHandler(async (req, res) => {
    try{

        const author = await Author.findById(req.params.id).populate("books").select('-password');
        if(author){
            res.json(req.params.id);
        }else{
            res.status(404).json({message : "Author not found"})
        }
    }catch(error){
        res.status(404).json({message : error.message})

    }
})
//endpoint to fetch the current author
const authorme = asyncHandler(async (req, res) => {
     const id = req.author._id;
     res.json(req.author);
    try{
        
        const author = await Author.findById(id).populate("books").select('-password');
        if(author){
            res.json(author);}
        else{
            res.status(404).json({message : "Author not found"}) ; 
        }

    }
    catch(error){
        res.status(404).json({message : error.message})

    }
})
//endpoint to delete an author
const deleteAuthor = asyncHandler(async (req, res) => {
    try{
        const id = req.author._id;
        const author = await Author.findByIdAndDelete(id);
        if(author){
            res.json(author);}
        else{
            res.status(404).json({message : "Author not found"}) ; 
        }

    }
    catch(error){
        res.status(404).json({message : error.message})

    }
})
const updateAuthor = asyncHandler(async (req, res) => {
    const id = req.author._id;
    res.json(req.author);
   try{ 

    var author = await Author.findById(id);
    if(req.body.name){
        author.name = req.body.name;
    }
    if(req.body.email){
        author.email = req.body.email;
    }
    if(req.body.password){
        author.password = req.body.password;
    }
    if(req.body.phone_no){
        author.phone_no = req.body.phone_no;
    }
    await author.save();

    res.json(author);}
    catch(error){
        res.status(404).json({message : error.message})

    }
})
module.exports = { authors, authorbyId, authorme, register, login, deleteAuthor, updateAuthor };
