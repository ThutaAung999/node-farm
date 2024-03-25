const mongoose = require('mongoose');
const dotenv = require('dotenv');

//uncaught exception
process.on('uncaughtexception', err => {
  console.log('UNCAUGHT EXCEPTIONS! 💥 Shutting down...');
  console.log(err.name,err.message);

    process.exit(1);//shut down the server

});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
//  .connect(process.env.DATABASE_LOCAL, {
  .connect(DB, {    
     useNewUrlParser: true,
     useUnifiedTopology: true // Add this line to use the new server discovery and monitoring engine    
  })
  .then((con) =>{
    //console.log(con.connections) 
    console.log('DB connection successful!')});
//  .catch(err => console.error('DB connection error:', err)); // Add error handling

  const port = process.env.PORT || 3000;
  const server =app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});


//unhandled project rejection
process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);//shut down the server
  });
});
