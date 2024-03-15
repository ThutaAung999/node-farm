const fs=require('fs');
const express=require('express');
const app = express();

app.use(express.json());


app.use((req,res,next)=>{
   req.requestTime=new Date().toISOString();
    next()
});

app.use((req,res,next)=>{
    console.log('Hello from the middleware');    
    next()
});

/*
app.get('/',(req, res) => {
    res.status(404).json(
            {
                "message":'Hello Fro the Server Side!',
                app:"Natours"
            },
            );
})

app.post('/',(req,res) => {
    res.send("Yo can post to this endpoint");
});

*/



const tours= JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
    );



const getAllTours=(req,res) => {

    console.log("getAllTours");
    console.log(req.requestTime);

    res.status(200).json({
        status:'Success',
        requestedAt:req.requestTime,
        results : tours.length,
        data:{
            tours
        }
    });
}


const getTour=(req,res) => {
    
    console.log(req.params);

    const id=req.params.id*1;
    const tour=tours.find(el=>el.id===id)

    //console.log(tour);
    if(!tour){
        return res.status(404).json({
            status:'Error',
            message:'Invalid ID provided'
        })
    }
    
    res.status(200).json({
        status:'Success',
        //data:{ tour},
    });
};


const createTour = (req, res) => {
    //console.log(req.body);

    const newId=tours[tours.length - 1].id+1;
    const newTour=Object.assign({id:newId},req.body);

    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
        res.status(201).json({
            status:'Success',            
            data:{
                tour:newTour
            }
        })
    })    
}



const updateTour=(req,res) => {

    if(req.params.id*1>tours.length){
        return res.status(404).json({
            status:'Fail',
            message:'Invalid ID provided'
        });
    }

    res.status(200).json({
        status:'Success',
        data:{
            tour:'<Updated Tour Here>'
        }    
});

}


const deleteTour = (req,res) => {

    if(req.params.id*1>tours.length){
        return res.status(404).json({
            status:'Fail',
            message:'Invalid ID provided'
        });
    }

    res.status(204).json({
        status:'Success',
        data:null
});

}


//app.get('/api/v1/tours',getAllTours);
//app.post('/api/v1/tours', createTour);

//app.get('/api/v1/tours/:id',getOneTour);
//app.patch('/api/v1/tours/:id',updateTour);
//app.delete('/api/v1/tours/:id',deleteTour);


app.route('/api/v1/tours')
.get(getAllTours)
.post(createTour);


app.route('/api/v1/tours/:id')
.get(getTour)
.patch(updateTour)
.delete(deleteTour);

const port=3000;
app.listen(port,()=>{

   console.log(`App listening on port : ${port}...` );

});