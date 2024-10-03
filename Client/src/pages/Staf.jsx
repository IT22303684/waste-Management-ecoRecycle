import React from 'react'
import StafTable from '../Components/StafTable'
import { Link } from 'react-router-dom';

export default function Staf() {
  return (
    <div>
      <div className='mt-4'>

        <Link to={'../AddEmployee'}>
          <button type='submit' className='bg-sky-400 text-white font-bold py-4 rounded w-1/2 hover:bg-sky-600'>
            Add New Staf Member
          </button>
        </Link>

      </div>
      <div className='mt-4'>
        <StafTable />
      </div>
    </div>

  );
}