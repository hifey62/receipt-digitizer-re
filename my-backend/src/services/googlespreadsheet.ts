import "dotenv/config"
interface SheetData {
        vendor : string,
            date : string,
            items:{
                name:string ,
                price: number
            }[],
            total : number
}

 export default async function sendDataSheet  (data: SheetData)  {

    const sheetUrl = process.env.WEB_APP_URL
    if(!sheetUrl) return
    const response = await fetch(sheetUrl ,{
        method : "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
    } )

    if (!response.ok) {
    throw new Error(`Google Sheet request failed with status ${response.status}`);
  }

  const result = await response.json();
  return result;
}