const models = require("./models");

const makeComment = async () => {
  models.comment.create({
    nameOfCreater: "Darren",
    content: "testing comment",
  });
};

makeComment();
