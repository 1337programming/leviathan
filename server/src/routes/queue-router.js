var router = require('express').Router();
const queue = require('../firebase/queue');
const logger = require('../util');

router.get('/', function (req, res) {
    queue.getQueue(function (status, response) {
        return res.status(status).send(response);
    });
});

router.delete('/', function (req, res) {
    queue.emptyQueue(function (status, response) {
        return res.status(status).send(response);
    });
});

router.post('/push/', function (req, res) {
    var params = req.body;
    if (!params) return res.status(400).send(logger.logResponse('Error, Bad params for ADD to QUEUE'));
    queue.pushUser(params, function (status, response) {
        return res.status(status).send(response);
    });
});

router.get('/poll/:user_id', function (req, res) {
    var user_id = req.params.user_id;
    if (!user_id) return res.status(400).send(logger.logResponse('Error, Bad params for POLL from QUEUE'));
    queue.removeSpecificUser(user_id, function (status, response) {
        return res.status(status).send(response);
    });
});

router.get('/poll', function (req, res) {
    queue.removeTopUser(function (status, response) {
        return res.status(status).send(response);
    });
});

module.exports = router;