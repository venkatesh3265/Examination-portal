import express from 'express';
import dotenv from 'dotenv';
import connectDb from './db/connect.js';
import errorHandlerMiddleware from './middleware/error-handler.js'
import cors from 'cors'
dotenv.config()
const app = express();
app.use(cors())

const port = process.env.PORT || 4000;

app.get('/',(req,res) =>{
    res.send('Welcome');
})

app.use(express.json());

import examRoutes from './routes/examRoutes.js';
app.use('/api/v1',examRoutes);


app.use(errorHandlerMiddleware)

const start = async () => {
    try {
         await connectDb(process.env.MONGO_URL);
         app.listen(port,()=>{
            console.log(`server is listening on ${port}....`);
        })
        
    }
    catch(error){
        console.log(error);
    }

}

start();