import { NextFunction, Request, Response } from 'express';
import Recipes from './repository';
import { APIResponse } from '../common/types/server/api';
import { Recipe } from './types';

function RecipeController() {
  async function good(
    req: Request,
    res: Response<APIResponse<Recipe>>,
    next: NextFunction
  ) {
    req.log.info('Attempting to share recipe');
    const data = await Recipes(req.log, {}).get('1234');
    res.status(200).send(data);
  }

  async function bad(req: Request, res: Response, next: NextFunction) {
    req.log.info('This route has a problem');
    next(new Error('There was a problem'));
  }

  return {
    bad,
    good,
  };
}

export default RecipeController;
