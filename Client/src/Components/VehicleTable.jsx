import React, { useState, useEffect } from 'react';
import { IoBuild, IoTrashSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export default function VehicleTable() {
  const [vehicles, setVehicles] = useState([]); // Manage vehicles in state
  const [showConfirm, setShowConfirm] = useState({ visible: false, id: null }); // Manage confirmation modal state

  // Fetch all vehicles initially
  const fetchVehicles = async () => {
    try {
      const { data } = await customFetch.get("/vehicle/retrivevehicles");
      setVehicles(data); // Update vehicles state with fetched data
    } catch (error) {
      console.error('Error fetching data:', error.response ? error.response.data : error.message);
      toast.error("Failed to fetch vehicles");
    }
  };

  useEffect(() => {
    fetchVehicles(); // Fetch vehicles when the component mounts
  }, []);

  const handleDelete = async (id) => {
    try {
      await customFetch.delete(`/vehicle/deleteVehicle/${id}`);
      toast.success("Vehicle deleted successfully!");
      fetchVehicles(); // Re-fetch vehicles after successful deletion
      setShowConfirm({ visible: false, id: null }); // Close the modal
    } catch (error) {
      toast.error("Failed to delete vehicle");
      console.error("Delete error", error);
    }
  };

  const openConfirmModal = (id) => {
    setShowConfirm({ visible: true, id }); // Open modal and store the vehicle ID
  };

  const closeConfirmModal = () => {
    setShowConfirm({ visible: false, id: null }); // Close modal without deleting
  };

  if (!vehicles || vehicles.length === 0) {
    return <h1>No Items to display...</h1>;
  }

  return (
    <div className='bg-white px-4 pb-4 rounded-sm border border-gray-200 w-full pt-3'>
      <strong className='font-medium text-xl text-orange-600'>All Vehicles</strong>
      <div className='mt-3'>
        <table className='w-full text-gray-700'>
          <thead>
            <tr>
              <th>Vehicle Number</th>
              <th>Vehicle Name</th>
              <th>Chassi Number</th>
              <th>Vehicle Category</th>
              <th>Register Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle._id}>
                <td>{vehicle.VehicleNumber}</td>
                <td>{vehicle.VehicleName}</td>
                <td>{vehicle.ChassiNumber}</td>
                <td>{vehicle.VehicleCategory}</td>
                <td>{vehicle.AddDate}</td>
                <td>
                  <div className='flex flex-row gap-1'>
                    <Link to={`../EditVehicle/${vehicle._id}`}>
                      <button className='bg-orange-500 text-white px-4 py-2 hover:bg-orange-600 rounded shadow-md outline-none border-none select-none'>
                        <IoBuild />
                      </button>
                    </Link>
                    <button 
                      className='bg-red text-white px-4 py-2 hover:bg-red-600 rounded shadow-md outline-none border-none select-none'
                      onClick={() => openConfirmModal(vehicle._id)}
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

      {/* Confirmation Modal */}
      {showConfirm.visible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <p className="mb-4 text-gray-700">
              Are you sure you want to delete this vehicle?
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => handleDelete(showConfirm.id)}
                className="px-4 py-2 bg-red text-white rounded hover:bg-red transition-colors duration-200"
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
