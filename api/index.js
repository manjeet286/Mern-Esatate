import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
import authRouter from "./routes/auth.route.js"
import userRouter from "./routes/user.route.js"
import cors from "cors"
import cookieParser from "cookie-parser";
import listingRouter   from "./routes/listing.roue.js"
import path from "path"
dotenv.config();
mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });


  const _dirname= path.resolve();


const app= express();
app.use(cors({
  origin: 'http://localhost:5173', // your frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials:true

}));
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth" ,authRouter);


app.use("/api/user" ,userRouter);
app.use('/api/listing', listingRouter);

app.use(express.static(path.join(_dirname, '/client/dist')))
app.get('*' ,(req,res)=>{
   res.sendFile(path.join(_dirname,'client' ,'dist', 'index.html'))
})
app.use((err, req,res,next)=>{
  const statusCode=err.statusCode || 500;
  const message =err.message || "Internal Server Error"
  return res.status(statusCode).json({
    success:false,
    statusCode,
    message
  })

})


app.listen(5000, ()=>{
      console.log("Server is running on port 5000!!");
})