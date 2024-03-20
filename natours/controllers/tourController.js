const fs = require('fs');
const Tour = require('./../model/tourModel');

/* exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is : ${val} `);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "Fail",
      message: "Invalid ID provided",
    });
  }
  next();
}; */

/* exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(404).json({
      status: "Fail",
      message: "Missing name or price",
    });
  }
  next();
};
 */

exports.getAllTours = async (req, res) => {
  try {
      /*const tours = await Tour.find(
     {
      duration: 5,
      difficulty: 'easy'
    } 
    );*/

/*     const tours= await Tour.find().
    where('duration').equals(5).
    where('difficulty').equals('easy');
 */


  //BUILD THE QUERY  
  console.log("req.query:",req.query);
  
    const queryObj  = {...req.query};

    const excludedFields=['page','sort','limit','fields'];
    excludedFields.forEach(el=> delete queryObj[el]);
    
    console.log(req.query,queryObj);
    //const tours= await Tour.find(req.query);

    const query=await Tour.find(queryObj);
    
    
    //Execute the query
    const tours= query;
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
