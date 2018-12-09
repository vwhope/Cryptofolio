"use strict";
module.exports = function(sequelize, DataTypes) {
  // map between the model and table
  // the attributes of createdAt and updatedAt are automatically added
  // 'Portfolio' in orange after .define is the model name
  var Portfolio = sequelize.define("Portfolio", {
    coin: {
      type: DataTypes.STRING,
      allowNull: false
    },
    symbol: {
      type: DataTypes.STRING,
      allowNull: false
    },
    holdings: {
      type: DataTypes.DECIMAL(10, 5),
      allowNull: false,
      defaultValue: 0
    },
    own: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  Portfolio.associate = function(models) {
    // A single Portfolio belongsTo a single User
    Portfolio.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Portfolio;
};
