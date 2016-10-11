export class AccountTemplate {

    // TODO: Create model for account template and implement validate function
    private _account: any;

    constructor(account: any) { this._account = account; }

    valid() {
        return true;
    }

    getData() {
        return this._account;
    }
}
