import serverless from 'serverless-http';
import { app } from './app';
import dotenv from 'dotenv';
dotenv.config();
if (!process.env.TWITTER_TOKEN_URL) {
  throw new Error('TWITTER_TOKEN_URL must be defined');
}
if (!process.env.TWITTER_API_KEY) {
  throw new Error('TWITTER_API_KEY must be defined');
}
if (!process.env.TWITTER_API_SECRET) {
  throw new Error('TWITTER_API_SECRET must be defined');
}
module.exports.handler = serverless(app);
// app.listen(3001, () => {
//   console.log('listening');
// });
