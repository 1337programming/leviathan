export class QueueItemTemplate {

    // TODO: Create model for user template and implement validate function
    private _queueItem: any;

    constructor(queueItem: any) { this._queueItem = queueItem; }

    valid() {
        return true;
    }

    getData() {
        return this._queueItem;
    }
}
