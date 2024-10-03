import React, { createContext, useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import VehicleTable from '../Components/VehicleTable'
import { Link } from 'react-router-dom';


export const loader = async ({ request }) => {
  try {
    const { data } = await customFetch.get("/vehicle/retrivevehicles");
    console.log('Data fetched:', data);
    return { data };
  } catch (error) {
    console.error('Error fetching route data:', error);
    toast.error(error?.response?.data?.msg);
    return error;
  }
};


const allVehicleDetailsContext = createContext();


const AllVehicles = () => {
  const { data } = useLoaderData();
  console.log(data);

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
        <allVehicleDetailsContext.Provider value={{ data }}>
          <VehicleTable />
        </allVehicleDetailsContext.Provider>
      </div>
    </div>

  );
};
export const useAllVehicle = () => useContext(allVehicleDetailsContext);

export default AllVehicles;

