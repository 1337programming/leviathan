import {User} from './users';

let user1 = new User();
user1.name = 'Paul';
user1.reason = 'My bill is too high';
user1.info = 'Since my family started playing Pokemon Go my bill has skyrocketed.';
user1.plan = '$100/mo - Family plan, 4 lines, 5GB shared data $93 in data overcharges last month';
let user2 = new User();
user2.name = 'Sarah';
user2.reason = 'My bill is too high';
user2.info = 'Since my family started playing Pokemon Go my bill has skyrocketed.';
user2.plan = '$100/mo - Family plan, 4 lines, 5GB shared data $93 in data overcharges last month';
let user3 = new User();
user3.name = 'Eric';
user3.reason = 'My bill is too high';
user3.info = 'Since my family started playing Pokemon Go my bill has skyrocketed.';
user3.plan = '$100/mo - Family plan, 4 lines, 5GB shared data $93 in data overcharges last month';
let user4 = new User();
user4.name = 'Pablo';
user4.reason = 'My bill is too high';
user4.info = 'Since my family started playing Pokemon Go my bill has skyrocketed.';
user4.plan = '$100/mo - Family plan, 4 lines, 5GB shared data $93 in data overcharges last month';
let user5 = new User();
user5.name = 'Sabah';
user5.reason = 'My bill is too high';
user5.info = 'Since my family started playing Pokemon Go my bill has skyrocketed.';
user5.plan = '$100/mo - Family plan, 4 lines, 5GB shared data $93 in data overcharges last month';

export const MockUsers:Array<User> = [user1, user2, user3, user4, user5];
