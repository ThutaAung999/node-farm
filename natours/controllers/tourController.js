const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is : ${val} `);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "Fail",
      message: "Invalid ID provided",
    });
  }
  next();
};

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
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  //console.log(tour);

  return res.status(200).json({
    status: "Success",
    data: { tour },
  });
};

exports.createTour = (req, res) => {
  //console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      

        if (err) {
            // Handle error
            console.log(err);
            return res.status(500).json({
                status: 'Error',
                message: 'Failed to create tour'
            });
        }

      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
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
