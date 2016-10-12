export class MappingTemplate {

    // TODO: Create model for phone template and implement validate function
    private _mapping: any;

    constructor(mapping: any) { this._mapping = mapping; }

    valid() {
        return true;
    }

    getData() {
        return this._mapping;
    }
}
