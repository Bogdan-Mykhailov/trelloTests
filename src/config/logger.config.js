const pino = require('pino')

const loggerConfig = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
      ignore: 'pid.hostname',
    }
  }
})

module.exports = loggerConfig;
