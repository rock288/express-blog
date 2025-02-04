require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`Welcome Blog start with port: ${PORT}`);
});

const shutdown = () => {
  console.log('Shutting down server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0); // Đảm bảo tiến trình thoát hoàn toàn
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
