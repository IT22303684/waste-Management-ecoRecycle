import React from 'react';
import { IoBuild, IoTrashSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const vehicles = [
  {
    "VehicleNumber": "GC-001",
    "VehicleName": "Garbage Truck",
    "ChassiNumber": "GCX1234567890",
    "VehicleCategory": "Heavy Duty",
    "AddDate": "2024-05-15",
    "Status": "Active"
  },
  {
    "VehicleNumber": "GC-002",
    "VehicleName": "Garbage Truck",
    "ChassiNumber": "GCY0987654321",
    "VehicleCategory": "Heavy Duty",
    "AddDate": "2024-06-10",
    "Status": "In Maintenance"
  },
  {
    "VehicleNumber": "GC-003",
    "VehicleName": "Garbage Truck",
    "ChassiNumber": "GCZ5678901234",
    "VehicleCategory": "Medium Duty",
    "AddDate": "2024-07-01",
    "Status": "Active"
  },
  {
    "VehicleNumber": "GC-004",
    "VehicleName": "Garbage Compactor",
    "ChassiNumber": "GCA2345678901",
    "VehicleCategory": "Compactor",
    "AddDate": "2024-08-05",
    "Status": "Active"
  },
  {
    "VehicleNumber": "GC-005",
    "VehicleName": "Garbage Truck",
    "ChassiNumber": "GCB3456789012",
    "VehicleCategory": "Heavy Duty",
    "AddDate": "2024-09-12",
    "Status": "Out of Service"
  }
];

export default function VehicleTable() {
  return (
    <div className='bg-white px-4 pb-4 rounded-sm border border-gray-200 w-full pt-3'>
        <strong className=' font-medium text-xl text-orange-600 '>All Vehicels</strong>
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
              <tr key={vehicle.VehicleNumber}>
                <td>{vehicle.VehicleNumber}</td>
                <td>{vehicle.VehicleName}</td>
                <td>{vehicle.ChassiNumber}</td>
                <td>{vehicle.VehicleCategory}</td>
                <td>{vehicle.AddDate}</td>
                <td>
                  <div className='flex flex-row gap-1'>
                    <Link to={'../EditVehicle'}>
                      <button className='bg-orange-500 text-white px-4 py-2 hover:bg-orange-600 rounded shadow-md outline-none border-none select-none'>
                        <IoBuild />
                      </button>
                    </Link>
                    <button className='bg-red text-white px-4 py-2 hover:bg-red-600 rounded shadow-md outline-none border-none select-none'>
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
