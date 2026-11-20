
import { useState } from "react";

const [image , setImage] = useState<File| null>(null)

const sendReceipt = async ()=>{
      const formData  = new FormData 

      if(!image){
        alert("Please select a valid image file")
        return 
      }

      formData.append("Image", image)

      try{

        const response = fetch("/api",{
            method : "POST",
            body : formData
        })

        const data = (await response).json
        console.log("digitized receipt data" , data)

      }catch(e){
        console.error("upload failed",e)
      }
        
        
}
const handleImage = (e : React.ChangeEvent<HTMLInputElement>)=>{

    if(e.target.files && e.target.files[0]){
        setImage(e.target.files[0])
    } 
}
const CapturePage = () => {
    return (
        <div className="flex flex-col items-start gap-4 " >
            <input type="file" name="file" id="receipt" accept="image/*" onChange={handleImage} />
            <button onClick={sendReceipt}>digitize</button>
        </div>
    );
}

export default CapturePage;
