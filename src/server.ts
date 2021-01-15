import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import routes from './routes';
import 'reflect-metadata';
import './database';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));

app.use(routes);
//middleware global errors
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statuscode).json({
      status: 'error',
      message: err.message,
    });

  }
  console.log(err.message);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });


});
app.listen(3333, () => {
  console.log('Server Started!');
});
