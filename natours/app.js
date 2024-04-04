const express = require('express');
const morgan = require('morgan');

const path=require('path');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');

const reviewRouter = require('./routes/reviewRoutes');



const hpp=require('hpp');
const helmet = require('helmet');


const app = express();

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));


// 1) GLOBAL MIDDLEWARES
//Serving staic files
app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers
app.use(helmet());

//Development Logging
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

//Body parser , reading data from body into req.body
app.use(express.json({limit:'10kb'}));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  })
);



//Test middleware
app.use((req, res, next) => {
  //console.log("custom middleware to print current time")
  req.requestTime = new Date().toISOString();
//console.log("req.headers:",req.headers);  
  next();
});


// 3) ROUTES
app.get('/',(req,res) => {
  res.status(200).render('base',{
    tour:'The Forest Hiker',
    user:'Htein'
  });
})



app.get('/overview',(req,res) => {
  res.status(200).render('overview',{
    title: " All Tours"
  })
})

app.get('/tour',(req,res) => {
  res.status(200).render('tour',{
    title: "The Forest Hiker Tour"
  })
})


app.use('/api/v1/tours', tourRouter);//Prod အတွက် middleware မှာ error တက်နေ
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
  console.log("invalid request middleware")
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
