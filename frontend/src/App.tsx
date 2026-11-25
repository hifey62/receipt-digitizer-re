import CapturePage from "./components/capturePage";
import { useState } from "react";
import ReviewPage from "./components/reviewPage";
const App = () => {
    const [review , setReview] = useState(false)
    const [reviewData , setReviewData] = useState<ReceiptData|null >(null)
    interface ReceiptData{
            vendor : string,
            date : string,
            items:[{
                name:string ,
                price: number
            }],
            total : number
    }
    return (
        <div>
             { 
                !review &&
                (
                    <CapturePage review = {review} setReview = {setReview} setReviewData={setReviewData} />
                )
            }
            {
                review && (
                    <ReviewPage reviewData={reviewData}/>
                )
            }
        </div>
    );
}

export default App;
