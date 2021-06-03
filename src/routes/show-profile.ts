import express, { Request, Response } from 'express';
import DynamoClient from '../utils/dynamo';

const router = express.Router();

router.get('/users/:userId', async (req: Request, res: Response) => {
  const userId = req.params.userId;

  const client = new DynamoClient();

  try {
    const user = await client.find(userId);
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
});
export { router as getProfileRouter };
