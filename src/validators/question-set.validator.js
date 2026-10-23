const { body, validationResult } = require('express-validator');

const validateQuestionSet = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 150 })
    .withMessage('Title must not exceed 150 characters'),
  body('subject')
    .optional()
    .isLength({ max: 60 })
    .withMessage('Subject must not exceed 60 characters'),
  body('is_public')
    .optional()
    .isBoolean()
    .withMessage('is_public must be a boolean value'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validateQuestionSet,
};
