var router = require('express').Router();
const user = require('../firebase/user');
const logger = require('../util');

router.post('/', function (req, res) {
    var params = req.body;
    if (!params) return res.status(400).send(logger.logResponse('Error, Bad params, for CREATE user'));
    user.createUser(params, function (status, response) {
        return res.status(status).send(response);
    });
});

router.get('/:user_id', function (req, res) {
    var user_id = req.params.user_id;
    if (!user_id) return res.status(400).send(logger.logResponse('Error, Bad params, for GET user'));
    user.getUser(user_id, function (status, response) {
        return res.status(status).send(response);
    });
});

router.put('/:user_id', function (req, res) {
    var params = req.body;
    var user_id = req.params.user_id;
    if (!params || !user_id) return res.status(400).send(logger.logResponse('Error, Bad params, for UPDATE user'));
    user.updateUser(user_id, params, function (status, response) {
        return res.status(status).send(response);
    });
});

router.delete('/:user_id', function (req, res) {
    var user_id = req.params.user_id;
    if (!user_id) return res.status(400).send(logger.logResponse('Error, Bad params, for DELETE user'));
    user.deleteUser(user_id, function (status, response) {
        return res.status(status).send(response);
    });
});

module.exports = router;