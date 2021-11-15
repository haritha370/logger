const winston = require('winston');

const logger= winston.createLogger({
transports:
    new winston.transports.File({
    filename: 'logs/server.log',
    format:winston.format.combine(
        winston.format.timestamp({format: 'MM-DD-YYYY HH:mm:ss'}),
        winston.format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
    )}),
});
module.exports=logger;