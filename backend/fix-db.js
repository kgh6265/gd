const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  ssl: { rejectUnauthorized: false }
});

async function run() {
  await client.connect();
  const res = await client.query("DELETE FROM strapi_core_store_settings WHERE key LIKE '%credential%'");
  console.log(`Deleted ${res.rowCount} corrupted UI layout rows.`);
  await client.end();
}

run().catch(console.error);
