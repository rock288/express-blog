require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`Welcome Blog start with port: ${PORT}`);
});

process.on('SIGINT', () => {
  server.close(() => console.log(`Exit server`));
});
