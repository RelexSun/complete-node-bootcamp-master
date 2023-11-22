module.exports = (err, req, res, next) => {
  // console.log(err.stack);

  // we do this cuz we already have a lot of error status code so we don't it want to interfere with eachother

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
};
