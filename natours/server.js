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

const tourSchema=new mongoose.Schema({
  name:{
    type:String,
    required:[true,'Tour must have a  name'],
    unique:true
  },
  rating :{
    type:Number,
    default:4.5
  },
  price:{
    type:Number,
    required:[true,'Tour must have a price']
  }
});

const Tour=mongoose.model('Tour',tourSchema);


const testTour=new Tour({
  name:'The Part Camper',
  price:997
});


testTour.save().then(doc=>{
  console.log(doc);
}).catch(err=>{
  console.log("Error: " , err);
});

  const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
