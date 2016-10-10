export class Logger {
    private _debug: boolean;
    constructor(debug?: boolean) {
        if (debug != null) {
            this._debug = debug;
        }
    }

    log(msg: string): void {
        if (this._debug) {
            console.log((new Date()), msg);
        }
    }

    logResponse(msg: string): string {
        this.log(msg);
        return (new Date()) + ': ' + msg;
    }
}
