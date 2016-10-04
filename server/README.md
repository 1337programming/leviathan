#Leviathan Socket server

##Architecture
Under construction

##API

##ACCOUNT
###Login
 curl https://localhost:8443/auth/login -H 'Content-Type: application/json' -XPOST -d '{"email":"test.test@1337programming.com","password":"password"}' --insecure
###Register
 curl https://localhost:8443/auth/register -H 'Content-Type: application/json' -XPOST -d '{"email":"test.test@1337programming.com","password":"password","firstname":"test","lastname":"testy","phone":"Android S6","number":"4256679082"}' --insecure

##USER
###Get user (replace 12345 with user_id)
 curl https://localhost:8443/user/12345--insecure
###Add user (Should user register user so they can login)
 curl https://localhost:8443/user/ -H 'Content-Type: application/json' -XPOST -d '{"email":"test.test@1337programming.com","password":"password","firstname":"test","lastname":"testy","phone":"Android S6","number":"4256679082", "uid":"12345678"}' --insecure
###Update user (replace 12345 with user id)
 curl https://localhost:8443/user/12345 -H 'Content-Type: application/json' -XPUT -d '{"email":"test.test@1337programming.com","password":"password","firstname":"test","lastname":"testy","phone":"Android S6","number":"4256679082"}' --insecure
###Delete user  (replace 12345 with user id)
 curl https://localhost:8443/user/12345 -XDELETE --insecure

##QUEUE
###Get queue
 curl https://localhost:8443/queue/ --insecure
###Delete queue
 curl https://localhost:8443/queue/ -XDELETE --insecure
###Add user to queue (replace 12345 with user id)
 curl https://localhost:8443/queue/push/12345--insecure
###Get top user
 curl https://localhost:8443/queue/poll --insecure
###Get specific user (replace 12345 with user id)
curl https://localhost:8443/queue/poll/12345 --insecure

##UID
###Add UID to USER_ID mapping (Replace --USER_ID-- and --UID_VALUE-- with actual values)
 curl https://localhost:8443/uid/--USER_ID--/--UID_VALUE-- -H 'Content-Type: application/json' -XPOST -d '{"phone":"new phone"}' --insecure
###Get USER_ID from mapping (Replace --UID_VALUE-- with actual value). This will also emit a signal with user id to client
 curl https://localhost:8443/uid/read/12345 --insecure
###Delete UID mapping (Replace --UID_VALUE-- with actual value)
 curl https://localhost:8443/uid/--UID_VALUE-- -XDELETE --insecure
