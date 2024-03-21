const { check, validationResult } = require("express-validator");

const validateCreatePlayer = [
  check("name")
    .trim()
    .escape()
    .isLength({ min: 3, max: 25 })
    .withMessage("The name must be between 3 and 25 characters long."),
  check("jersey")
    .trim()
    .escape()
    .isNumeric()
    .isLength({ min: 1, max: 25 })
    .withMessage("The jersey must be between 1 and 25 characters long."),
  check("position")
    .trim()
    .escape()
    .isLength({ min: 3, max: 20 })
    .withMessage("The position must be between 3 and 20 characters long."),
  check("team")
    .trim()
    .escape()
    .isLength({ min: 3, max: 20 })
    .withMessage("The team must be between 3 and 20 characters long."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).send(errors.array());
    next();
  },
];

module.exports = {
  validateCreatePlayer,
};
