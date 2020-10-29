import { magic } from '../../lib/magic';
import { encryptSession } from '../../lib/iron';
import { setTokenCookie } from '../../lib/auth-cookies';
import sqlite from 'sqlite3';
sqlite.verbose();

const db = new sqlite.Database('.db.db', (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('database created! 🎅');
});

db.run(
  `CREATE TABLE IF NOT EXISTS users(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL, username TEXT NOT NULL)`,
  [],
  (err) => {
    console.log(err);
  }
);
db.close();

export default async function login(req, res) {
  try {
    console.log(req.body);
    if (req.body.username) {
      const db = new sqlite.Database('./.db.db', (err) => {
        if (err) {
          return console.log(err);
        }
        console.log('connected to db!');
      });
      db.run(`INSERT INTO users(email, username) VALUES(?, ?)`, [req.body.email, req.body.username], (err) => {
        if (err) {
          return console.log(err);
        }
        console.log(`inserted ${req.body.email} and ${req.body.username} into database`);
      });
      db.close((err) => {
        if (err) {
          return console.log(err.message);
        }
        console.log('db closed!');
      });
    }
    const didToken = req.headers.authorization.substr(7);
    const metadata = await magic.users.getMetadataByToken(didToken);
    const session = { ...metadata };
    // The token is a string with the encrypted session
    const token = await encryptSession(session);
    setTokenCookie(res, token);
    res.status(200).send({ done: true });
  } catch (error) {
    res.status(error.status || 500).end(error.message);
  }
}
