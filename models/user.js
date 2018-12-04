"use strict";
module.exports = function(sequelize, DataTypes) {
  // map between the model and table
  // attributes createdAt and updatedAt are automatically added
  // 'User' in orange after .define is the model name
  var User = sequelize.define("User", {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  //
  User.associate = function(models) {
    // A single User can only have one Portfolio
    User.hasOne(models.Portfolio);
  };
  //
  User.associate = function(models) {
    // A single User can have many Transactions
    User.hasMany(models.Transaction);
  };
  return User;
};
