var { validationResult } = require("express-validator");

/* Check for validation errors using express-validator */
module.exports.validationHandler = (req, res, next) => {

    const errors = validationResult(req).array();
    console.log(errors);

    if (errors.length !== 0) {
        return res.status(400).json({
            error: errors[0].msg,
            status: false,
        });
    }

    next();
};
