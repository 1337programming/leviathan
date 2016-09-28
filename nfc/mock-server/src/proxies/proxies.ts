import * as express from 'express';

export function DefineProxies(emitter) {
  let router = express.Router();
  
  router.get('/', (req, res) => {
    return res.status(200).send({ message: 'Test' });
  });
  
  return router;
  
}
