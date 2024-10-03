import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import { IoBuild, IoTrashSharp, IoPrint } from 'react-icons/io5';
import { useAllRoutes } from '../pages/Route'; // Ensure this path is correct
import customFetch from '../utils/customFetch';
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

export default function RouteTable() {
    const { data, refetch } = useAllRoutes();
    const [showConfirm, setShowConfirm] = useState({ visible: false, id: null });
    const [searchTerm, setSearchTerm] = useState('');
    const tableRef = useRef();  // Reference to the table

    // Handle showing the confirmation modal
    const openConfirmModal = (id) => {
        setShowConfirm({ visible: true, id });
    };

    // Handle closing the confirmation modal
    const closeConfirmModal = () => {
        setShowConfirm({ visible: false, id: null });
    };

    const handleDelete = async (id) => {
        try {
            await customFetch.delete(`/routePath/deleteRoutePath/${id}`);
            toast.success("Route deleted successfully!");
            refetch();  // Call refetch directly after deleting
        } catch (error) {
            toast.error("Failed to delete route");
            console.error("Delete error", error);
        } finally {
            closeConfirmModal();
        }
    };

    // Filter data based on search term
    const filteredData = data.filter((route) =>
        route.CustomerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.ContactNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.RouteId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Print function
    const handlePrint = useReactToPrint({
        content: () => tableRef.current,  // Reference to the table to be printed
        documentTitle: "Route Details Report",
    });


    return (
        <div className="bg-white border border-gray-200 overflow-x-auto">
            {/* Search Input */}
            <div className="p-4 no-print">
                <input
                    type="text"
                    placeholder="Search by Route Id, Customer Name, or Contact Number"
                    className="px-4 py-2 border rounded w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Print Button */}
            <div className="p-2 no-print">
                <button
                    className="bg-gray-500 text-white px-4 text-xl py-2 rounded hover:bg-orange-600"
                    onClick={handlePrint}
                >
                    <IoPrint />
                </button>
            </div>

            {/* Table */}
            <table ref={tableRef} className="min-w-[1000px] w-full text-gray-700">
                <thead>
                    <tr>
                        <th>Route Id</th>
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
                    {(!filteredData || filteredData.length === 0) ? (
                        <tr>
                            <td colSpan="9" className="text-center py-4">
                                <label>No Items to display</label>
                            </td>
                        </tr>
                    ) : (
                        filteredData.map((route) => (
                            <tr key={route._id}>
                                <td>{route.RouteId}
                                    <div className='text-gray-300'>
                                        request Id :
                                        <p>{route.RequestId}</p>
                                    </div>
                                </td>
                                <td>{route.CustomerName}</td>
                                <td>{route.ContactNumber}</td>
                                <td>
                                    <a href={route.PickupPath} target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline"
                                        title={route.PickupPath}>
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
                                            className='bg-red text-white px-4 py-2 hover:bg-red-600 rounded shadow-md outline-none border-none select-none'
                                            onClick={() => openConfirmModal(route._id)}
                                        >
                                            <IoTrashSharp />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Confirmation Modal */}
            {showConfirm.visible && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <p className="mb-4 text-gray-700">
                            Are you sure you want to delete this route?
                        </p>
                        <div className="flex justify-between">
                            <button
                                onClick={() => handleDelete(showConfirm.id)}
                                className="px-4 py-2 bg-red text-white rounded hover:bg-red-600 transition-colors duration-200"
                            >
                                Yes
                            </button>
                            <button
                                onClick={closeConfirmModal}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-200"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
