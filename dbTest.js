const models = require("./models");

const makeComment = async () => {
  models.comment.create({
    nameOfCreater: "Darren",
    content: "testing comment",
  });
};

// makeComment();

const db = require("./models");

async function dbTest() {
  const article = await db.article.findOne();
  const comment = await db.comment.create({
    name: "Paul Allen",
    content: "This is really neat! Thanks for posting.",
    articleId: article.id,
  });
  console.log(comment);
}

dbTest();
