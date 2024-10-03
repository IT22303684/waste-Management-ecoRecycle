import React from "react";
import { Form, redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useNavigation } from "react-router-dom";
import { useParams, useSearchParams } from "react-router-dom";

export const loader = async ({ params }) => {
  try {
    const requestResponse = await customFetch(`/request/retriveRequest/${params.id}`);
    // Call the second API using the CreatedBy as User_ID
    const bankResponse = await customFetch(`/bank/${requestResponse.data.createdBy}`);

    return {
      request: requestResponse.data,
      bank: bankResponse.data
    };
  } catch (error) {
    toast.error(error?.response?.data?.msg || "Failed to load data");
    return redirect("/AdminDashboard/request");
  }
};
export const action = async ({ request }) => {
  const formData = await request.formData();

};

export default function Transaction() {
  const { request, bank } = useLoaderData();
  const navigation = useNavigation();
  const { vehicles } = useLoaderData();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-[-20px]">
      {/* Card Container */}
      <div className="relative w-full max-w-4xl bg-white shadow-lg rounded-lg border border-black p-4 md:p-6 mt-0">
        <h2 className="font-mono mb-2 text-sm md:text-lg font-bold text-center">
          Payment Form
        </h2>
        <Form
          method="post"
          className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2"
        >
          <div className="form-group">
            <label htmlFor="customerName" className="text-xs text-gray-700 font-semibold">Customer Name:</label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={request?.name}
              className="w-full p-1 text-xs border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="requestDate" className="text-xs text-gray-700 font-semibold">Request Date:</label>
            <input
              // type="date"
              id="requestDate"
              name="requestDate"
              value={request?.createdAt}
              className="w-full p-1 text-xs border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="requestType" className="text-xs text-gray-700 font-semibold">Request Type:</label>
            <input
              type="text"
              id="requestType"
              name="requestType"
              className="w-full p-1 text-xs border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="weight" className="text-xs text-gray-700 font-semibold">Weight:</label>
            <input
              type="number"
              id="weight"
              name="weight"
              className="w-full p-1 text-xs border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="requestAddress" className="text-xs text-gray-700 font-semibold">Request Address:</label>
            <input
              type="text"
              id="requestAddress"
              name="requestAddress"
              className="w-full p-1 text-xs border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="fullAmount" className="text-xs text-gray-700 font-semibold">Full Amount:</label>
            <input
              type="number"
              id="fullAmount"
              name="fullAmount"
              className="w-full p-1 text-xs border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="accountNumber" className="text-xs text-gray-700 font-semibold">Account Number:</label>
            <input
              type="text"
              id="accountNumber"
              name="accountNumber"
              value={bank?.Account_Number}
              className="w-full p-1 text-xs border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="accountName" className="text-xs text-gray-700 font-semibold">Account Name:</label>
            <input
              type="text"
              id="accountName"
              name="accountName"
              value={bank?.Account_Name}
              className="w-full p-1 text-xs border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="bankName" className="text-xs text-gray-700 font-semibold">Bank Name:</label>
            <input
              type="text"
              id="bankName"
              name="bankName"
              value={bank?.Bank_Name}
              className="w-full p-1 text-xs border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="branchCode" className="text-xs text-gray-700 font-semibold">Branch Code:</label>
            <input
              type="text"
              id="branchCode"
              name="branchCode"
              value={bank?.Branch_Code}
              className="w-full p-1 text-xs border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="col-span-2 flex justify-center mt-2">
            <button
              type="submit"
              className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 text-xs"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

