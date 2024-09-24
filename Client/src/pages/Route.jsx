import React, { createContext, useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import RouteTable from '../Components/RouteTable';


export const loader = async ({ request }) => {
  try {
    const { data } = await customFetch.get("/routePath/retriveRoutePath");
    console.log('Data fetched:', data);
    return { data };
  } catch (error) {
    console.error('Error fetching route data:', error); 
    toast.error(error?.response?.data?.msg);
    return error;
  }
};


const allRouteDetailsContext = createContext();


const AllRoutes = () => {
  const { data } = useLoaderData();
  console.log(data);

  return (
    <allRouteDetailsContext.Provider value={{ data }}>
      <div className="w-full h-screen overflow-x-auto"> {/* Ensure scrolling */}
        <RouteTable />
      </div>
 
      
    </allRouteDetailsContext.Provider>
  );
};


export const useAllRoutes = () => useContext(allRouteDetailsContext);

export default AllRoutes;
