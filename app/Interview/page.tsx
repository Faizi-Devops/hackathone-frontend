"use client"
import Sidenavbar from "@/components/Sidenavbar/Sidenavbar";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

const Page = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/slot/read");
      setData(response.data);
      if (response.data.length <= 0) {
        toast.success("Please add slots first");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false whether data fetch succeeds or fails
    }
  };

  const formik = useFormik({
    initialValues: {
      candiname: '',
      status: '',
      schedule: "" // Initial value for schedule based on fetched data
    },
    validationSchema: Yup.object({
      candiname: Yup.string()
        .required('Candidate name is required')
        .matches(/^[A-Za-z\s]+$/, 'Only alphabets are allowed for candidate name'),
      status: Yup.string().required('Status is required'),
      schedule: Yup.string().required('Schedule is required'),
    }),
    onSubmit: async (values) => {
      console.log("values",values)
      let a = {
        candiname: values.candiname,
        status: values.status,
        schedule: values.schedule,
      }
      console.log("consli",);
      try {
        const response = await axios.post("http://localhost:4000/inter/create",a);
        console.log(response);
        if (response.status === 201) {
          toast.success("interview created successfully");
          formik.resetForm(); // Reset form after successful submission
        }
      } catch (error:any) {
        toast.error(error.response.data.message);
      }
    },
  });

  return (
    <div>
      <div>
        <Sidenavbar />
      </div>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label htmlFor="candiname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Candidate Name
                </label>
                <input
                  type="text"
                  id="candiname"
                  name="candiname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.candiname}
                />
                {formik.touched.candiname && formik.errors.candiname ? (
                  <div className="text-red-500">{formik.errors.candiname}</div>
                ) : null}
              </div>
              <div>
                <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.status}
                >
                  <option value="" disabled selected>
                    Choose Status
                  </option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                {formik.touched.status && formik.errors.status ? (
                  <div className="text-red-500">{formik.errors.status}</div>
                ) : null}
              </div>
              <div>
                <label htmlFor="schedule" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Schedule
                </label>
                <select
                  id="schedule"
                  name="schedule"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.schedule}
                >
                  <option value="" disabled selected>
                    Choose Schedule
                  </option>
                  {data.map((slot:any, index) => (
                    <option key={index} value={slot._id}>
                      Start Time: {slot.startTime} - End Time: {slot.endTime} - Date: {slot.date}
                    </option>
                  ))}
                </select>
                {formik.touched.schedule && formik.errors.schedule ? (
                  <div className="text-red-500">{formik.errors.schedule}</div>
                ) : null}
              </div>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
