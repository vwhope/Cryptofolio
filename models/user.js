'use strict';
module.exports = (sequelize, DataTypes) => {
    // map between the model and table
    // attributes createdAt and updatedAt are automatically added
    // 'User' in orange after .define is the model name
    const User = sequelize.define('User', {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false
        },  
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    //
    User.associate = function(models) {
        // A single User can only have one Portfolio
        User.hasOne(models.Portfolio);
    };
    //
    return User;
};
