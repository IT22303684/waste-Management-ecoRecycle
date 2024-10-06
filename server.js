import 'express-async-errors';

import * as dotenv from 'dotenv';
dotenv.config();

import express, { application } from 'express';
const app = express();
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';
app.use(express.json());





// routers
import RItemRouter from './routes/RItemRouter.js';
import BankRouter from './routes/BankRouter.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import CompanyRouter from './routes/CompanyRoute.js';
import routePathRouter from './routes/routePathRouter.js';
import vehicleRouter from './routes/vehicleRouter.js';
import requestRouter from './routes/requestRouter.js';
import paymentRouter from './routes/paymentRouter.js';




//public
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';



//middleware
import errorHandelerMiddleware from './middleware/errorHandelerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';

const PORT = process.env.PORT || 5100;


// cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});


const __dirname = dirname(fileURLToPath(import.meta.url));


if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}



app.use(express.static(path.resolve(__dirname, './Client/dist')));
app.use(cookieParser());
app.use(express.json());





app.get('/api/v1/test', (req, res) => {
  res.json({ msg: 'Test route' });
});



app.use('/api/v1/Bank', BankRouter);
app.use('/api/v1/RItems', authenticateUser, RItemRouter);
app.use('/api/v1/users', authenticateUser, userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/routePath', routePathRouter);
app.use('/api/v1/vehicle', vehicleRouter);
app.use('/api/v1/request', requestRouter);
app.use('/api/v1/payments', paymentRouter);



app.use('/api/v1/Company', authenticateUser, CompanyRouter);


app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './Client/dist', 'index.html'));
});









app.use('*', (req, res) => {
  res.status(404).json({ msg: 'route not found' });
});


app.use(errorHandelerMiddleware);


try {
  console.log("hi")
  await mongoose.connect(process.env.MONGO_URL)
  console.log("hg")
  app.listen(PORT, () => {
    console.log("na")
    console.log(`Server is running on ${PORT}`);
  });
} catch (error) {
  console.log("my")
  console.log(error);
}

