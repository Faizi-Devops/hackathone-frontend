"use client"
import Sidenavbar from "@/components/Sidenavbar/Sidenavbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Circles } from "react-loader-spinner";
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'



const page = () => {
    const [data, setData] = useState<any[]>([]);
    const router = useRouter()
    const [flag, setFlag] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null); // Track the id being deleted

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setFlag(true);
            let response = await axios.get("http://localhost:4000/inter/read");
            setFlag(false);
            console.log("data", response.data);
            setData(response.data);
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch data.");
        }
    };

    const onDeleteHandler = async (id: string) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                setDeletingId(id); // Set the id being deleted to show loading and disable button

                try {
                    await axios.delete(`http://localhost:4000/inter/delete/${id}`);
                    // Filter out the deleted item from data
                    setData((prevData) => prevData.filter((item) => item._id !== id));
                    toast.success('Slot deleted successfully.');
                } catch (error) {
                    console.log(error);
                    toast.error('Failed to delete slot.');
                } finally {
                    setDeletingId(null); // Reset deletingId after request is complete
                }

                Swal.fire({
                    title: 'Deleted!',
                    text: 'Slot has been deleted.',
                    icon: 'success'
                });
            }
        });
    };



    const onUpdateHandler = (id: string) => {
        router.push(`/inter/${id}`);


    }

    return (
        <div>
            <div>
                <Sidenavbar />
            </div>
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        #
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Candidate Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Details
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Delete
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Update
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                {flag ? (
                    <tr>
                        <td colSpan={6} className="text-center py-4">
                            <Circles
                                height={40}
                                width={40}
                                color="#4fa94d"
                                ariaLabel="Loading"
                            />
                        </td>
                    </tr>
                ) : (
                    data.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="text-center py-4">
                                There are no interviews right now
                            </td>
                        </tr>
                    ) : (
                        data.map((slot, index) => (
                            <tr
                                key={index}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            >
                                <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                                    {index + 1}
                                </td>
                                <td className="px-6 py-4">{slot?.candiname}</td>
                                <td className="px-6 py-4">{slot?.status}</td>
                                <td className="px-6 py-4 ">
                                    Date: {slot?.slo.date} <br />
                                    Start Time: {slot?.slo?.startTime} <br />
                                    End Time: {slot?.slo?.endTime} <br />
                                    Interviewer: {slot?.slo?.interviewer}
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        type="button"
                                        onClick={() => onDeleteHandler(slot._id)}
                                        disabled={deletingId === slot._id}
                                        className={`focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 ${deletingId === slot._id ? "opacity-50 cursor-not-allowed" : ""}`}
                                    >
                                        {deletingId === slot._id ? (
                                            <Circles
                                                height={20}
                                                width={20}
                                                color="#FFFFFF"
                                                ariaLabel="Deleting"
                                            />
                                        ) : (
                                            "Delete"
                                        )}
                                    </button>
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => onUpdateHandler(slot._id)}
                                        type="button"
                                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))
                    )
                )}
            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
