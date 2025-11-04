const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); 
const Analysis = sequelize.define('Analysis', {
 
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    orderId: {
        type: DataTypes.STRING,
        allowNull: false
    },


    status: {
        type: DataTypes.STRING,
        allowNull: false
    },

    
    antiFraudResponse: {
        type: DataTypes.JSON,
        allowNull: true
    },

    creditResponse: {
        type: DataTypes.JSON,
        allowNull: true
    }

    
});

module.exports = Analysis;