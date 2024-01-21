require('dotenv').config();
const express=require('express')
const app=express();
const connectDB = require('./db/connect');
const authRoute=require('./routes/auth');
const resRoute=require('./routes/restro');
const cartRoute=require('./routes/cart')
const favtRoute=require('./routes/favt')
const notFound=require('./middleware/not-found')
const errorAll=require('./middleware/handleAllError')
const authentication=require('./middleware/authentication')
const bodyParser = require('body-parser');
const cors=require('cors')
const corsOptions = {
        origin: 'https://tornado-five.vercel.app', // Replace with your allowed origin
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true, // Allow cookies and other credentials
        optionsSuccessStatus: 204, // Respond with a 204 No Content for preflight requests
      };
      
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use('/api/v1/auth',cors(corsOptions),authRoute);
app.use('/api/v1/res',cors(corsOptions),resRoute);
app.use('/api/v1/cart',cors(corsOptions),authentication,cartRoute);
app.use('/api/v1/favt',cors(corsOptions),authentication,favtRoute);
app.use('/api/v1/auth/profile',cors(corsOptions),authentication,authRoute)

app.use(notFound)
app.use(errorAll)


const start=async ()=>{
        try {
                await connectDB(process.env.MONGO_URL);
                app.listen(5000,()=>{
                        console.log('running')
                })
        } catch (error) {
                console.log(error);
        }
}
start();