#Leviathan Socket server

##Architecture
Under construction

##API

##ACCOUNT
###Login
 curl http://localhost:8081/account/login -H 'Content-Type: application/json' -XPOST -d '{"email":"test.test@1337programming.com","password":"password"}' --insecure
###Register
 curl http://localhost:8081/account/register -H 'Content-Type: application/json' -XPOST -d '{"email":"test.test@1337programming.com","password":"password","firstname":"test","lastname":"testy","phone":"Android S6","number":"4256679082"}' --insecure

##USER
###Get user (replace 12345 with user_id)
 curl http://localhost:8081/user/12345 --insecure
###Add user (Should user register user so they can login)
 curl http://localhost:8081/user/ -H 'Content-Type: application/json' -XPOST -d '{"email":"test.test@1337programming.com","password":"password","firstname":"test","lastname":"testy","phone":"Android S6","number":"4256679082", "uid":"12345678"}' --insecure
###Update user (replace 12345 with user id)
 curl http://localhost:8081/user/12345 -H 'Content-Type: application/json' -XPUT -d '{"email":"test.test@1337programming.com","password":"password","firstname":"test","lastname":"testy","phone":"Android S6","number":"4256679082"}' --insecure
###Delete user  (replace 12345 with user id)
 curl http://localhost:8081/user/12345 -XDELETE --insecure

##QUEUE
###Get queue
 curl http://localhost:8081/queue/ --insecure
###Delete queue
 curl http://localhost:8081/queue/ -XDELETE --insecure
###Add user to queue (Replace 12345 with user id)
 curl http://localhost:8081/queue/push/12345 -H 'Content-Type: application/json' -XPOST -d '{"reason":"Reason typed by user", "flow":"What the user selected to get here"}' --insecure
###Get top user
 curl http://localhost:8081/queue/poll --insecure
###Get specific user (replace 12345 with user id)
curl http://localhost:8081/queue/poll/12345 --insecure

##UID
###Add UID to USER_ID mapping (Replace --USER_ID-- and --PHONE-ID-- with actual values)
 curl http://localhost:8081/mapping/--USER_ID--/--PHONE-ID-- -H 'Content-Type: application/json' -XPOST -d '{"phone":"new phone"}' --insecure
###Get USER_ID from mapping (Replace --PHONE_ID-- with actual value). This will also emit a signal with user id to client
 curl http://localhost:8081/mapping/user/--PHONE-ID-- --insecure
###Get PHONE_ID from mapping (Replace --USER_ID-- with actual value). This will also emit a signal with user id to client
 curl http://localhost:8081/mapping/phone/--USER_ID-- --insecure
###Delete Mapping for userID mapping (Replace --USER_ID-- with actual value)
 curl http://localhost:8081/mapping/user/--USER_ID-- -XDELETE --insecure
###Delete Mapping for phoneId mapping (Replace --PHONE_ID-- with actual value)
 curl http://localhost:8081/mapping/phone/--PHONE_ID-- -XDELETE --insecure