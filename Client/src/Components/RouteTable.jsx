import React from 'react'
import RequestStatus from '../utils/RequestStatus'
import {IoBuild, IoTrashSharp } from 'react-icons/io5'

const routetData = [
    {
        requestId: 'req0001',
        routeId: 'rou0001',
        customerName: 'dasun',
        path: 'mirissa, kaburugamuwa junction, rabima Rd, sulthanagoda, akurugoda, kirimetimulla ',
        arriveTime: '4.00PM',
        arriveDate: '2024/08/19',
        quentity: '10kg',
        vehicle: 'PH-1037',
        currentStatus: 'pending'
    },
    {
        requestId: 'req0002',
        routeId: 'rou0002',
        customerName: 'jinad',
        path: 'mirissa, kaburugamuwa junction, rabima Rd, sulthanagoda, akurugoda, kirimetimulla ',
        arriveTime: '4.00PM',
        arriveDate: '2024/08/19',
        quentity: '10kg',
        vehicle: 'PH-1037',
        currentStatus:'conform'
    }
]

export default function RouteTable() {
  return (
    <div className='bg-white px-4  pb-4 rounded-sm border border-gray-200 w-full'>

        <div className='mt-3'>
            <table className='w-full text-gray-700'>
                <thead>
                    <tr>
                        <th>Request Id</th>
                        <th>Route Id</th>
                        <th>Customer Name</th>
                        <th>Path</th>
                        <th>Arrive Time</th>
                        <th>Arrive Date</th>
                        <th>Quentity</th>
                        <th>Vehicle</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {routetData.map((route)=>(
                    <tr key={route.requestId}>
                        <td>{route.requestId}</td>
                        <td>{route.routeId}</td>
                        <td>{route.customerName}</td>
                        <td>{route.path}</td>
                        <td>{route.arriveTime}</td>
                        <td>{route.arriveDate}</td>
                        <td>{route.quentity}</td>
                        <td>{route.vehicle}</td>
                        <td>{RequestStatus(route.currentStatus)}</td>
                        <td>
                            <div className='flex flex-row gap-1'>
                                <button className='bg-orange-500 text-white px-4 py-2 hover:sky-green-700 rounded shadow-md outline-none border-none select-none'>
                                    <IoBuild />
                                </button>
                                <button className='bg-red text-white px-4 py-2 hover:sky-green-700 rounded shadow-md outline-none border-none select-none'>
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
  )
}
