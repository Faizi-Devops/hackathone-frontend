"use client"
import Sidenavbar from "@/components/Sidenavbar/Sidenavbar";
import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () =>{
   const [data,setData]=useState<[]>([]);
   const [interview,SetInterview]=useState<[]>([]);
   const [loading, setLoading] = useState<Boolean>(true);
   useEffect(()=>{
      a()

   },[])
   
   const a = async () => {
      try {
         const response = await axios.get("http://localhost:4000/slot/read");
         const b = await axios.get("http://localhost:4000/inter/read");
         console.log("being",b.data)
         SetInterview(b.data);
         setData(response.data);
      } catch (error) {
         console.log(error);
      } finally {
         setLoading(false); // Set loading to false whether data fetch succeeds or fails
      }
   };
  
      

   
    return(
        <div>
          <div>
            <Sidenavbar />
            </div>  


<div className="p-4 sm:ml-64">
<div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
   <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-4">
      <div className="grid items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
      <p className="text-2xl text-gray-400 dark:text-gray-500">
      Total Slots
   </p>
   {loading ? (
                        <p className=" mt-[-2rem] text-gray-400 dark:text-gray-500 text-center">
                           Loading...
                        </p>
                     ) : (
                        <p className="text-2xl mt-[-2rem] text-gray-400 dark:text-gray-500 text-center">
                           {data.length}
                        </p>
                     )}
        
      </div>
      <div className="grid items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
   <p className="text-2xl text-gray-400 dark:text-gray-500">
      Total Interviews
   </p>
   {loading ? (
                        <p className=" mt-[-2rem] text-gray-400 dark:text-gray-500 text-center">
                           Loading...
                        </p>
                     ) : (
                        <p className="text-2xl mt-[-2rem] text-gray-400 dark:text-gray-500 text-center">
                           {interview.length}
                        </p>
                     )}
</div>
   </div>
</div>

</div>



        </div>
    )
}
export default Dashboard;