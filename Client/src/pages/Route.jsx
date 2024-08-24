import React, { createContext, useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import RouteTable from '../Components/RouteTable';

// Loader function to fetch all route data
export const loader = async ({ request }) => {
  try {
    const { data } = await customFetch.get("/routePath/retriveRoutePath");
    console.log('Data fetched:', data); // Debugging output
    return { data };
  } catch (error) {
    console.error('Error fetching route data:', error); 
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

// Create context to provide route data
const allRouteDetailsContext = createContext();

// AllRoutes component that uses the loader data
const AllRoutes = () => {
  const { data } = useLoaderData();
  console.log(data);

  return (
    <allRouteDetailsContext.Provider value={{ data }}>
      <RouteTable />
    </allRouteDetailsContext.Provider>
  );
};

// Custom hook to use route data in other components
export const useAllRoutes = () => useContext(allRouteDetailsContext);

export default AllRoutes;
