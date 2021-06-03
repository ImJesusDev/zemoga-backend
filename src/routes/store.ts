import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import DynamoClient from '../utils/dynamo';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router.post(
  '/users',
  [
    body('firstName').not().isEmpty().withMessage('First name is required'),
    body('lastName').not().isEmpty().withMessage('Last name is required'),
    body('username').not().isEmpty().withMessage('Username is required'),
    body('title').not().isEmpty().withMessage('Title is required'),
    body('photo').not().isEmpty().withMessage('Photo is required'),
    body('description').not().isEmpty().withMessage('Description is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { firstName, lastName, username, title, photo, description } =
      req.body;

    const item = {
      userId: uuidv4(),
      firstName,
      lastName,
      username,
      title,
      photo,
      description,
    };

    const client = new DynamoClient();
    try {
      await client.store(item);
      res.status(201).send(item);
    } catch (err) {
      res.status(400).send(err);
    }
  }
);
export { router as storeProfileRouter };
