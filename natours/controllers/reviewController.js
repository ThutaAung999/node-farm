const Review = require('./../model/reviewModel');
const factory = require('./handlerFactory');

const catchAsync = require('./../utils/catchAsync');

exports.setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

//exports.getAllReviews = factory.getAll(Review);
exports.getAllReviews=catchAsync(async(req,res,next) =>{
    const reviews=await Review.find();

    res.status(200).json({
        status:'success',
        results: reviews.length,
        data: {
            reviews
        }    
});

});



//exports.createReview = factory.createOne(Review);
exports.createReview=catchAsync(async(req,res,next) =>{
    if(!req.body.tour) req.body.tour = req.params.tourId;
    if(!req.body.user) req.body.user = req.user.id;

    const newReview=await Review.create(req.body);

    res.status(201).json({
        status:'success',        
        data: {
            review : newReview
        }    
});

});


exports.getReview = factory.getOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
