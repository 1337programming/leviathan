export class UserTemplate {

    // TODO: Create model for user template and implement validate function
    private _user: any;

    constructor(user: any) { this._user = user; }

    valid() {
        return true;
    }

    getData() {
        return this._user;
    }
}

export class DepositTemplate {

    // TODO: Create model for deposit template and implement validate function
    private _deposit: any;

    constructor(deposit: any) { this._deposit = deposit; }

    valid() {
        return true;
    }

    getData() {
        return this._deposit;
    }
}
