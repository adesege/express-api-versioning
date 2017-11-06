import express from 'express';

const router = express.Router();

router.get('/', (req, res) => res
  .send({
    message: 'Hello, you got to this end point successfully'
  }));

export default router;
