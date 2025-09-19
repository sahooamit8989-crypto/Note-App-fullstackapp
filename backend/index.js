import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import noteRoutes from './routes/note.route.js'

const app = express()
dotenv.config()
const port = process.env.PORT || 4002


//database connection
try{
    mongoose.connect(process.env.MONGO_URL)
    console.log("connected to mongodb")

}catch(error){
    console.log("error to connected to mongodb",error)

}
//routing middlewere
app.use(express.json())
app.use(cors())
app.use("/api/v1/noteapp",noteRoutes)

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});


app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})
