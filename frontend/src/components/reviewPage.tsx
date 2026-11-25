
interface ReceiptData{
            vendor : string,
            date : string,
            items:[{
                name:string ,
                price: number
            }],
            total : number
    }
interface ReviewProps {
    reviewData : ReceiptData | null
}   
const cleanNumber = (val: FormDataEntryValue | null | undefined) => {
  if (!val) return 0;
  const cleaned = String(val).replace(/[^0-9.-]+/g, "");
  return Number(cleaned) || 0;
};


async function handleSubmit (e: React.SubmitEvent<HTMLFormElement>){
        e.preventDefault()
        const form = e.currentTarget 
        const formData = new FormData(form)
        const itemNames = formData.getAll("item") as string []
        const itemPrice = formData.getAll("price")  as string []

        
        const payload = {
            vendor : formData.get("vendor"),
            items : itemNames.map((item , index)=> ({
                name : item ,
                price : itemPrice[index]
            })),
            total : cleanNumber(formData.get("total"))
        }
        console.log(formData)
        const response = await fetch("http://localhost:3000/api/save-receipt",{
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body : JSON.stringify(payload)
        })
        const data = await response.json()
        console.log(data)
        // const vendor = formData.get("vendor")
        // const item = formData.getAll("item")
        // const price = formData.getAll("price")

}   
const ReviewPage = ({reviewData}:ReviewProps) => {
    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-sm flex flex-col gap-4">
          <h2 className="text-lg font-bold text-slate-900">Receipt Review Page</h2>

    <div className="flex flex-col gap-1">
      <label htmlFor="vendor" className="text-sm font-medium text-slate-700">
        Vendor
      </label>
      <input
        id="vendor"
        type="text"
        name="vendor"
        defaultValue={reviewData?.vendor}
        className="border border-slate-300 rounded-lg px-3 py-2 text-sm"
      />
    </div>

    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-slate-700">Items</span>
      {reviewData?.items?.map((item , index: number) => (
        <div key={index} className="flex gap-2">
          <input
            type="text"
            defaultValue={item.name}
            name="item"
            className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm"
          />
          <input
            type="text"
            name="price"
            defaultValue={item.price}
            className="w-28 border border-slate-300 rounded-lg px-3 py-2 text-sm"
          />
        </div>
      ))}
      <input
            type="text"
            name="total"
            defaultValue={reviewData?.total}
            className="w-28 border border-slate-300 rounded-lg px-3 py-2 text-sm"
          />
    </div>
            <button
      type="submit"
      className="mt-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl transition cursor-pointer"
    >
      Save Receipt
    </button>
        </form>
    );
}

export default ReviewPage;

