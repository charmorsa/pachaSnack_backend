import dotenv from 'dotenv';

dotenv.config();

function requireEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Falta configurar la variable de entorno ${name}`);
  }

  return value;
}

function optionalEnv(name: string, fallback: string) {
  return process.env[name] ?? fallback;
}

function numberEnv(name: string, fallback?: number) {
  const value = process.env[name];

  if (!value) {
    if (fallback !== undefined) return fallback;
    throw new Error(`Falta configurar la variable de entorno ${name}`);
  }

  const parsedValue = Number(value);
  if (Number.isNaN(parsedValue)) {
    throw new Error(`La variable ${name} debe ser un número válido`);
  }

  return parsedValue;
}

function listEnv(name: string) {
  return (process.env[name] ?? '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
}

export const env = {
  port: numberEnv('PORT', 3000),
  nodeEnv: optionalEnv('NODE_ENV', 'development'),
  corsOrigin: optionalEnv('CORS_ORIGIN', '*'),
  jwtSecret: requireEnv('JWT'),
  googleClientIds: listEnv('GOOGLE_CLIENT_IDS'),
  db: {
    host: requireEnv('DB_HOST'),
    port: numberEnv('DB_PORT'),
    user: requireEnv('DB_USER'),
    pass: requireEnv('DB_PASS'),
    name: optionalEnv('DB_NAME', 'master'),
  },
  rabbitmq: {
    url: requireEnv('RABBITMQ_HOST'),
  },
  smtp: {
    host: optionalEnv(process.env.SMTP_HOST, 'smtp.gmail.com'),
    port: numberEnv(process.env.SMTP_PORT, 465),
    secure: process.env.SMTP_SECURE !== 'false',
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
};
