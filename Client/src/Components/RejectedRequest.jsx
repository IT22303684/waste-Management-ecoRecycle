import React from 'react'
import { useAllRequest } from '../pages/Request'
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export default function RejectedRequest() {
    const { data } = useAllRequest();

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

    const rejectedRequest = data ? data.filter(request => request.status == 'reject') : [];

    if (!data || data.length === 0) {
        return <h1>No Items to display...</h1>;
    }

  return (
    <div className='bg-white px-4  pb-4 rounded-sm border border-gray-200 w-full  pt-3'>
        <strong className=' font-medium text-xl text-red'>Rejected Request</strong>

        <div className='mt-3'>
            <table className='w-full text-gray-700'>
                <thead>
                    <tr>
                        <th>Request Id</th>
                        <th>Customer Name</th>
                        <th>Request Date</th>
                        <th>Request Type</th>
                        <th>Weight (KG)</th>
                        <th>Request Address</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {rejectedRequest.map((request)=>(
                    <tr key={request._id}>
                        <td>{request._id}</td>
                        <td>{request.name}</td>
                        <td>none</td>
                        <td>{request.category}</td>
                        <td>{request.weight}</td>
                        <td>{request.Location}</td>

                        <td className='flex flex-col gap-2'>
                        <button
                            className='bg-green-500 mr-3 text-white px-4 py-2 hover:bg-green-700 rounded shadow-md outline-none border-none select-none'
                            onClick={() => handleApprove(request._id)}
                        >
                            Approve
                        </button>
                        </td>
                    </tr>
                ))}

                </tbody>

            </table>

        </div>
    </div>
  )
}
