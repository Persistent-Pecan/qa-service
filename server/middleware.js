module.exports = {
  logger: (req, res, next) => {
    console.log('=======================');
    console.log(`METHOD: ${req.method}`);
    console.log(`URL: ${req.url}`);
    console.log(`DATA: ${JSON.stringify(req.body)}`);
    console.log(`QUERY PARAMS: ${JSON.stringify(req.query)}`);
    console.log('=======================');
    next();
  },
};
