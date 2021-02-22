"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class article extends Model {
    static associate(models) {
      models.article.belongsTo(models.author);
      models.article.hasMany(models.comment);
    }
  }
  article.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      authorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "article",
    }
  );
  return article;
};
