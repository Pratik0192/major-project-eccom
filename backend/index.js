import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoutes.js"
import productRouter from "./routes/productRoutes.js"

//app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

//CORS configuration
const corsOptions = {
  origin: 'https://major-project-backend-bay.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}

//middleware
app.use(cors(corsOptions))
app.use(express.json())


//api endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);

app.get('/', (req, res) => {
  res.send("API working")
})

app.listen(port, ()=>console.log('Server Started on PORT: '+port))