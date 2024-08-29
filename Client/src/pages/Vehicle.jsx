import React from 'react'
import VehicleTable from '../Components/VehicleTable' 
import { Link } from 'react-router-dom';

export default function Vehicle() {
  return (
    <div>
          <div className='mt-4'>

            <Link to={'../AddVehicle'}>
              <button type='submit' className='bg-orange-400 text-white font-bold py-4 rounded w-1/2 hover:bg-orange-600'>
                Add New Vehicle
              </button>
            </Link>
            
          </div>
          <div className='mt-4'>
            <VehicleTable />
          </div>
    </div>
    
  );
}
