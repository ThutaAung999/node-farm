const fs = require('fs');
const Tour = require('./../model/tourModel');
const APIFeatures = require('./../utils/apiFeatures');

const catchAsyncErr = require('./../utils/catchAsyncErr');

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingAverage,price';
  req.query.fields = 'name,price,ratingAverage,summary,difficulty';
  next();
};

exports.getAllTours = catchAsyncErr(async (req, res,next) => {
  //Execute the query
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const tours = await features.query;

  console.log('tours', tours);

  res.status(200).json({
    status: 'Success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
});

exports.getTour = catchAsyncErr( async (req, res,next) => {
  
    const tour = await Tour.findById(req.params.id);

    return res.status(200).json({
      status: 'Success',
      data: { tour },
    });
  
});

exports.createTour = catchAsyncErr(async (req, res,next) => {
  const newTour = await Tour.create(req.body);
  return res.status(201).json({
    status: 'Success',
    data: {
      tour: newTour,
    },
  });
});


exports.updateTour = catchAsyncErr( async (req, res,next) => {  
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  return res.status(200).json({
    status: 'Success',
    data: { tour },
  });

});    



exports.deleteTour = catchAsyncErr( async (req, res,next) => {
  
    await Tour.findByIdAndDelete(req.params.id);

    return res.status(204).json({
      status: 'Success',
      data: null,
    });
  
});

exports.getTourStats = catchAsyncErr(async (req, res,next) => {  
    const stats = await Tour.aggregate([
      {
        $match: { ratingAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          //_id:'$ratingAverage',
          _id: { $toUpper: '$difficulty' },
          numTours: { $sum: 1 },
          numRatings: { $sum: '$ratingQuantity' },
          avgRating: { $avg: '$ratingAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      {
        $sort: { avgPrice: 1 },
      },
      /* {
        $match:{_id:{$ne:'EASY'}}
      } */
    ]);

    return res.status(200).json({
      status: 'Success',
      data: {
        stats,
      },
    });    
});

exports.getMonthlyPlan = catchAsyncErr( async (req, res,next) => {
  
    const year = req.params.year * 1; //2021

    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          tours: { $push: '$name' },
        },
      },
      {
        $addFields: { month: '$_id' },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: { numTourStarts: -1 },
      },
      {
        $limit: 6,
      },
    ]);

    return res.status(200).json({
      status: 'Success',
      data: {
        plan,
      },
    });

});
