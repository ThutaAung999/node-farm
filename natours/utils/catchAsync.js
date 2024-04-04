module.exports = fn => {
  return (req, res, next) => {
    console.log("error error error")
    fn(req, res, next).catch(next);
  };
};
