const express = require('express');
const app = express();
const dotenv = require('dotenv');
const storeRoute = require('./routes/products');
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE;
connectDB(DB);

app.use(express.json());
app.use('/api/v1/store/', storeRoute);
app.use(notFound);

app.listen(process.env.PORT, () => {
  console.log('app running');
});
