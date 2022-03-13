const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const connect = () => {
  return mongoose.connect(
    "mongodb+srv://sheelu:sheelu123@cluster0.73b79.mongodb.net/books?retryWrites=true&w=majority"
  );
};

// USER SCHEMA
// Step 1 :- creating the schema
const userSchema = new mongoose.Schema(
    {
      firstName: { type: String, required: true },
      lastName: { type: String, required: false },
      
    },
    {
      versionKey: false,
      timestamps: true, // createdAt, updatedAt
    }
  );
  
  // Step 2 : creating the model
  const User = mongoose.model("user", userSchema); // user => users
  
  const sectionSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
    },
    {
      versionKey: false,
      timestamps: true, // createdAt, updatedAt
    }
  );
  
  // Step 2 : creating the model
const Section = mongoose.model("section", sectionSchema);  

const booksSchema = new mongoose.Schema(
    {
        sectionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "section",
            required: true,
          }, 
      name: { type: String, required: true },
      body: { type: String, required: true },
    },
    {
      versionKey: false,
      timestamps: true, // createdAt, updatedAt
    }
  ); 

  const Book = mongoose.model("book", booksSchema);

  const authorSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
          }, 
    
    },
    {
      versionKey: false,
      timestamps: true, // createdAt, updatedAt
    }
  ); 

  const Author = mongoose.model("author", authorSchema);

  const book_authorSchem= new mongoose.Schema(
    {
        bookId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "book",
            required: true,
          }, 
          authorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "author",
            required: true,
          }, 
    },
    {
      versionKey: false,
      timestamps: true, // createdAt, updatedAt
    }
  ); 


const Book_author = mongoose.model("book_author",book_authorSchem);

app.get("/users", async (req, res) => {
    try {
      const users = await User.find().lean().exec();
  
      return res.status(200).send({ users: users }); // []
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Something went wrong .. try again later" });
    }
  });
  
  app.post("/users", async (req, res) => {
    try {
      const user = await User.create(req.body);
  
      return res.status(201).send(user);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });

  app.get("/section", async (req, res) => {
    try {
      const section = await Section.find().lean().exec();
  
      return res.status(200).send({ section: section }); // []
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Something went wrong .. try again later" });
    }
  });
  
  app.post("/section", async (req, res) => {
    try {
      const section = await Section.create(req.body);
  
      return res.status(201).send(section);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });


  app.get("/author", async (req, res) => {
    try {
      const author = await Author.find().lean().exec();
  
      return res.status(200).send({ author: author }); // []
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Something went wrong .. try again later" });
    }
  });
  
  app.post("/author", async (req, res) => {
    try {
      const author = await Author.create(req.body);
  
      return res.status(201).send(author);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });

  app.get("/book_author", async (req, res) => {
    try {
      const book_author = await Book_author.find().lean().exec();
  
      return res.status(200).send({ book_author: book_author }); // []
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Something went wrong .. try again later" });
    }
  });
  
  app.post("/book_author", async (req, res) => {
    try {
      const book_author = await Book_author.create(req.body);
  
      return res.status(201).send(book_author);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });


//userId

app.get("/users/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id).lean().exec();
      // db.users.findOne({_id: Object('622893471b0065f917d24a38')})
  
      return res.status(200).send(user);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  
  app.patch("/users/:id", async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
        .lean()
        .exec();
      // db.users.update({_id: Object('622893471b0065f917d24a38')}, {$set: {req.body}})
  
      return res.status(200).send(user);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
//sectionId
app.get("/section/:id", async (req, res) => {
    try {
      const user = await Section.findById(req.params.id).lean().exec();
      // db.users.findOne({_id: Object('622893471b0065f917d24a38')})
  
      return res.status(200).send(section);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  
  app.patch("/section/:id", async (req, res) => {
    try {
      const user = await Section.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
        .lean()
        .exec();
      // db.users.update({_id: Object('622893471b0065f917d24a38')}, {$set: {req.body}})
  
      return res.status(200).send(section);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
//bookId
app.get("/book/:id", async (req, res) => {
    try {
      const user = await Book.findById(req.params.id).lean().exec();
      // db.users.findOne({_id: Object('622893471b0065f917d24a38')})
  
      return res.status(200).send(book);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  
  app.patch("/book/:id", async (req, res) => {
    try {
      const user = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
        .lean()
        .exec();
      // db.users.update({_id: Object('622893471b0065f917d24a38')}, {$set: {req.body}})
  
      return res.status(200).send(book);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
//authorId
app.get("/author/:id", async (req, res) => {
    try {
      const user = await Author.findById(req.params.id).lean().exec();
      // db.users.findOne({_id: Object('622893471b0065f917d24a38')})
  
      return res.status(200).send(author);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  
  app.patch("/author/:id", async (req, res) => {
    try {
      const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
        .lean()
        .exec();
      // db.users.update({_id: Object('622893471b0065f917d24a38')}, {$set: {req.body}})
  
      return res.status(200).send(author);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });




app.listen(4000, async () => {
    try {
      await connect();
    } catch (err) {
      console.log(err);
    }
  
    console.log("listening on port 4000");
  });
  