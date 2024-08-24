import React, { useEffect, useState } from 'react';
import { useParams, Form, redirect, useLoaderData  } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const response = await customFetch.put(`/routePath/updateRoutePath/${params.id}`, data);
    
    if (response.status === 200) {
      toast.success("Route updated successfully");
      return redirect("../route");
    } else {
      throw new Error("Update failed with status code: " + response.status);
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch(`/routePath/retriveSpecificRoutePath/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/AdminDashboard/route");
  }
};

export default function EditRoute() {
  const data = useLoaderData();

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className='bg-white w-full flex items-center justify-center flex-col min-h-screen mb-10'>
      <div className='bg-white px-10 py-20 rounded w-2/3 overflow-auto' style={{ maxHeight: '90vh' }}>
        <h3 className='font-semibold text-green-600 text-3xl text-center'>UPDATE ROUTE</h3>

        <Form method="post">
          <div className='mt-8'>
            <label className='text-lg font-medium'>Contact Name</label>
            <input
              type='text'
              name='CustomerName'
              defaultValue={data.CustomerName} // Use `data` directly
              className='w-full border-2 border-gray-100 rounded-xl p-3 mt-1'
              placeholder='Enter Name'
            />
          </div>

          <div className='mt-8'>
            <label className='text-lg font-medium'>Contact Number</label>
            <input
              type='text'
              name='ContactNumber'
              defaultValue={data.ContactNumber} // Use `data` directly
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
              defaultValue={data.PickupPath} // Use `data` directly
              className='w-full border-2 border-gray-100 rounded-xl p-3 mt-1'
              placeholder='Enter Path'
            />
          </div>

          <div className='mt-4'>
            <label className='text-lg font-medium'>Arrive Date</label>
            <input
              type='date'
              name='ArriveDate'
              defaultValue={data.ArriveDate} // Use `data` directly
              className='w-full border-2 border-gray-100 rounded-xl p-3 mt-1'
            />
          </div>

          <div className='mt-4'>
            <label className='text-lg font-medium'>Arrive Time</label>
            <input
              type='time'
              name='ArriveTime'
              defaultValue={data.ArriveTime} // Use `data` directly
              className='w-full border-2 border-gray-100 rounded-xl p-3 mt-1'
            />
          </div>

          <div className='mt-4'>
            <label className='text-lg font-medium'>Vehicle</label>
            <select
              name='Vehicle'
              defaultValue={data.Vehicle} // Use `data` directly
              className='w-full border-2 border-gray-50 rounded-xl p-3 mt-1'
            >
              <option value=''>Select Vehicle</option>
              <option value='Car'>Car</option>
              <option value='Bus'>Bus</option>
              <option value='Bike'>Bike</option>
              <option value='Truck'>Truck</option>
            </select>
          </div>

          <div className='mt-4'>
            <button type='submit' className='bg-green-500 text-white font-bold py-4 rounded w-full hover:bg-green-700'>SUBMIT</button>
          </div>
        </Form>
      </div>
    </div>
  );
}
