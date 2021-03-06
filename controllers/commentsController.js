// instantiate the express router
const router = require("express").Router();
// require models
const db = require("../models");

// routes should be mounted on the router here

// GET /authors/:id - READ a specific author and inlcude their articles
// GET /comments/:id - READ a specific article and inlcude their comments
router.get("/comments/:id", async (req, res) => {
  try {
    const article = await db.article.findOne({
      where: { id: req.params.id },
      include: [db.comment],
    });
    res.json({ article: article });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "bad request" });
  }
});

// POST /authors/:id/articles - CREATE a new article associated with an author

// POST /articles/:id/comments - CREATE a new comment associated with an article
router.post("/articles/:id/comments", async (req, res) => {
  try {
    const article = await db.article.findByPk(req.params.id, {
      include: db.comment,
    });
    if (!article) throw new Error("article not found");
    const comment = await db.comment.create({
      nameOfCreater: req.body.nameOfCreater,
      content: req.body.content,
    });
    await article.addComment(comment);
    res.redirect(`/articles/${req.params.id}`);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "bad request" });
  }
});

router.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
  rowdyResults.print();
});

// export the router so we can require in server.js
module.exports = router;

// GET /comments - READ all comments
/*
router.get("/comments", async (req, res) => {
  try {
    const comments = await db.comment.findAll();
    res.json({ comments: comments });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "bad request" });
  }
});
*/

// POST /comments - CREATE a new comment
/*
router.post("/comments", async (req, res) => {
  try {
    const newComment = await db.comment.create({
      nameOfCreater: req.body.nameOfCreater,
      content: req.body.content,
    });
    res.redirect(`/comments/${newComment.id}`);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "bad request" });
  }
});
*/
