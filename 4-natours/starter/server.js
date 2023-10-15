const dotenv = require('dotenv');

dotenv.config({
  path: './.env',
});

const app = require('./app');

// 4) START THE SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
