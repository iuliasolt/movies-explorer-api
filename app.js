require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const handelError = require('./middlewares/handelError');
const router = require('./routes/index');

const rateLimit = require('./middlewares/rateLimit');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { messageAppStart, messageConnectDB, messageServerWillFall } = require('./utils/constants');

const { PORT = 3000, DB_ADDRESS = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const app = express();

app.use(helmet());
app.use(rateLimit);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(messageServerWillFall);
  }, 0);
});

app.use(requestLogger);

app.use(cookieParser());
app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(handelError);

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
})
  .then(() => {
    console.log(messageConnectDB);
  });

app.listen(PORT, () => {
  console.log(`${messageAppStart} ${PORT}`);
});
