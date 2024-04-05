module.exports = fn => {
  return (req, res, next) => {
    console.log("error in catchAsync")
    fn(req, res, next).catch(next);
  };
};
