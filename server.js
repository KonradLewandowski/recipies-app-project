const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  process.exit(1);
});
dotenv.config({ path: './config.env' });
const app = require('./app');

const port = 3000 || 8080;
const server = app.listen(port, () =>
  console.log(`App running on port ${port}`)
);
