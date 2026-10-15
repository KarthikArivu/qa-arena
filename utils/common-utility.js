function requiredEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Required environment variable ${name} is missing. See .env.example.`);
  return value;
}

function toBoolean(value, fallback = false) {
  if (value === undefined) return fallback;
  return ['1', 'true', 'yes'].includes(String(value).toLowerCase());
}

module.exports = { requiredEnv, toBoolean };

