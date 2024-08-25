import React, { useContext, createContext } from 'react';
import { useLoaderData } from "react-router-dom";
import AdminStatusGrid from '../Components/AdminStatusGrid';
import RecentRequest from '../Components/RecentRequest';
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

const allRecentRequestDetailsContext = createContext({ data: [] });

const AllRecentRequest = () => {
  const { data } = useLoaderData();

  return (
    <allRecentRequestDetailsContext.Provider value={{ data }}>
      <div className='flex flex-col gap-4'>
        <AdminStatusGrid />

        <div className='flex flex-row gap-4 w-full'>
          <RecentRequest />
        </div>
      </div>
    </allRecentRequestDetailsContext.Provider>
  );
};

export const useAllRecentRequest = () => useContext(allRecentRequestDetailsContext);
export default AllRecentRequest;
