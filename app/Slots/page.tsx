"use client";
import Sidenavbar from "@/components/Sidenavbar/Sidenavbar";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

const Slots = () => {
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            date: '',
            start: '',
            end: '',
            intname: '',
        },
        validationSchema: Yup.object({
            date: Yup.date()
                .required('Date is required')
                .min(new Date(), 'Date must be today or later'),
            start: Yup.string()
                .required('Start time is required')
                .notOneOf([Yup.ref('end')], 'Start time must not be the same as End time'),
            end: Yup.string()
                .required('End time is required')
                .notOneOf([Yup.ref('start')], 'End time must not be the same as Start time'),
            intname: Yup.string().required('Interviewer name is required'),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            try {
                let a = {
                    date: values.date,
                    startTime: values.start,
                    endTime: values.end,
                    interviewer: values.intname,
                };
                let b = await axios.post("http://localhost:4000/slot/create", a);
                console.log(b.data.data);
                if (b.status === 201) {
                    toast.success("Slot Added Successfully");
                    formik.resetForm();
                }
            } catch (error:any) {
                toast.error(error.response.data.message);
            } finally {
                setLoading(false);
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
                                <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.date}
                                />
                                {formik.touched.date && formik.errors.date ? (
                                    <div className="text-red-500">{formik.errors.date}</div>
                                ) : null}
                            </div>
                            <div>
                                <label htmlFor="start" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Time</label>
                                <input
                                    type="time"
                                    id="start"
                                    name="start"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.start}
                                />
                                {formik.touched.start && formik.errors.start ? (
                                    <div className="text-red-500">{formik.errors.start}</div>
                                ) : null}
                            </div>
                            <div>
                                <label htmlFor="end" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End Time</label>
                                <input
                                    type="time"
                                    id="end"
                                    name="end"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.end}
                                />
                                {formik.touched.end && formik.errors.end ? (
                                    <div className="text-red-500">{formik.errors.end}</div>
                                ) : null}
                            </div>
                            <div>
                                <label htmlFor="intname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Interviewer Name</label>
                                <input
                                    type="text"
                                    id="intname"
                                    name="intname"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.intname}
                                />
                                {formik.touched.intname && formik.errors.intname ? (
                                    <div className="text-red-500">{formik.errors.intname}</div>
                                ) : null}
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                    </svg>
                                    Submitting...
                                </div>
                            ) : (
                                "Submit"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Slots;
