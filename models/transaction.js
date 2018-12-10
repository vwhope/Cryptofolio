"use strict";
module.exports = function(sequelize, DataTypes) {
  // map between the model and table
  // attributes createdAt and updatedAt are automatically added
  // 'Transaction' in orange after .define is the model name
  var Transaction = sequelize.define("Transaction", {
    // either buy or sell
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // may want to rename as "coin" for consistency?
    currency: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // number of currency (coins) bought or sold
    quantity: {
      type: DataTypes.DECIMAL(10, 5),
      allowNull: false,
      defaultValue: 0.0
    },
    // the price at time of transaction
    price: {
      type: DataTypes.DECIMAL(10, 5),
      allowNull: false,
      defaultValue: 0.0
    }
  });

  Transaction.associate = function(models) {
    // Transaction belongs to Portfolio
    Transaction.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Transaction;
};
