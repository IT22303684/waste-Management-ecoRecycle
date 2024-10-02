import React, { useEffect, useState } from "react";
import { Form, useNavigation, useOutletContext, useNavigate } from "react-router-dom";
import { FormRow } from "../Components";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import hero from "../assets/Images/account.jpg";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const formObject = Object.fromEntries(formData);

  const isUpdate = formObject.id ? true : false;

  try {
    if (isUpdate) {
      await customFetch.patch(`/bank/${formObject.id}`, formObject);
      toast.success("Bank Details updated successfully");
    } else {
      await customFetch.post("/Bank", formObject);
      toast.success("Bank Details added successfully");
    }
    return null;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const BankDetailsForm = () => {
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isSubmitting = navigation.state === "submitting";
  const [bankDetails, setBankDetails] = useState(null);

  useEffect(() => {
    if (user?._id) {
      fetchBankDetails(user._id);
    }
  }, [user]);

  const fetchBankDetails = async (userId) => {
    try {
      const User_ID = userId;
      const response = await customFetch.get(`/bank/${User_ID}`);

      setBankDetails({
        _id: response.data._id,
        Account_Number: response.data.Account_Number,
        Account_Name: response.data.Account_Name,
        Bank_Name: response.data.Bank_Name,
        Branch_Code: response.data.Branch_Code,
      });

      console.warn("Bank details", bankDetails);

    } catch (error) {
      console.log("No existing bank details");
      setBankDetails(null);
    }
  };

  const handleDelete = async () => {
    if (!bankDetails || !bankDetails._id) {
      toast.error("No bank details to delete");
      return;
    }

    try {
      await customFetch.delete(`/bank/${bankDetails._id}`);
      navigate("/dashboard/Bank-Details");
      toast.success("Bank details deleted successfully");
      setBankDetails(null);
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Failed to delete bank details");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="font-mono mb-5 text-4xl font-bold text-center mt-4">
        {bankDetails ? "Update Bank Details" : "Add Bank Details"}
      </h2>
      <div className="mb-4">
        <img
          src={hero}
          alt="profile"
          className="w-48 h-48 rounded-full object-cover"
        />
      </div>
      <Form method="post" className="grid grid-cols-2 gap-4 p-6" encType="multipart/form-data">
        <input type="hidden" name="id" value={bankDetails?._id || ''} />
        <input type="hidden" name="User_ID" value={user._id} />

        <FormRow
          type="text"
          name="Account_Number"
          labelText="Account Number"
          defaulyValue={bankDetails?.Account_Number || ''}
          className="w-full p-2 border border-gray-300 rounded-md"
          labelClass="text-xl text-gray-700 font-bold capitalize"
        />
        <FormRow
          type="text"
          name="Account_Name"
          labelText="Account Name"
          defaulyValue={bankDetails?.Account_Name || ''}
          className="w-full p-2 border border-gray-300 rounded-md"
          labelClass="text-xl text-gray-700 font-bold capitalize"
        />
        <FormRow
          type="text"
          name="Bank_Name"
          labelText="Bank Name"
          defaulyValue={bankDetails?.Bank_Name || ''}
          className="w-full p-2 border border-gray-300 rounded-md"
          labelClass="text-xl text-gray-700 font-bold capitalize"
        />
        <FormRow
          type="text"
          name="Branch_Code"
          labelText={"Branch Code"}
          defaulyValue={bankDetails?.Branch_Code || ''}
          className="w-full p-2 border border-gray-300 rounded-md"
          labelClass="text-xl text-gray-700 font-bold capitalize"
        />

        <div className="col-span-1 flex justify-start">
          {bankDetails && (
            <button
              type="button"
              className="px-4 py-2 bg-orange-900 text-white rounded-md transition-colors duration-200"
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
        </div>

        <div className="col-span-1 flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : (bankDetails?._id ? "Update" : "Submit")}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default BankDetailsForm;