import React from 'react'
import RequestStatus from '../utils/RequestStatus'
import { useAllRequest } from '../pages/Request'

export default function PendingRequest() {
    const { data } = useAllRequest();


    const pendingRequests = data ? data.filter(request => request.status == 'available') : [];

    if (!data || data.length === 0) {
        return <h1>No Items to display...</h1>;
    }

  return (
    <div className='bg-white px-4  pb-4 rounded-sm border border-gray-200 w-full pt-3'>
        <strong className='font-medium text-xl text-sky-600 '>Pending Request</strong>

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
                {pendingRequests.map((request)=>(
                    <tr className='hover:bg-gray-50' key={request._id}>

                        <td >{request._id}</td>
                        <td><img src={request.itemPhoto} alt="image" class="object-fill rounded h-12 w-12 rounded-r-none transform hover:scale-105 hover:h-28 hover:w-28 duration-200" /></td>
                        <td>{request.name}</td>
                        <td>none</td>
                        <td>{request.category}</td>
                        <td>{request.weight}</td>
                        <td>{request.Location}</td>
                        <td>{RequestStatus(request.status)}</td>
                        <td className='flex flex-col gap-2'>
                            <button className='bg-green-500 mr-3 text-white px-4 py-2 hover:bg-green-700 rounded shadow-md outline-none border-none select-none'>
                                Aprove
                            </button>
                            <button className='bg-red mr-3 text-white px-4 py-2 hover:bg-red rounded shadow-md outline-none border-none select-none'>
                                Reject
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
