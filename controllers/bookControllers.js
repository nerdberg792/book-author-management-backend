const Book = require('../models/booksModel') ; 
const asyncHandler = require('express-async-handler') ;
const Author = require('../models/authorModel') ;
//endpoint to fetch all the books from the database
const fetchBooks = asyncHandler(async(req , res)=>{
   try{ const books = await Book.find().populate('author').populate('likes').select('-password') ;
    res.json(books) ;}
    catch(error){
        res.status(404).json({message : error.message})
    }
})
//endpoint to like a book
const likeBook = asyncHandler(async (req, res) => {
    

    try {
     const bookId = req.body.id;
     const author = req.author; 
      const book = await Book.findById(bookId);
    
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      const authorId = author._id;
  
      if (book.likes.includes(authorId)) {
        return res.status(400).json({ message: 'Already liked' });
      }
  
      book.likes.push(authorId);
      await book.save();
  
      res.json({ message: 'Book liked successfully', book });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
//endpoint to unlike a book
const unlikeBook = asyncHandler(async (req, res) => {
    const bookId = req.body.id;
    const author = req.author;
  
    try {
      const book = await Book.findById(bookId);
  
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      const authorId = author._id;
  
      if (!book.likes.includes(authorId)) {
        return res.status(400).json({ message: 'Not liked yet' });
      }

      book.likes = book.likes.filter((like) => like.toString() !== authorId.toString());
  
      await book.save();
  
      res.json({ message: 'Book unliked successfully', book });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });  
//endpoint to add a book(only the author can add a book)
const addBook = asyncHandler(async (req, res) => {
    const authorId = req.author._id;
    const {title} = req.body;
    if(!title){
        return res.status(500).json({message : "Title is required"}) ; 
    }
    try {
        
        const author = await Author.findById(authorId);
    
        if (!author) {
          return res.status(404).json({ message: 'Author not found' });
        }
    
        
        const newBook = await Book.create({
          title : title,
          author: authorId,
          likes : [],
        });
    
        
        author.books.push(newBook._id);
        await author.save();
        await newBook.save();
        res.status(201).json({ message: 'Book added successfully', book: newBook });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

})
//endpoint to delete a book(only the author can delete a book)
const deleteBook = asyncHandler(async (req, res) => {
    const bookId = req.body.id;
    const authorId = req.author._id;
    const book = await Book.findById(bookId);
    try {
     
  
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
     
  
      if (book.author.toString() !== authorId.toString()) {
        return res.status(400).json({ message: 'Not authorized' });
      }
  
      await Book.deleteOne({ _id: bookId });

  
      res.json({ message: 'Book deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "internal server error" });
    }
  }

)
//endpoint to update the title of a book(only the author can update a book)
const updateBook = asyncHandler(async (req, res) => {
    const bookId = req.body.id;
    const authorId = req.author._id;
    const title = req.body.title;
    const book = await Book.findById(bookId);
   
    if(!title){
        return res.status(500).json({message : "Title is required"}) ; 
    }
    try{
        
        if(!book){
            return res.status(404).json({message : "Book not found"}) ; 
        }
        if(book.author.toString() !== authorId.toString()){
            return res.status(400).json({message : "Not authorized"}) ; 
        }
      
        book.title = title ;
        await book.save() ;
        res.json({message : "Book updated successfully" , book : book}) ;
    }
    catch(error){
        res.status(500).json({message : error.message})
    }})

module.exports = {fetchBooks , likeBook , unlikeBook , addBook , deleteBook , updateBook} ;

