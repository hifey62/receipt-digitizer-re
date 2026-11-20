import express   from "express"
import type { Request , Response } from "express";
import cors from "cors"

const app = express();
const PORT = Number(process.env.PORT) || 3000
app.use(cors())


app.get('/',(req : Request , res : Response)=>{
        res.sendStatus(200)
})
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})