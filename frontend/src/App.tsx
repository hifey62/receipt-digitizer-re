import CapturePage from "./components/capturePage";
import { useState } from "react";
const App = () => {
    const [review , setReview] = useState(false)
    return (
        <div>
            <CapturePage review = {review} setReview = {setReview} />
        </div>
    );
}

export default App;
