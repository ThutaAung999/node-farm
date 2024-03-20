const mongoose = require('mongoose');
const dotenv = require('dotenv');
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
    console.log('DB connection successful!')})
  .catch(err => console.error('DB connection error:', err)); // Add error handling

  const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
