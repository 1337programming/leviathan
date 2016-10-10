var router = require('express').Router();
const validator = require('email-validator');
const logger = require('../util');
const account = require('../firebase/account');

// Login
router.post('/login', function (req, res) {
    var params = req.body;
    if (!params) return res.status(400).send(logger.logResponse('Error, Bad request, missing fields'));
    if (!validator.validate(params.email))  return res.status(400).send(logger.logResponse('Error, Bad request, invalid email'));
    account.login(params.email, params.password, function (status, response) {
        return res.status(status).send(response);
    });
});

router.post('/register', function (req, res) {
    var params = req.body;
    if (!params) return res.status(400).send(logger.logResponse('Error, Bad request, missing fields'));
    account.register(params, function (status, response) {
        return res.status(status).send(response);
    });
});

module.exports = router;
