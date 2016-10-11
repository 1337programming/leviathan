export class Logger {
    private static _debug: boolean;

    static setDebugMode(debug?: boolean) {
        if (debug != null) {
            this._debug = debug;
        } else {
            this._debug = false;
        }
    }

    static log(msg: string): void {
        if (this._debug) {
            console.log((new Date()), msg);
        }
    }

    static logResponse(msg: string): string {
        this.log(msg);
        return (new Date()) + ': ' + msg;
    }
}
