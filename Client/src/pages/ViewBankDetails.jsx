import React from "react";
import { Link, useNavigation, useOutletContext } from "react-router-dom";
import { Form } from "react-router-dom";
import { FormRow } from "../Components";
import profileImg from "../assets/profile/profile.jpg";
import { useLoaderData } from "react-router-dom";
import { useDashbordContext } from "./DashboardLayout";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { FaUserCircle } from "react-icons/fa";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get("avatar");
  if (file && file.size > 500000) {
    toast.error("File size should be less than 0.5mb");
    return null;
  }

  try {
    await customFetch.patch("/users/update-user", formData);
    toast.success("Bank Details updated successfully");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }

  return null;
};

const ViewBankDetails = () => {
  const { user } = useOutletContext();
  console.log(user);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <div>
      <div className="flex items-center justify-center">
        {/* <!--Card Container--> */}
        <div className="relative   m-6 space-y-10 bg-white shadow-2xl  rounded-2xl  border border-black ">
          <h2 className="font-mono mb-5 text-4xl font-bold text-center mt-4">
            My Bank Details
          </h2>
          <div className="flex">

            <div className="flex justify-center items-center border flex-1">
              <Form
                method="post"
                className="grid grid-cols-2 gap-4 p-6"
                encType="multipart/form-data"
              >
                <FormRow
                  type="text"
                  name="Account Number"
                  // defaulyValue={user?.accountNumber}
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light"
                  labelClass="text-xl text-gray-700 font-bold capitalize"
                />
                <FormRow
                  type="text"
                  name="Account Name"
                  // defaulyValue={user?.accountName}
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light"
                  labelClass="text-xl text-gray-700 font-bold capitalize"
                />
                <FormRow
                  type="text"
                  name="Bank Name"
                  // defaulyValue={user?.bankName}
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light"
                  labelClass="text-xl text-gray-700 font-bold capitalize"
                />
                <FormRow
                  type="text"
                  name="Branch Code"
                  // defaulyValue={user?.branchCode}
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light"
                  labelClass="text-xl text-gray-700 font-bold capitalize"
                />
                <div className="col-span-1 flex justify-start">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "deleting..." : "Delete"}
                  </button>
                  </div>

                <div className="col-span-1 flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "updating..." : "Update"}
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBankDetails;

