const dotenv = require('dotenv');
const app = require('./app');

process.on('uncaughtException', err => {
  process.exit(1);
});

const port = process.env.PORT || 8080;
const server = app.listen(port, () =>
  console.log(`App running on port ${port}`)
);
