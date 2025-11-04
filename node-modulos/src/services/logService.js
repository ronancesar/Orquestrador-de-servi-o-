const { getDb } = require('../config/mongo');

/**
 * @param {string} message 
 * @param {object} context 
 */
const logEvent = async (level, message, context = {}) => {
    try {
        
        const db = getDb();

      
        const logsCollection = db.collection('logs');

       
        const logDocument = {
            timestamp: new Date(),
            level: level,
            message: message,
            context: context
        };

       
        await logsCollection.insertOne(logDocument);
       

    } catch (error) {
      
        console.error('[LogService] Falha ao salvar log no MongoDB:', error.message);
    }
};

module.exports = {
    logEvent
};