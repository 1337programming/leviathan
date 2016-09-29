var account = module.exports = {};
const firebase = require('firebase');
const fb_instance = require('./init/setup');
const logger = require('../util');
const crypto = require('crypto');

const user = require('./user');
var accountRef = fb_instance.db.ref('/account');

account.login = function (email, password, callback) {
    findAccount(null, email, function (status, account_id) {
        if (!account_id) {
            callback(404, logger.logResponse('Error, Account not found for email: ' + email));
        } else {
            getAccount(account_id, function (account_snapshot) {
                if (account_snapshot) {
                    if (password !== account_snapshot.password) {
                        callback(403, logger.logResponse('Error, Incorrect Password for user with email: ' + email));
                    } else {
                        var object = {};
                        object.response = 'Authenticated to T-Mobile';
                        object.token = 'Bearer ' + crypto.randomBytes(64).toString('hex');
                        object.user_id = account_snapshot.user_id;
                        logger.log('Success, Authenticating user with email: ' + email);
                        callback(200, object);
                    }
                } else {
                    callback(500, logger.logResponse('Error, Retrieving account for: ' + account_id));
                }
            });
        }
    });
};

account.register = function (account_template, callback) {
    validateAccountTemplate(account_template, function (valid) {
        if (!valid) {
            callback(400, logger.logResponse('Error, Bad account template for Register'));
        } else {
            findAccount(null, account_template.email, function (status, account_id) {
                if (account_id) {
                    callback(400, logger.logResponse('Error, User already exists with email: ' + account_template.email));
                } else {
                    user.createUser(account_template, function (status, response) {
                        if (status !== 200) {
                            callback(status, logger.logResponse('Error, Could not Create user'));
                        } else {
                            var newAccount = accountRef.push();
                            var accountObject = {};
                            accountObject.email = account_template.email;
                            accountObject.password = account_template.password;
                            accountObject.user_id = response;
                            newAccount.set(accountObject).then(function () {
                                callback(200, logger.logResponse('Success, Account created: ' + newAccount.key));
                            }).catch(function (error) {
                                callback(500, logger.logResponse('Error, Adding account : ' + error));
                            });
                        }
                    });
                }
            });
        }
    });
};

account.deleteAccount = function (user_id, callback) {
    findAccount(user_id, null, function (status, account_id) {
        if (!account_id) {
            logger.log('No Match, Retrieving account: ' + user_id);
            callback(200, null);
        } else {
            var account_ref = accountRef.child(account_id);
            account_ref.remove(function (error) {
                if (error) callback(500, logger.logResponse('Error, Removing account: ' + error));
                callback(200, logger.logResponse('Success, account deleted: ' + account_id));
            });
        }
    });
}

function validateAccountTemplate(account_template, callback) {
    // TODO: Validate template
    callback(true);
}

function findAccount(user_id, email, callback) {
    var account_ref = (user_id ? accountRef.orderByChild('user_id').equalTo(user_id) : accountRef.orderByChild('email').equalTo(email));
    account_ref.once('value', function (accounts_snapshot) {
        if (accounts_snapshot.exists()) {
            accounts_snapshot.forEach(function (item) {
                user_id ? logger.log('Success, Getting account for user: ' + user_id) : logger.log('Success, Getting account for email: ' + email);
                callback(200, item.key);
            });
        } else {
            user_id ? logger.log('Success, No matching account for user: ' + user_id) : logger.log('Success, No matching account for email: ' + email);
            callback(200, null);
        }
    });
}

function getAccount(account_id, callback) {
    var account_ref = accountRef.child(account_id);
    account_ref.once('value', function (account_snapshot) {
        account_snapshot.exists() ? callback(account_snapshot.val()) : callback(null);
    });
}