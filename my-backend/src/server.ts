import express   from "express"
import type { Request , Response } from "express";
import cors from "cors"
import multer from "multer"
import Groq from "groq-sdk";
import "dotenv/config";


const uploads = multer({
    storage : multer.memoryStorage(),
    limits : {fileSize : 3 * 1024 * 1024},
    fileFilter: (_req , file , cb) => cb(null , ["image/png" , "image/jpeg" , "image/webp"].includes(file.mimetype))
})

const app = express();
const PORT = Number(process.env.PORT) || 3000

const groq = new Groq({apiKey : process.env.GROQ_API_KEY})
app.use(cors())


app.get('/',(req : Request , res : Response)=>{
        res.sendStatus(200)
})

const SYSTEM_PROMPT = `You extract data from receipt images.
Respond with JSON only, in this shape:
{"vendor": string, "date": string, "items": [{"name": string, "price": number}], "total": number}
Use null for any field you cannot read. Never guess.`;

app.post("/api/post-receipt" , uploads.single("receiptImage"),async (req: Request , res:Response)=>{

    const file = req.file
    if(!file || !file.mimetype.startsWith("image/")){
        return res.status(404).json({error : "inavalid image"})
    }
    const prompt = "bring out the price, vendor , items& item price , date and total amount " 

    const base64 = file?.buffer.toString("base64")

    try{
         const completions = await groq.chat.completions.create({
        model : "qwen/qwen3.8-27b",
        temperature : 0,
        response_format : {type : "json_object"},
        messages:[
            {role:"system", content:SYSTEM_PROMPT},
            {
                role : "user",

                content:[
                    {type:"text" , text : "Extract the receipt data as JSON"},
                    {
                        type : "image_url",
                        image_url : {url :`data:${file?.mimetype};base64,${base64}`}
                    }
                ]
            }
        ]
    })

    const raw = completions.choices[0]?.message.content ?? "{}"
    
      res.json(JSON.parse(raw))
    }catch(e){
        console.error("Error message : " , e)
         res.status(500).json({ error: "Something went wrong" });
    }

   
    
    

  
})
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})