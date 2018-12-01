'use strict';
module.exports = (sequelize, DataTypes) => {
    // map between the model and table
    // the attributes of createdAt and updatedAt are automatically added
    // 'Portfolio' in orange after .define is the model name
    const Portfolio = sequelize.define('Portfolio', {
        coin: {
            type: DataTypes.STRING,
            allowNull: false
        },  
        holdings: {
            type: DataTypes.INTEGER,
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
        // A single Portfolio can have many Transactions
        Portfolio.hasMany(models.Transaction);
    };
    
    Portfolio.associate = function(models) {
        // A single Portfolio belongsTo a single User
        Portfolio.belongsTo(models.User, { foreignKey: {
            allowNull: false
        }
    });
    
};

return Portfolio;
};
