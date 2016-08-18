import express from 'express';
import getStats from './stats';
import scraper from './scraper';

const router = express.Router();

router.get('/', (req, res) => res.status(200).send(getStats()));

router.post('/', async (req, res, next) => {
  try {

  } catch (e) {
    next(e);
  }
});

router.use((err, req, res, next) => {
  switch(err.code) {

  }
  return res.status(500).send({
    code: 'unknown_error',
    message: 'An unknown error has occured',
  })
});

export default router;
