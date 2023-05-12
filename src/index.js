const  express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config();


const userRoute = require('../routes/user');
const noteRoute = require('../routes/note');

const app = express();



app.use(express.json());
app.use(cors());



app.use((req,res,next)=> {

    console.log("HTTP Method - "+req.method + " "+ " , URl -"+req.url);
    next();

});

app.get('/',(req,res)=>{


    res.send("Notes Api from azadtom!");


});


app.use("/user",userRoute);
app.use("/note",noteRoute);


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL)
.then(()=>{


    app.listen(PORT,()=>{


        console.log('server has started! '+PORT); 
    
    
    });

 
}).catch((error)=>{

    console.log(error);

});

