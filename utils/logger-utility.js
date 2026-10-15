const fs = require('node:fs');
const path = require('node:path');

const levels = { debug: 10, info: 20, warn: 30, error: 40 };
const minimumLevel = levels[process.env.LOG_LEVEL || 'info'] || levels.info;
const logFile = path.join(__dirname, '..', 'logging', 'automation.log');

function safeFields(fields = {}) {
  return Object.fromEntries(Object.entries(fields).filter(([key]) => !/(password|token|authorization|secret|cookie)/i.test(key)));
}

function log(level, message, fields = {}) {
  if (!(level in levels) || levels[level] < minimumLevel) return;
  const entry = JSON.stringify({ timestamp: new Date().toISOString(), level, message, ...safeFields(fields) });
  const stream = process.env.CI ? process.stdout : process.stderr;
  stream.write(`${entry}\n`);
  if (!process.env.CI) {
    fs.mkdirSync(path.dirname(logFile), { recursive: true });
    fs.appendFileSync(logFile, `${entry}\n`, { encoding: 'utf8', mode: 0o600 });
  }
}

module.exports = {
  debug: (message, fields) => log('debug', message, fields),
  info: (message, fields) => log('info', message, fields),
  warn: (message, fields) => log('warn', message, fields),
  error: (message, fields) => log('error', message, fields),
};

