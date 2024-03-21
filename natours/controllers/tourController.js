const fs = require('fs');
const Tour = require('./../model/tourModel');

exports.aliasTopTours= (req, res, next) => {
  req.query.limit='5';
  req.query.sort='-ratingAverage,price';
  req.query.fields = 'name,price,ratingAverage,summary,difficulty';
  next();
};

class APIFeatures{
	constructor(query, queryString){
      this.query = query;
      this.queryString = queryString;
  }

  filter(){

    
  }
}


exports.getAllTours = async (req, res) => {
  try {
    //BUILD THE QUERY  
    //1A)Filtering
  
    const queryObj  = { ...req.query};    
    const excludedFields=['page','sort','limit','fields'];
    excludedFields.forEach(el=> delete queryObj[el]);        
    
    //1B Advanced filtering
    let queryStr=JSON.stringify(queryObj);    
    queryStr=queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match=>`$${match}`);
    //console.log(" JSON.parese(queryStr) :   " , JSON.parse(queryStr)); 

    let query= Tour.find( JSON.parse(queryStr));

    //2-Sorting 
    if(req.query.sort){
      /* 
        query=query.sort(req.query.sort);
        //sort('price  ratingAverage')    
     */

        const sortBy= req.query.sort.split(',').join(' ');
        //console.log(sortBy);
        query=query.sort(sortBy);      
    }else{
      query=query.sort('-createdAt');
    }


    //3 Fields Limiting

    if(req.query.fields){
      const fields= req.query.fields.split(',').join(' ');
      //console.log(fields);
      query=query.select(fields);
    }else{
      query=query.select('-__v');
    }


    //4) Pagination
    const page=req.query.page*1|| 1 ;
    const limit=req.query.limit * 1 || 100 ;
    const skip = (page-1)*limit;

    //page=2&limit=10
    query=query.skip(skip).limit(limit);

    if(req.query.page){
      const numTours= await Tour.countDocuments();
      if(skip>=numTours)throw new Error("This page does not exist");
    }

    //Execute the query
    const tours=await  query;
    console.log("tours",tours);

    res.status(200).json({
      status: 'Success',
      requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (e) {
    res.status(404).json({
      status: 'Fail',
      message: e.message,
    });
  }
};


exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    return res.status(200).json({
      status: 'Success',
      data: { tour },
    });
  } catch (e) {
    res.status(404).json({
      status: 'Fail',
      message: e.message,
    });
  }
};

exports.createTour = async (req, res) => {
  //console.log(req.body);
  try {
    // const newTour = new Tour({})
    // newTour.save()

    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'Success',
      data: {
        tour: newTour,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: 'Fail',
      message:e
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      status: 'Success',
      data: {
        tour
      },
    });
  } catch (e) {
    res.status(400).json({
      status: 'Fail',
      message: 'Invalid data sent',
    });
  }
};

exports.deleteTour =async (req, res) => {

  try{

    await Tour.findByIdAndDelete(req.params.id);

    return res.status(204).json({
      status: 'Success',
      data: null,
    });
  }catch(err){

    res.status(400).json({
      status: 'Fail',
      message: 'Invalid data sent',
    });
  }

};
  