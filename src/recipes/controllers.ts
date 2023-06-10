import { NextFunction, Request, Response } from 'express';

function RecipeController() {
  async function share(req: Request, res: Response, next: NextFunction) {
    req.log.info('Attempting to share recipe');
    next(new Error('There was a problem'));
    // res.status(200).send('Hello');
  }

  return {
    share,
  };
}

export default RecipeController;
