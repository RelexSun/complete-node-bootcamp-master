const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Handling unhandled EXCEPTION or error (Globally and should be on top of the app cuz of the waterfall execution)
process.on('uncaughtException', err => {
  console.log('UNHANDLED EXCEPTION! Shutting down');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './.env' });
const app = require('./app');

const DB = process.env.DATABASE_URL.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;

// server
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// Handling unhandled rejection or error (Globally)
process.on('unhandledRjection', err => {
  console.log('UNHANDLED REJECTION! Shutting down');
  console.log(err.name, err.message);

  // close the server after finishing all the request
  server.close(() => {
    process.exit(1);
  });
});
