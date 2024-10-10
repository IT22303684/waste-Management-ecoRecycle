
import React, { createContext, useContext, useState, useCallback } from 'react';
import { useLoaderData } from 'react-router-dom';
import AdminStatusGrid from '../Components/AdminStatusGrid';
import RecentRequest from '../Components/RecentRequest';
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import RequestBarChart from "../Components/RequestBarChart"
import CollectedWasteBarchart from "../Components/CollectedWasteBarchart"
import VehicleBarchart from "../Components/VehicleBarchart"
import EmployeeBarchart from "../Components/EmployeeBarchart"

export const loader = async ({ request }) => {
  try {
    const { data } = await customFetch.get("/request/retriveRequest");
    console.log('data fetched :', data);
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return { data: [] }; // Returning empty data on error
  }
};

const allRequestDetailsContext = createContext({ data: [], refetch: () => {} });

const AllRecentRequest = () => {
  const { data: initialData } = useLoaderData();
  const [data, setData] = useState(initialData);

  const refetch = useCallback(async () => {
    try {
      const { data: refreshedData } = await customFetch.get("/request/retriveRequest");
      setData(refreshedData);
    } catch (error) {
      toast.error('Error refreshing data');
    }
  }, []);

  return (
    <allRequestDetailsContext.Provider value={{ data, refetch }}>
      <div className='flex flex-col gap-4 mb-4'>
        <AdminStatusGrid />
      </div>
      <div className='flex flex-row gap-4 w-full h-auto  overflow-y-auto'>
          <div className='flex flex-row gap-4 w-full bg-white pb-2 mb-4'>
            <RequestBarChart />
          </div>
          <div className='flex flex-row gap-4 w-full bg-white pb-2 mb-4'>
            <CollectedWasteBarchart/>
          </div>
      </div>
      <div className='flex flex-row gap-4 w-full h-auto  overflow-y-auto'>
          <div className='flex flex-row gap-4 w-full bg-white pb-2 mb-4'>
            <VehicleBarchart />
          </div>
          <div className='flex flex-row gap-4 w-full bg-white pb-2 mb-4'>
            {/*<EmployeeBarchart/>*/}
          </div>
      </div>
    </allRequestDetailsContext.Provider>
  );
};

export const useAllRecentRequest = () => useContext(allRequestDetailsContext);
export default AllRecentRequest;

