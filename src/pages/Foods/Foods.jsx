import { useEffect, useState } from "react";
import Food from "../Food/Food";
import { axiosPublic } from "../../axios/axiosPublic";

const Foods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(null);
  // const url = "https://raw.githubusercontent.com/rabiul3000/foods-dataset/refs/heads/main/foods.json";

  useEffect(() => {
    const getAllFoods = async () => {
      try {
        setLoading(true);
        // const res = await axiosPublic.get("/foods/");
        const { data } = await axiosPublic.get("/foods");
        console.log(data);
        setFoods(data);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };
    getAllFoods();
  }, []);
  

  if (loading) {
    return (
      <div className="flex justify-center items-center text-center p-4 bg-green-200">
        <h1>Please wait, Loading...</h1>
        <span className="loading loading-ball text-orange-400"></span>
      </div>
    );
  }


  return (
    <div className="w-full flex flex-col justify-center items-center gap-8 p-8">
      <div className="w-6/12 py-4 bg-rose-200 rounded-lg font-semibold text-center border-t-4 border-t-rose-500">
        <h1>All Foods</h1>
      </div>
      <div className="w-11/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {foods.map((food) => {
          return (
            <div key={food._id}>
              <Food food={food} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Foods;
