import { useState } from "react";
import { useParams } from "react-router-dom";

import { toast } from "react-toastify";
import AxiosInstance from "../AxiosInstance";

const FeedBackForm = () => {
  const { hostelId } = useParams();
  const [rating, setRating] = useState(0);
  const user = JSON.parse(sessionStorage.getItem("user"));

  const [text, setText] = useState();
  const handleStarClick = (starValue) => {
    setRating(starValue);
  };
  const rating_Function = async () => {
    const formData = new FormData();
    formData.append("rating", rating);
    formData.append("description", text);
    try {
      const res = await AxiosInstance.post(
        `users/feedback/${user._id}/${hostelId}`,
        {"Rating": rating, "Message": text}
      );
      console.log(res);
      toast.success(res.data.message);
      toast.info("Thank you for your valuable feedback");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="  bg-opacity-70  flex  justify-center p-5">
        <div className="bg-white  flex space-x-4 rounded-lg border p-10">
          <div>
            <div className="">
              <h3 className="text-center text-xl italic">Feedback Form</h3>
              <div className="w-full  ">
            <div className="flex justify-center"> 
             {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`${
                      star <= rating ? "text-yellow-400" : "text-gray-200"
                    } text-5xl cursor-pointer`}
                    onClick={() => handleStarClick(star)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                     className="h-10 w-10"
                      viewBox="0 -960 960 960"
                     
                      fill="currentColor"
                    >
                      <path d="M480-320q48 0 85.5-28.5T620-422H340q17 45 54.5 73.5T480-320ZM380-480q25 0 42.5-17.5T440-540q0-25-17.5-42.5T380-600q-25 0-42.5 17.5T320-540q0 25 17.5 42.5T380-480Zm200 0q25 0 42.5-17.5T640-540q0-25-17.5-42.5T580-600q-25 0-42.5 17.5T520-540q0 25 17.5 42.5T580-480ZM305-704l112-145q12-16 28.5-23.5T480-880q18 0 34.5 7.5T543-849l112 145 170 57q26 8 41 29.5t15 47.5q0 12-3.5 24T866-523L756-367l4 164q1 35-23 59t-56 24q-2 0-22-3l-179-50-179 50q-5 2-11 2.5t-11 .5q-32 0-56-24t-23-59l4-165L95-523q-8-11-11.5-23T80-570q0-25 14.5-46.5T135-647l170-57Zm49 69-194 64 124 179-4 191 200-55 200 56-4-192 124-177-194-66-126-165-126 165Zm126 135Z" />
                    </svg>
                  </span>
                ))}
            </div>  
                <p className="text-center italic ">
                  {rating === 0
                    ? "Please rate your Hostel"
                    : `Explain in detail`}
                </p>
              </div>
              <div className="w-full">
                <textarea
                  className="w-64 ring-2 rounded-lg h-36 p-3"
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Share your feedback "
                ></textarea>
              </div>
              <div className="w-full flex justify-center p-3">
                <button
                  className="bg-slate-700 text-white h-10 w-36  rounded-xl"
                  onClick={rating_Function}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedBackForm;
