import express, { Request, Response } from 'express';
import DynamoClient from '../utils/dynamo';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router.put(
  '/users/:userId',
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
    const userId = req.params.userId;

    const { firstName, lastName, username, title, photo, description } =
      req.body;

    const item = {
      userId,
      firstName,
      lastName,
      username,
      title,
      photo,
      description,
    };
    try {
      const client = new DynamoClient();
      const user = await client.find(userId);
      if (!user) {
        return res.status(404).send({
          message: 'User not found',
        });
      }
      await client.store(item);
      res.status(200).send(item);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }
);

export { router as updateProfileRouter };
