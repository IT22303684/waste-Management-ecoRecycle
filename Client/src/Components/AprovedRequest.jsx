import React from 'react'
import RequestStatus from '../utils/RequestStatus'
import { useAllRequest } from '../pages/Request'


export default function AprovedRequest() {

    const { data } = useAllRequest();

    const aproveRequest = data ? data.filter(request => request.status == 'available') : [];

    if (!data || data.length === 0) {
        return <h1>No Items to display...</h1>;
    }

  return (
    <div className='bg-white px-4  pb-4 rounded-sm border border-gray-200 w-full  pt-3'>
        <strong className=' font-medium text-xl text-green-600'>Aproved Request</strong>

        <div className='mt-3'>
            <table className='w-full text-gray-700'>
                <thead>
                    <tr>
                        <th>Request Id</th>
                        <th>Customer Id</th>
                        <th>Request Date</th>
                        <th>Request Type</th>
                        <th>Weight (KG)</th>
                        <th>Request Address</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {aproveRequest.map((request)=>(
                    <tr key={request._id}>
                        <td>{request._id}</td>
                        <td>{request.createdBy}</td>
                        <td>none</td>
                        <td>{request.category}</td>
                        <td>{request.weight}</td>
                        <td>{request.Location}</td>
                        <td>
                            <button className='bg-sky-500 mr-3 text-white px-4 py-2 hover:sky-green-700 rounded shadow-md outline-none border-none select-none'>
                                ADD ROUTE
                            </button>
                            <button className='bg-purple-700 mr-3 text-white px-4 py-2 hover:sky-green-700 rounded shadow-md outline-none border-none select-none'>
                                Process Payment
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
