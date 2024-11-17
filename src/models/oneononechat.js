'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class oneOnOneChat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  oneOnOneChat.init({
    userId: DataTypes.STRING,
    chatId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'oneOnOneChat',
  });
  return oneOnOneChat;
};