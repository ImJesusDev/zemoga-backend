import express from 'express';
import { getProfileRouter } from './routes/show-profile';
import { storeProfileRouter } from './routes/store';
import { updateProfileRouter } from './routes/update-profile';
import { recentTweetsRouter } from './routes/recent-tweets';
import { errorHandler } from './middlewares/error-handler';
import cors from 'cors';
const app = express();

app.use(cors());
app.set('trust proxy', true);
app.use(express.json());
app.use(getProfileRouter);
app.use(updateProfileRouter);
app.use(storeProfileRouter);
app.use(recentTweetsRouter);
app.use(errorHandler);
app.get('*', (req, res) => {
  res.status(404).send('Not Found');
});
export { app };
