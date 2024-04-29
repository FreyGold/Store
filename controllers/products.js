const Product = require('../models/product');
const asyncWrapper = require('../middleware/asyncWrapper');
///
////// view
///search
// make an empty object and store the search criteria
exports.viewAllProducts = asyncWrapper(async (req, res, next) => {
  const excluded = ['page', 'sort', 'limit', 'fields'];
  let match = { ...req.query };
  if (!match.featured) match.featured = true;
  excluded.forEach((el) => delete match[el]);
  if (match.name) {
    match.name = { $regex: match.name };
  }
  ///////// advanced filtering
  /// 1B) Adv. Filtering
  let queryStr = JSON.stringify(match);
  queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (m) => `$${m}`);
  result = Product.find(JSON.parse(queryStr));
  //// sorting
  if (req.query.sort) {
    const sortBy = query1.sort.split(',').join(' ');
    result.sort(sortBy);
  } else {
    const sortBy = '-createdAt';
    result.sort(sortBy);
  }
  if (req.query.fields) {
    fieldsSelect = query1.fields.split(',').join(' ');
    result.select(fieldsSelect);
  }
  //// pagination
  const limit = Number(req.query.limit) || 6;
  const page = Number(req.query.page) || 1;
  const skip = (page - 1) * limit;
  result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({
    status: 'success',
    total: products.length,
    data: { products },
  });
});
