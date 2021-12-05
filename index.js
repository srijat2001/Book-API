const express = require("express");
const database = require("./database");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

//Intialize Express
const booky = express();

booky.use(bodyParser.urlencoded({extended:true}));
booky.use(bodyParser.json());

//Establish Database Connection
mongoose.connect("mongodb+srv://srija:Srijareddy7@shapeai.uk9c5.mongodb.net/Booky?retryWrites=true&w=majority",
    {
        useNewUrlParser : true,
        useUnifiedTopology : true
    }
).then(() => console.log("Connection Established!!!"));

//Models
const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");

//GET REQUESTS
/*
GET ALL BOOKS
Route           /books
Description     Get All Books
Access          public
Parameters      None
*/ 
booky.get("/books",async (req,res) =>{
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
})

/*
GET BOOK BASED ON ID
Route           /books
Description     Get book based on id
Access          public
Parameters      Book isbn
*/ 
booky.get("/books/:isbn",async (req,res)=>{
    const getSpecificBook = await BookModel.findOne({ISBN : req.params.isbn})
    if(!getSpecificBook) {
        return res.json({error : `No book having isbn ${req.params.isbn} is found`});
    }
    return res.json(getSpecificBook);
});

/*
GET BOOKS BASED ON CATEGORY
Route           /books/category
Description     Get books based on category
Access          public
Parameters      Book category
*/ 
booky.get("/books/category/:category", async (req,res) => {
    const books_category = await BookModel.findOne({category : req.params.category})
    if(!books_category) {
        return res.json({error : `No book having category ${req.params.category} is found`});
    }
    return res.json(books_category);
})

/*
GET BOOKS BASED ON LANGUAGE
Route           /books/language
Description     Get books based on language
Access          public
Parameters      Book Language
*/
booky.get("/books/language/:language",async (req,res) =>{
    const book_language = BookModel.findOne({language : req.params.language});
    if(!book_language) {
        return res.json({error : `No book having language ${req.params.language} is found`});
    }
    return res.json(book_language);
})

/*
GET BOOKS BASED ON AUTHORS
Route           /books/author
Description     Get books based on Authors
Access          public
Parameters      Author id
*/
booky.get("/books/author/:authorid",(req,res)=>{
    const books = database.books.filter(
        (book) => book.author.includes(req.params.authorid)
    )
    if(books.length === 0){
        return res.json({error : `No book is present written by author of id ${req.params.authorid}`});
    }
    return res.json({books : books});
})


/*
GET ALL AUTHORS
Route           /authors
Description     Get all Authors
Access          public
Parameters      NONE
*/
booky.get("/authors",async (req,res)=>{
    const getAllAuthors = AuthorModel.find();
    return res.json(getAllAuthors);
})

/*
GET AUTHOR BASED ON ID
Route           /authors
Description     Get Author based on id
Access          public
Parameters      Author id
*/
booky.get("/authors/:id",async (req,res)=>{
    const getSpecificAuthor = AuthorModel.findOne({id : req.params.id});
    if(!getSpecificAuthor){
        return res.json({error : `No Author of id ${req.params.id} found`});
    }
    return res.json(getSpecificAuthor);
})


/*
Route           /authors/books/:name
Description     Get Author based on id
Access          public
Parameters      Author id
*/
booky.get("/authors/books/:name",(req,res)=>{
    const authors = database.authors.filter(
        (author) => author.books.includes(req.params.name)
    )
    if(authors.length === 0){
        res.json({error : `No book of name ${req.params.name} found in Authors`})
    }
    res.json({authors : authors});
})

/*
Route           /publications
Description     Get all publications
Access          public
Parameters      NONE
*/
booky.get("/publications",(req,res)=>{
    return res.json({publications : database.publications});
})

/*
Route           /publications
Description     Get publication based on id
Access          public
Parameters      Publication id
*/
booky.get("/publications/:id",(req,res)=>{
    const SpecificPublication = database.publications.filter(
        (publication) => publication.id === req.params.id
    )
    if(SpecificPublication.length === 0){
        res.json({error : `No publication with id ${req.params.id} found`});
    }
    res.json({publication : SpecificPublication});
})

/*
Route           /publications/books/:name
Description     Get publications based on books
Access          public
Parameters      Book name
*/
booky.get("/publications/books/:name",(req,res)=>{
    const publications = database.publications.filter(
        (publication) => publication.books.includes(req.params.name)
    )
    if(publications.length === 0){
        res.json({error : `No book of name ${req.params.name} found in publications`})
    }
    res.json({publications : publications});
})

//ADD NEW BOOK
/*
Route           /book/new
Description     POST new book
Access          public
Parameters      NONE
*/
booky.post("/books/new",(req,res)=>{
    const newBook = req.body;
    database.books.push(newBook);
    return res.json({updatedBooks : database.books})
})

//ADD NEW AUTHOR
/*
Route           /author/new
Description     POST new Author
Access          public
Parameters      NONE
*/
booky.post("/authors/new",(req,res)=>{
    const newAuthor = req.body;
    database.authors.push(newAuthor);
    return res.json({updatesAuthors : database.authors});
})

//ADD NEW PUBLICATION
/*
Route           /publication/new
Description     POST new publication
Access          public
Parameters      NONE
*/
booky.post("/publications/new",(req,res)=>{
    const newPublication = req.body;
    database.publications.push(newPublication);
    return res.json({updatedPublications : database.publications});
})

//PUT REQUEST
booky.put("/publications/update/book/:isbn",(req,res)=>{
    
})

//Listen Server
booky.listen(3000,()=>{
    console.log("Server is runnning on port 3000 !!!")
});

