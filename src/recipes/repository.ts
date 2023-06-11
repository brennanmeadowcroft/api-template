import Logger from '../common/utils/Logger';
import { Recipe } from './types';

export default function Recipes(logger: Logger, db: any) {
  async function get(id: string): Promise<Recipe> {
    logger.debug('Getting recipe detail data', { id });
    return Promise.resolve({ id: '1234', name: 'Cookies' });
  }

  return {
    get,
  };
}
