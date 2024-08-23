import React from 'react'
import RouteTable from '../Components/RouteTable'

export default function Route() {
  return (
    <div className='flex flex-col gap-4'>

        <div className='flex flex-row gap-4 w-full'>
          <RouteTable />
        </div>
    </div>
  )
}
