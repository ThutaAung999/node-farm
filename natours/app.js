const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const rateLimit = require('express-rate-limit');


const app = express();

// 1) GLOBAL MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);


app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log("custom middleware to print current time")
  req.requestTime = new Date().toISOString();
console.log("req.headers:",req.headers);  
  next();
});


// 3) ROUTES
app.use('/api/v1/tours', tourRouter);//Prod အတွက် middleware မှာ error တက်နေ
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  console.log("invalid request middleware")
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
