export class UserTemplate {

    // TODO: Create model for user template and implement validate function
    private user: any;

    constructor(user: any) { this.user = user; }

    valid() {
        return true;
    }

    getData() {
        return this.user;
    }
}
