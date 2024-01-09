# Book-Author management Backend 

This is a simple backend written in NodeJs . This code simply manages a book-author database . Simple CURD endpoints are provided . MongoDB along with Mongoose is used as the database solution . I have used a local
instance of MongoDB . You can use your own MongoDB instance simply by changing the MONGO_URI in the .env file . JWT is used for authorization purposes and Bcrypt is used for storing passwords securely in the database.
fakerjs is used for seeding fake data . I have build the initial thing in 3-4 hours may contain some bugs . feel free to raise an issue 
Contributors are always welcome . feel free to ping me on my email : jtlayan@gmail.com


## Features

- This project has two data models author and book
- Each author can register himself using the name / email / password 
- Authors can update their phone numbers and also upload data about books they have written
- Authorized users(authors) can get data about all the books and aouthors present in the database 
- Authorized users(authors) can like and Unlike books 
- Authors can delete and update their own Books 


### Installation

Step-by-step instructions on how to install the project.

```bash
git clone https://github.com/nerdberg792/book-author-management-backend/.git
cd book-author-management-backend
npm install
npm run start 
```
P.S. for running the postman collection , please run the register/login routes first to retrive a bearer token and then keep pasting the token for each request or you may also store the token in an environment variable .
Thanks for visiting 
😁

