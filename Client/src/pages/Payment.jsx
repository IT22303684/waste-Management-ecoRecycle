import React from "react";
import { Form, useLoaderData, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch"; // Assuming customFetch is your utility for making API requests
import { useNavigation, useSearchParams } from "react-router-dom";

// Loader function to fetch waste and bank data
export const loader = async ({ params, request }) => {
  try {
    const url = new URL(request.url);
    const cusId = url.searchParams.get("cusId"); // Get customer ID from query params

    // Fetch waste and bank data in parallel
    const [wasteResponse, bankResponse] = await Promise.all([
      customFetch(`/waste/retriveSpecificCollectedWaste/${params.id}`), // Fetch waste details using `params.id`
      customFetch(`/bank/${cusId}`), // Fetch bank details based on `cusId`
    ]);

    // Return the fetched data
    return {
      waste: wasteResponse.data,
      bank: bankResponse.data,
      cusId, // Return the customer ID from query params
    };
  } catch (error) {
    if (error?.response?.status === 404) {
      toast.error("User not updated their bank details");
    } else {
      toast.error(error?.response?.data?.msg || "Failed to load data");
    }
    return redirect("/AdminDashboard/transaction"); // Redirect in case of failure
  }
};

export default function Payment() {
  const { waste, bank } = useLoaderData(); // Fetch data using the loader
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // Handle Payment API call
  const handlePayment = async (event) => {
    event.preventDefault(); // Prevent the form from submitting normally

    const paymentDetails = {
      customerName: waste?.CustomerName,
      customerID: waste?.CustomerId,
      collectedDate: waste?.CollectedDate,
      wasteCategory: waste?.WasteCategory,
      weight: waste?.Weight,
      fullAmount: waste?.Price,
      accountNumber: bank?.Account_Number,
      accountName: bank?.Account_Name,
      bankName: bank?.Bank_Name,
      branchCode: bank?.Branch_Code,
    };

    try {
      const response = await customFetch.post("/pay-user", paymentDetails);

      if (response.status === 200) {
        toast.success("Payment processed successfully!");
      } else {
        throw new Error("Failed to process payment");
      }
    } catch (error) {
      toast.error(error.message || "Payment failed");
    }
  };

  // Redirect user to Stripe Checkout page
  const handleStripeCheckout = () => {
    window.location.href = "https://buy.stripe.com/test_8wMcQH6EXdsW5YQfYY";
  };

  // Download PDF Handler (You can implement the actual logic here)
  const handleDownloadPDF = () => {
    // Implement PDF download logic here
    console.log("Download PDF for customer:", waste.CustomerName);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Card Container */}
      <div className="relative w-full max-w-4xl bg-white shadow-lg p-4 md:p-6 mt-4">
        <h2 className="text-lg font-bold text-center mb-6">PAYMENT FORM</h2>

        {/* Form with payment details */}
        <Form
          method="post"
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handlePayment} // Bind the form submit to the handlePayment function
        >
          {/* Form Fields */}
          <div className="form-group">
            <label
              htmlFor="customerName"
              className="text-sm text-gray-700 font-semibold"
            >
              Customer Name:
            </label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              defaultValue={waste?.CustomerName}
              className="w-full p-2 text-sm border border-gray-300 rounded-md"
              required
              readOnly
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="customerID"
              className="text-sm text-gray-700 font-semibold"
            >
              Customer ID:
            </label>
            <input
              type="text"
              id="customerID"
              name="customerID"
              defaultValue={waste?.CustomerId}
              className="w-full p-2 text-sm border border-gray-300 rounded-md"
              required
              readOnly
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="requestDate"
              className="text-sm text-gray-700 font-semibold"
            >
              Collected Date:
            </label>
            <input
              id="requestDate"
              name="requestDate"
              defaultValue={waste?.CollectedDate}
              className="w-full p-2 text-sm border border-gray-300 rounded-md"
              required
              readOnly
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="requestType"
              className="text-sm text-gray-700 font-semibold"
            >
              Category:
            </label>
            <input
              type="text"
              id="requestType"
              name="requestType"
              defaultValue={waste?.WasteCategory}
              className="w-full p-2 text-sm border border-gray-300 rounded-md"
              required
              readOnly
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="weight"
              className="text-sm text-gray-700 font-semibold"
            >
              Weight:
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              defaultValue={waste?.Weight}
              className="w-full p-2 text-sm border border-gray-300 rounded-md"
              required
              readOnly
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="fullAmount"
              className="text-sm text-gray-700 font-semibold"
            >
              Full Amount:
            </label>
            <input
              type="number"
              id="fullAmount"
              name="fullAmount"
              defaultValue={waste?.Price}
              className="w-full p-2 text-sm border border-gray-300 rounded-md"
              required
              readOnly
            />
          </div>

          {/* Bank Details */}
          <div className="form-group">
            <label
              htmlFor="accountNumber"
              className="text-sm text-gray-700 font-semibold"
            >
              Account Number:
            </label>
            <input
              type="text"
              id="accountNumber"
              name="accountNumber"
              defaultValue={bank?.Account_Number}
              className="w-full p-2 text-sm border border-gray-300 rounded-md"
              required
              readOnly
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="accountName"
              className="text-sm text-gray-700 font-semibold"
            >
              Account Name:
            </label>
            <input
              type="text"
              id="accountName"
              name="accountName"
              defaultValue={bank?.Account_Name}
              className="w-full p-2 text-sm border border-gray-300 rounded-md"
              required
              readOnly
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="bankName"
              className="text-sm text-gray-700 font-semibold"
            >
              Bank Name:
            </label>
            <input
              type="text"
              id="bankName"
              name="bankName"
              defaultValue={bank?.Bank_Name}
              className="w-full p-2 text-sm border border-gray-300 rounded-md"
              required
              readOnly
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="branchCode"
              className="text-sm text-gray-700 font-semibold"
            >
              Branch Code:
            </label>
            <input
              type="text"
              id="branchCode"
              name="branchCode"
              defaultValue={bank?.Branch_Code}
              className="w-full p-2 text-sm border border-gray-300 rounded-md"
              required
              readOnly
            />
          </div>

          {/* Action Buttons */}
          <div className="col-span-2 flex flex-col md:flex-row justify-center items-center gap-4 mt-4">
            <button
              type="button"
              onClick={handleStripeCheckout} // Updated to handle Stripe Checkout
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200 text-sm w-full md:w-40"
              disabled={isSubmitting}
            >
              Pay Now
            </button>

            <button
              type="button"
              onClick={handleDownloadPDF}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 text-sm w-full md:w-40"
              disabled={isSubmitting}
            >
              Download PDF
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
