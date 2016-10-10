var router = require('express').Router();
const UID = require('../firebase/uid');
const logger = require('../util');

router.post('/:user_id/:uid', function (req, res) {
    var uid = req.params.uid;
    var user_id = req.params.user_id;
    var params = req.body;
    if (!uid || !user_id) return res.status(400).send(logger.logResponse('Error, Bad params for CREATE UID mapping'));
    UID.createMapping(user_id, uid, params, function (status, response) {
        return res.status(status).send(response);
    });
});

router.delete('/:uid', function (req, res) {
    var uid = req.params.uid;
    if (!uid) return res.status(400).send(logger.logResponse('Error, Bad params for DELETE UID mapping'));
    UID.deleteMapping(null, uid, function (status, response) {
        return res.status(status).send(response);
    });
});

router.get('/read/:uid', function (req, res) {
    var httpIO = req.httpIO;
    var httpsIO = req.httpsIO;
    var uid = req.params.uid;
    if (!uid) return res.status(400).send(logger.logResponse('Error, Bad params for DELETE UID mapping'));
    UID.getUser_id(uid, function (status, response) {
        if (status !== 200) {
            return res.status(status).send(null);
        } else {
            var data = {};
            data.user_id = response;
            httpIO.emit('user_scanned', data);
            httpsIO.emit('user_scanned', data);
            return res.status(200).send(logger.logResponse('Success finding mapping for uid: ' + uid + ' , found user_id: ' + data.user_id));
        }
    });
});

module.exports = router;