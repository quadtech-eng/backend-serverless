import * as dotenv from 'dotenv'
import pg from 'pg'

dotenv.config()

export const environment = {
  local: {
    dialect: process.env.DB_DIALECT,
    dialectModule: pg,
    host: process.env.DB_HOST,
    logging: true,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    define: {
      timestamps: true,
      underscored: false,
      underscoredAll: false,
    },
  },
  dev: {
    dialect: process.env.DB_DIALECT,
    dialectModule: pg,
    host: process.env.DB_HOST,
    logging: false,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: true,
    dialectOptions: {
      timezone: '00:00',
      ssl: {
        require: true,
        rejectUnauthorized: false,
        ca: '"rds-combined-ca-bundle.pem"',
      },
    },
    define: {
      timestamps: true,
      underscored: false,
      underscoredAll: false,
    },
  },
  uat: {
    dialect: process.env.DB_DIALECT,
    dialectModule: pg,
    host: process.env.DB_HOST,
    logging: false,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: true,
    dialectOptions: {
      timezone: '00:00',
      ssl: {
        require: true,
        rejectUnauthorized: false,
        ca: '"rds-combined-ca-bundle.pem"',
      },
    },
    define: {
      timestamps: true,
      underscored: false,
      underscoredAll: false,
    },
  },
  prod: {
    dialect: process.env.DB_DIALECT,
    dialectModule: pg,
    host: process.env.DB_HOST,
    logging: false,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: true,
    dialectOptions: {
      timezone: '00:00',
      ssl: {
        require: true,
        rejectUnauthorized: false,
        ca: '"rds-combined-ca-bundle.pem"',
      },
    },
    define: {
      timestamps: true,
      underscored: false,
      underscoredAll: false,
    },
  },
}
