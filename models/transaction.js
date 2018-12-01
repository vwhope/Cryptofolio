"use strict";
module.exports = function(sequelize, DataTypes) {
  // map between the model and table
  // attributes createdAt and updatedAt are automatically added
  // 'Transaction' in orange after .define is the model name
  var Transaction = sequelize.define("Transaction", {
    // either buy or sell
    transactionType: {
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
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    // the price at time of transaction
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0.0
    },
    // since createdAt and updatedAt are auto created,
    // we may not need this field - determine keep or trash
    date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });

  Transaction.associate = function(models) {
    // Transaction belongs to Portfolio
    Transaction.belongsTo(models.Portfolio, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Transaction;
};
