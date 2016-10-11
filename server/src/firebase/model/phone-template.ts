export class PhoneTemplate {

    // TODO: Create model for phone template and implement validate function
    private _phone: any;

    constructor(phone: any) { this._phone = phone; }

    valid() {
        return true;
    }

    getData() {
        return this._phone;
    }
}
