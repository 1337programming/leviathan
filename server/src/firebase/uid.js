var uid = module.exports = {};
const firebase = require('firebase');
const fb_instance = require('./init/setup');
const logger = require('../util');
const path = require('path');

var uidRef = fb_instance.db.ref('/uid');

uid.createMapping = function (user_id, uid, data, callback) {
    findMapping(null, uid, function (status, mapping_id) {
        if (mapping_id) {
            callback(400, logger.logResponse('Error, Mapping exists for UID: ' + uid));
        } else {
            // TODO: Validate user_id exists
            var newMapping = uidRef.push();
            var mappingObject = {};
            mappingObject.uid = uid;
            mappingObject.user_id = user_id;
            mappingObject.data = data;
            newMapping.set(mappingObject).then(function () {
                callback(200, logger.logResponse('Success, Mapping created for uid: ' + uid + ', and user_id: ' + user_id));
            }).catch(function (error) {
                callback(500, logger.logResponse('Error, Adding Mapping : ' + error));
            });
        }
    });
};

uid.deleteMapping = function (user_id, uid, callback) {
    findMapping(user_id, uid, function (status, mapping_id) {
        if (!mapping_id) {
            user_id ? logger.log('Success, Mapping for user id (DNE): ' + user_id) : logger.log('Success, Mapping for UID (DNE): ' + uid);
            callback(200, null);
        } else {
            var mapping_ref = uidRef.child(mapping_id);
            mapping_ref.remove(function (error) {
                if (error) callback(500, logger.logResponse('Error, Removing UID mapping: ' + error));
                callback(200, logger.logResponse('Success, UID Mapping deleted deleted: ' + mapping_id));
            });
        }
    });
};

uid.getUser_id = function (uid, callback) {
    findMapping(null, uid, function (status, mapping_id) {
        if (mapping_id) {
            // callback(400, logger.logResponse('Error, Mapping exists for UID: ' + uid));
            getMapping(mapping_id, function (mapping_snapshot) {
                if (!mapping_snapshot) {
                    callback(500, logger.logResponse('Error, Could not find mapping for mapping id: ' + mapping_id));
                } else {
                    callback(200, mapping_snapshot.user_id);
                }
            });
        } else {
            callback(400, logger.logResponse('Error, Mapping for UID DNE: ' + uid));
        }
    });
}

function findMapping(user_id, uid, callback) {
    var uid_ref = (user_id ? uidRef.orderByChild('user_id').equalTo(user_id) : uidRef.orderByChild('uid').equalTo(uid));
    uid_ref.once('value', function (mapping_snapshot) {
        if (mapping_snapshot.exists()) {
            mapping_snapshot.forEach(function (item) {
                user_id ? logger.log('Success, Getting mapping for user_id: ' + user_id) : logger.log('Success, Getting mapping for uid: ' + uid);
                callback(200, item.key);
            });
        } else {
            user_id ? logger.log('Success, No mapping for uid: ' + user_id) : logger.log('Success, No mapping for uid: ' + uid);
            callback(200, null);
        }
    });
}

function getMapping(mapping_id, callback) {
    var mapping_ref = uidRef.child(mapping_id);
    mapping_ref.once('value', function (mapping_snapshot) {
        mapping_snapshot.exists() ? callback(mapping_snapshot.val()) : callback(null);
    });
}