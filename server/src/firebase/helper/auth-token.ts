import * as crypto from 'crypto';

export class AuthToken {
    private response: string;
    private token: string;
    private userId: string;
    constructor(userId: string) {
        this.response = 'Authenticated to T-Mobile';
        this.token = 'Bearer ' + crypto.randomBytes(64).toString('hex');
        this.userId = userId;
    }
}
