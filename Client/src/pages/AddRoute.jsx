import React, { useEffect, useState } from 'react';
import { Form, redirect, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { useParams, useSearchParams } from 'react-router-dom';

export const loader = async () => {
  try {
    const vehicleResponse = await customFetch('vehicle/retrivevehicles');
    return {
      vehicles: vehicleResponse.data,
    };
  } catch (error) {
    toast.error(error?.response?.data?.msg || 'Failed to load vehicle data');
    return redirect('/AdminDashboard/request');
  }
};

export const action = async ({ request }) => {
  const formData = new URLSearchParams(await request.formData());
  try {
    await customFetch.post('routePath/addRoutePath', Object.fromEntries(formData));
    toast.success('Route Added Successfully');
    return redirect('/AdminDashboard/request');
  } catch (error) {
    toast.error(error?.response?.data?.msg || 'Failed to add route');
    return null;
  }
};

export default function AddRoute() {
  const { vehicles } = useLoaderData();
  const [vehicleOptions, setVehicleOptions] = useState([]);

  const { Reqid } = useParams();
  const [searchParams] = useSearchParams();
  const cusId = searchParams.get('cusId');

  useEffect(() => {
    if (vehicles && Array.isArray(vehicles)) {
      setVehicleOptions(vehicles);
    }
  }, [vehicles]);

  return (
    <div className='bg-white w-full flex items-center justify-center flex-col min-h-screen mb-10'>
      <div className='bg-white px-10 py-20 rounded w-2/3 overflow-auto' style={{ maxHeight: '90vh' }}>
        <h3 className='font-semibold text-green-600 text-3xl text-center'>ADD ROUTE</h3>

        <Form method="post">
          <div className='mt-8'>
            <label className='text-lg font-medium'>Request ID</label>
            <input
              type='text'
              name='RequestId'
              className='w-full border-2 border-gray-100 rounded-xl p-3 mt-1'
              value={Reqid}
              readOnly
            />
          </div>
          <div className='mt-8'>
            <label className='text-lg font-medium'>Customer ID</label>
            <input
              type='text'
              name='CustomerId'
              className='w-full border-2 border-gray-100 rounded-xl p-3 mt-1'
              value={cusId}
              readOnly
            />
          </div>
          <div className='mt-8'>
            <label className='text-lg font-medium'>Contact Name</label>
            <input
              type='text'
              name='CustomerName'
              className='w-full border-2 border-gray-100 rounded-xl p-3 mt-1'
              placeholder='Enter Name'
            />
          </div>
          <div className='mt-8'>
            <label className='text-lg font-medium'>Contact Number</label>
            <input
              type='text'
              name='ContactNumber'
              className='w-full border-2 border-gray-100 rounded-xl p-3 mt-1'
              placeholder='Enter Number'
            />
          </div>
          <div className="mt-8">
            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block p-2 w-1/2 border-2 border-gray-700 text-gray-700 font-bold py-4 rounded hover:bg-sky-400 hover:text-white hover:no-underline text-center"
            >
              Select New Route Pin From Google Map
            </a>
          </div>
          <div className='mt-8'>
            <label className='text-lg font-medium'>Pickup Path Pin</label>
            <input
              type='text'
              name='PickupPath'
              className='w-full border-2 border-gray-100 rounded-xl p-3 mt-1'
              placeholder='Enter Path'
            />
          </div>
          <div className='mt-4'>
            <label className='text-lg font-medium'>Arrive Date</label>
            <input
              type='date'
              name='ArriveDate'
              className='w-full border-2 border-gray-100 rounded-xl p-3 mt-1'
            />
          </div>
          <div className='mt-4'>
            <label className='text-lg font-medium'>Arrive Time</label>
            <input
              type='time'
              name='ArriveTime'
              className='w-full border-2 border-gray-100 rounded-xl p-3 mt-1'
            />
          </div>
          <div className='mt-4'>
            <label className='text-lg font-medium'>Vehicle</label>
            <select
              name='Vehicle'
              className='w-full border-2 border-gray-50 rounded-xl p-3 mt-1'
            >
              {vehicleOptions.length > 0 ? (
                vehicleOptions.map(vehicle => (
                  <option key={vehicle._id} value={vehicle.VehicleNumber}>
                    {vehicle.VehicleNumber} - {vehicle.VehicleName}
                  </option>
                ))
              ) : (
                <option disabled>No vehicles available</option>
              )}
            </select>
          </div>
          <div className='mt-4'>
            <button type='submit' className='bg-green-500 text-white font-bold py-4 rounded w-full hover:bg-green-700'>
              ADD
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
