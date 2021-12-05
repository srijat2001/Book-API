const books = [
    {
        ISBN: "12345Book",
        title: "Getting started with MERN",
        pubDate: "2021-11-25",
        language: "en",
        numPage: 250,
        author: [1,2],
        publications: [1],
        category: ["tech", "programming", "education"]
    }
];
    
const authors = [
    {
        id: 1,
        name: "Aradhana",
        books: ["12345Book","Book3"]
    },
    {
        id: 3,
        name: "Elon Musk",
        books: ["Book3"]
    },
    {
        id : 2,
        name : "Srija",
        books: ["Book3"]
    }
];
    
const publications = [
    {
        id: 1,
        name: "Writex",
        books: ["12345Book"]
    },
    {
        id: 2,
        name: "Pentex",
        books: ["Book3"]
    }
];

module.exports = {books,authors,publications}
    