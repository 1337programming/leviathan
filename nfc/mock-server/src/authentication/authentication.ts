export class Authentication {
  
  private port:number;
  
  constructor(port:number) {
    this.port = port;
  }
  
  public allowCrossDomain(req, res, next) {
    res.header('Access-Control-Allow-Origin', `*`);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  }
}
