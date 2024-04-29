const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db/connect');
const asyncWrapper = require('./middleware/asyncWrapper');
const Product = require('./models/product');
const productsJson = require('./products.json');
dotenv.config({ path: './config.env' });

const start = asyncWrapper(async () => {
  await connectDB(process.env.DATABASE);
  await Product.deleteMany();
  await Product.create(productsJson);
  console.log('done importing');
  process.exit(0);
});

start();
