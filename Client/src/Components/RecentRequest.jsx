import React from 'react';
import RequestStatus from '../utils/RequestStatus';
import { useAllRecentRequest } from '../pages/Dashbord';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch'; // assuming you have customFetch set up

export default function RecentRequest() {
  const { data, refetch } = useAllRecentRequest();

  // Function to handle approval
  const handleApprove = async (id) => {
    try {
      const response = await customFetch.put(`/request/updateRequestStatus/${id}`, {
        status: 'approved',
      });
      if (response.status === 200) {
        toast.success('Request approved successfully');
        return redirect("../route");
      } else {
        throw new Error('Update failed with status code: ' + response.status);
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg );
    }
  };

  // Function to handle rejection
  const handleReject = async (id) => {
    try {
      const response = await customFetch.put(`/request/updateRequestStatus/${id}`, {
        status: 'reject',
      });
      if (response.status === 200) {
        toast.success('Request rejected successfully');
        refetch(); // refetch the data to refresh the UI after update
      } else {
        throw new Error('Update failed with status code: ' + response.status);
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg );
    }
  };

  const pendingRequests = data ? data.filter((request) => request.status === 'available') : [];

  if (!data || data.length === 0) {
    return <h1>No Items to display...</h1>;
  }

  return (
    <div className='bg-white px-4 pb-4 rounded-sm border border-gray-200 w-full pt-3'>
      <strong className='font-medium text-xl text-green-600'>Pending Request</strong>

      <div className='mt-3'>
        <table className='w-full text-gray-700'>
          <thead>
            <tr>
              <th>Request Id</th>
              <th></th>
              <th>Customer Name</th>
              <th>Request Date</th>
              <th>Request Type</th>
              <th>Weight (KG)</th>
              <th>Request Address</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {pendingRequests.map((request) => (
              <tr className='hover:bg-gray-50' key={request._id}>
                <td>{request._id}</td>
                <td>
                  <img
                    src={request.itemPhoto}
                    alt="image"
                    className="object-fill rounded h-12 w-12 rounded-r-none transform hover:scale-105 hover:h-28 hover:w-28 duration-200"
                  />
                </td>
                <td>{request.name}</td>
                <td>none</td>
                <td>{request.category}</td>
                <td>{request.weight}</td>
                <td>{request.Location}</td>
                <td>{RequestStatus(request.status)}</td>
                <td className='flex flex-col gap-2'>
                  <button
                    className='bg-green-500 mr-3 text-white px-4 py-2 hover:bg-green-700 rounded shadow-md outline-none border-none select-none'
                    onClick={() => handleApprove(request._id)} // Call approve function
                  >
                    Approve
                  </button>
                  <button
                    className='bg-red mr-3 text-white px-4 py-2 hover:bg-red-700 rounded shadow-md outline-none border-none select-none'
                    onClick={() => handleReject(request._id)} // Call reject function
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
