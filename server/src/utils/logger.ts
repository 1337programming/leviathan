export class Logger {

    constructor(private _debug: boolean) { }

    log(msg: string): void {
        if (this._debug) {
            console.log((new Date()), msg);
        }
    }

    logResonse(msg: string): string {
        this.log(msg);
        return (new Date()) + ': ' + msg;
    }
}
