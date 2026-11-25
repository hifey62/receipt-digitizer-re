import React, { useState } from "react";
interface ReceiptData{
            vendor : string,
            date : string,
            items:[{
                name:string ,
                price: number
            }],
            total : number
    }
interface CaptureProps {
    review : boolean
    setReview : React.Dispatch<React.SetStateAction<boolean>>,
    setReviewData:React.Dispatch<React.SetStateAction<ReceiptData | null>>
}

const CapturePage = ({review, setReview, setReviewData}: CaptureProps  ) => {
  const [image, setImage] = useState<File | null>(null);
const [preview, setPreview] = useState<string | null>(null);

  const sendReceipt = async () => {
    const formData = new FormData();

    if (!image) {
      alert("Please select a valid image file");
      return;
    }

    formData.append("receiptImage", image);

    try {
      const response =  await fetch("http://localhost:3000/api/post-receipt", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setReviewData(data)
      setReview(true)
      console.log("digitized receipt data", data);
      setReview(true)
    } catch (e) {
      console.error("upload failed", e);
    }
  };
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (e.target.files && e.target.files[0]) {
        if (preview) URL.revokeObjectURL(preview);
      setImage(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };
    const clearImage = () => {
    if (preview) URL.revokeObjectURL(preview);
    setImage(null);
    setPreview(null);
    
  
  };
  return (
   
        
        <div className="">
            {preview ? (
          <div className="">
            <img
              src={preview}
              alt="Receipt preview"
              className="w-1/4 justify-center m-auto"
            />
            <button
              type="button"
              onClick={clearImage}
              className=""
            >
              Remove
            </button>
          </div>
        ) : (
          <label
            htmlFor="receipt"
            className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-indigo-200 rounded-xl bg-indigo-50/40 hover:bg-indigo-50/80 hover:border-indigo-400 transition cursor-pointer p-4 text-center"
          >
            <svg className="w-8 h-8 mb-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm font-semibold text-indigo-700">Tap to upload receipt</span>
            <span className="text-xs text-slate-500 mt-1">PNG, JPG, or JPEG</span>
          </label>
        )}

        <input
       
          type="file"
          name="file"
          id="receipt"
          accept="image/*"
          onChange={handleImage}
          className="hidden"
        />

        <button
          type="button"
          onClick={sendReceipt}
          disabled={!image}
          className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed active:scale-[0.99] text-white font-semibold text-sm rounded-xl shadow-sm transition cursor-pointer"
        >
          Digitize
        </button>
        </div>
   
  );
};

export default CapturePage;
