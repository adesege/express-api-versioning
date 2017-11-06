import express from 'express';

const router = express.Router();

router
  .get(
    '/',
    (req, res) => res
      .status(200)
      .send({
        message: 'You got to the client endpoint successfully'
      })
  );

export default router;
