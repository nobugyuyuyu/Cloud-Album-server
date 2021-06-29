const { body, validationResult } = require('express-validator');
// parallel processing
module.exports= validations => {
    return async (req, res, next) => {
      await Promise.all(validations.map(validation => validation.run(req)));
  
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
 
      res.status(200).json({ 
        status:1,
        msg: errors.errors[0].msg
      });
    };
};