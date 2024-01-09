// seedData.js
// seedData.js
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const Author = require("../models/authorModel");
const Book = require("../models/booksModel");

const seedData = async () => {
    try {
        // Clear existing data (optional)
        await Author.deleteMany({});
        await Book.deleteMany({});

        // Generate fake authors
        const numAuthors = 5;
        const authors = [];
        for (let i = 0; i < numAuthors; i++) {
            const author = new Author({
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                phone_no: faker.phone.number(),
                books: [], // Initialize an empty array for books
            });
            await author.save();
            authors.push(author);
        }

        // Generate fake books
        const numBooks = 10;
        for (let i = 0; i < numBooks; i++) {
            const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
            const book = new Book({
                title: faker.lorem.sentence(),
                author: randomAuthor._id,
            });
            await book.save();

            // Update Author's books array with the new book ID
            randomAuthor.books.push(book._id);
            await randomAuthor.save();
        }

        console.log("Data seeding completed!");
    } catch (error) {
        console.error("Error seeding data:", error);
    } finally {
        console.log("done seeding");
    }
};

module.exports = seedData;
