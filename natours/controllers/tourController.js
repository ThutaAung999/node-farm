const fs = require("fs");
const Tour=require("./../model/tourModel");


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

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(404).json({
      status: "Fail",
      message: "Missing name or price",
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  console.log("getAllTours");
  console.log(req.requestTime);

  res.status(200).json({
    status: "Success",
    requestedAt: req.requestTime,
    /* results: tours.length,
    data: {
      tours,
    }, */
  });
};

exports.getTour = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1;
  /* const tour = tours.find((el) => el.id === id);
  //console.log(tour);

  return res.status(200).json({
    status: "Success",
    data: { tour },
  }); */
};

exports.createTour = (req, res) => {
  //console.log(req.body);
  res.status(201).json({
    status: "Success"
    /* data: {
      tour: newTour
    } */
   });
};

exports.updateTour = (req, res) => {
  return res.status(200).json({
    status: "Success",
    data: {
      tour: "<Updated Tour Here>",
    },
  });
};

exports.deleteTour = (req, res) => {
  return res.status(204).json({
    status: "Success",
    data: null,
  });
};
