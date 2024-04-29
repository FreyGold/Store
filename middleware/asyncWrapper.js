const asyncWrapper = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      console.log(err);
      res.status(400).json({
        status: 'fail',
        message: { err },
      });
    });
  };
};
module.exports = asyncWrapper;
