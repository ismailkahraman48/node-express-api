import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
// import userRouter from './routes/user.route';
// import notFound from './middlewares/notFound.middleware';
// import errorHandler from './middlewares/error.middleware';

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

// app.use('/api/users', userRouter);
// app.use(notFound);
// app.use(errorHandler);

export default app;