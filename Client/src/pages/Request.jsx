import React, { createContext, useContext } from 'react'
import { useLoaderData } from 'react-router-dom';
import RequestStatusGrid from '../Components/RequestStatusGrid'
import AprovedRequest from '../Components/AprovedRequest'
import PendingRequest from '../Components/PendingRequest'
import RejectedRequest from '../Components/RejectedRequest'
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

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

const allRequestDetailsContext = createContext({ data: [] });

const AllRequest = () => {
const { data } = useLoaderData();

  return (
    <allRequestDetailsContext.Provider value={{ data }}>
     <div className='flex flex-col gap-4'>
        <RequestStatusGrid />

        <div className='flex flex-col gap-4 w-full h-screen  overflow-y-auto '>
          <div className='flex flex-row gap-4 w-full'>
            <AprovedRequest />
          </div>
          <div className='flex flex-row gap-4 w-full'>
            <PendingRequest />
          </div>
          <div className='flex flex-row gap-4 w-full'>
            <RejectedRequest />
          </div>
          <div className='flex flex-row gap-4 w-full mt-4'>
            <RejectedRequest />
          </div>
        </div> 
    </div>
    </allRequestDetailsContext.Provider>
  );
};

export const useAllRequest = () => useContext(allRequestDetailsContext);
export default AllRequest;

