import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import 'module-alias/register';
import cors from 'cors';
import * as dotenv from 'dotenv';
import connect from './utils/dbConnection';
import * as routes from './routes/index';

connect();
dotenv.config();

const app = express();

const corsOption = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

/* Middlewares */
app.use(helmet());
app.use(cors(corsOption));
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '50mb' }));

/* Routes Middleware*/
app.use('/api', routes.postRoutes);
app.use('/api', routes.authRoutes);
app.use('/api/mocks', routes.fakeDataRoutes);

app.use('/api/users', routes.userRoutes);
app.use('/api/comments', routes.commentRoutes);
app.use('/api/upload', routes.fileUploadRoutes);

app.use('/api/like-posts', routes.likePostRoutes);
app.use('/api/report-posts', routes.reportPostRoutes);
app.use('/api/static-pages', routes.incrementPageRoutes);
app.use('/api/child-comments', routes.childCommentsRoutes);

app.use('/api/post-categories', routes.postCategoryRoutes);
app.use('/api/report-comments', routes.reportCommentRoutes);
app.use('/api/report-child-comments', routes.reportChildCommentRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
