// requried modules
const express = require("express");
const db = require("./models");
const rowdy = require("rowdy-logger");
const morgan = require("morgan");

app.use("/comment", require("./controllers/commentsController.js"));

// config express app
const app = express();
const PORT = 3000;
const rowdyResults = rowdy.begin(app);

// express middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

/**
 * home route
 */

// GET / - READ all articles and include authors
app.get("/", async (req, res) => {
  try {
    const articles = await db.article.findAll({ include: [db.author] });
    res.json({ articles: articles });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "bad request" });
  }
});

/**
 * /authors routes
 */

// GET /authors - READ all authors
app.get("/authors", async (req, res) => {
  try {
    const authors = await db.author.findAll();
    res.json({ authors: authors });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "bad request" });
  }
});

// POST /authors - CREATE a new author
app.post("/authors", async (req, res) => {
  try {
    const newAuthor = await db.author.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      bio: req.body.bio,
    });
    res.redirect(`/authors/${newAuthor.id}`);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "bad request" });
  }
});

// GET /authors/:id - READ a specific author and inlcude their articles
app.get("/authors/:id", async (req, res) => {
  try {
    const author = await db.author.findOne({
      where: { id: req.params.id },
      include: [db.article],
    });
    res.json({ author: author });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "bad request" });
  }
});

// POST /authors/:id/articles - CREATE a new article associated with an author
app.post("/authors/:id/articles", async (req, res) => {
  try {
    const author = await db.author.findByPk(req.params.id, {
      include: db.article,
    });
    if (!author) throw new Error("author not found");
    const article = await db.article.create({
      title: req.body.title,
      content: req.body.content,
    });
    await author.addArticle(article);
    res.redirect(`/authors/${req.params.id}`);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "bad request" });
  }
});

/**
 * /articles routes
 */

// GET /articles/:id - READ a specific post and include its author
app.get("/articles/:id", async (req, res) => {
  try {
    const article = await db.article.findOne({
      where: { id: req.params.id },
      include: [db.author],
    });
    res.json({ article: article });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "bad request" });
  }
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
  rowdyResults.print();
});
