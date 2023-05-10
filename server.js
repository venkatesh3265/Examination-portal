import express from 'express';
import dotenv from 'dotenv';
import connectDb from './db/connect.js';
dotenv.config()
const app = express();

const port = process.env.PORT || 4000;

app.get('/',(req,res) =>{
    res.send('Welcome');
})



import examRoutes from './routes/examRoutes.js';
app.use('/api/v1',examRoutes);

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