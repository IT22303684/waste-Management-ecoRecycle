import React from 'react';
import { toast } from 'react-toastify';
import { IoBuild, IoTrashSharp } from 'react-icons/io5';
import { useAllRoutes } from '../pages/Route'; // Ensure this path is correct
import customFetch from '../utils/customFetch';
import { Link } from 'react-router-dom';

export default function RouteTable() {
    const { data, setData } = useAllRoutes(); 

    const refreshData = async () => {
        try {
            const response = await customFetch.get('../retriveRoutePath');
            setData(response.data);
        } catch (error) {
            console.error('Error refreshing data:', error.response ? error.response.data : error.message);
            toast.error("Failed to refresh data");
        }
    };

    const handleDelete = async (id) => {
        try {
            await customFetch.delete(`/routePath/deleteRoutePath/${id}`);
            toast.success("Route deleted successfully!");
            refreshData();
        } catch (error) {
            toast.error("Failed to delete route");
            console.error("Delete error", error);
        }
    };

    if (!data || data.length === 0) {
        return <h1>No Items to display...</h1>;
    }
    
    return (
        <div className='bg-white px-4 pb-4 rounded-sm border border-gray-200 w-full'>
            <div className='mt-3'>
                <table className='w-full text-gray-700'>
                    <thead>
                        <tr>
                            <th>Route Id</th>
                            <th>Request Id</th>
                            <th>Customer Name</th>
                            <th>Contact Number</th>
                            <th>Pickup Path</th>
                            <th>Arrive Time</th>
                            <th>Arrive Date</th>
                            <th>Vehicle</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((route) => (
                            <tr key={route._id}>
                                <td>{route.RouteId}</td>
                                <td>{route.RequestId}</td>
                                <td>{route.CustomerName}</td>
                                <td>{route.ContactNumber}</td>
                                <td>
                                    <a href={route.PickupPath} target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-blue-500 hover:underline"
                                    title={route.PickupPath} >
                                        {route.PickupPath}
                                    </a>
                                </td>
                                <td>{route.ArriveTime}</td>
                                <td>{route.ArriveDate}</td>
                                <td>{route.Vehicle}</td>
                                <td>{route.Status}</td>
                                <td>
                                    <div className='flex flex-row gap-1'>
                                        <Link to={`../editRoute/${route._id}`}>
                                            <button className='bg-orange-500 text-white px-4 py-2 hover:bg-orange-600 rounded shadow-md outline-none border-none select-none'>
                                                <IoBuild />
                                            </button>
                                        </Link>
                                        <button 
                                            className='bg-red text-white px-4 py-2 hover:bg-red rounded shadow-md outline-none border-none select-none'
                                            onClick={() => handleDelete(route._id)}
                                        >
                                            <IoTrashSharp />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
