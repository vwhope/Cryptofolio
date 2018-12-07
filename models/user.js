"use strict";
module.exports = function(sequelize, DataTypes) {
  // map between the model and table
  // attributes createdAt and updatedAt are automatically added
  // 'User' in orange after .define is the model name
  var User = sequelize.define("User", {
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
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  //
  User.associate = function(models) {
    // A single User can only have one Portfolio
    User.hasMany(models.Portfolio, {
      onDelete: "cascade"
    });

    User.hasMany(models.Transaction, {
      onDelete: "cascade"
    });
  };
  return User;
};
