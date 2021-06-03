import express, { Request, Response } from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/recent-tweets', async (req: Request, res: Response) => {
  // Username from request
  const { username } = req.query;
  // Variables from environment
  const tokenUrl = process.env.TWITTER_TOKEN_URL!;
  const timelineUrl = process.env.TWITTER_TIMELINE_URL!;
  const apiKey = process.env.TWITTER_API_KEY!;
  const apiSecret = process.env.TWITTER_API_SECRET!;
  // Twitter API token
  let token = null;

  // Make request to get token
  try {
    const response = await axios.post(
      tokenUrl,
      `grant_type=client_credentials`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${Buffer.from(
            `${apiKey}:${apiSecret}`
          ).toString('base64')}`,
        },
      }
    );
    token = response.data.access_token;
  } catch (error) {
    res.send({ error });
  }

  // Make request to get most recent tweets
  if (token) {
    try {
      const tweetsResponse = await axios.get(
        `${timelineUrl}?screen_name=${username}&count=5`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      res.send(tweetsResponse.data);
    } catch (error) {
      res.send({ error });
    }
  }
});

export { router as recentTweetsRouter };
