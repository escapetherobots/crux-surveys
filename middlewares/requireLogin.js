module.exports = (req, res, next) => {
  // req = request | res = response | next = similar to done then triggers the next middleware
  if(!req.user){
    // this will stop the middleware chain
    return res.status(401).send({error: 'You must log in'});
  }
  // otherwise continue through the middleware chain
  next();
};
