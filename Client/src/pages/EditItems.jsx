import React from "react";

import { FormRow } from "../Components";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { RITEM_CATEGORY, RITEM_STATUS } from "../../../Utils/constants";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch(`/RItems/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/dashboard/all-items");
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.patch(`/RItems/${params.id}`, data);
    toast.success("Item edited successfully");
    return redirect("/dashboard/all-items");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const EditItems = () => {
  const Ritem = useLoaderData();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className=" shadow-lg  flex flex-col justify-center items-center min-h-screen bg-background">
      <h4 className="font-mono mb-5 text-4xl font-bold text-center mt-8 text-bla">
        Update Waste Item
      </h4>

      <Form
        method="post"
        className="w-full  p-6 rounded-lg shadow-md bg-background"
      >
        <div className="space-y-6">
          <FormRow
            type="text"
            name="name"
            label="Name"
            className=" border-2 w-2/6 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm p-2 text-lg"
            labelClass="block text-gray-700 font-bold mb-2"
            defaulyValue={Ritem.rItem.name}
          />

          <FormRow
            type="text"
            name="description"
            label="Description"
            className="border-gray-300 border-2 w-5/6 h-20 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm p-2 text-lg"
            labelClass="block text-gray-700 font-bold mb-2"
            defaulyValue={Ritem.rItem.description}
          />

          <FormRow
            type="text"
            name="Location"
            label="Location"
            className="border-gray-300  border-2 w-3/6 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm p-2 text-lg"
            labelClass="block text-gray-700 font-bold mb-2"
            defaulyValue={Ritem.rItem.Location}
          />

          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Category
            </label>
            <select
              name="category"
              className="border-gray-300 border-2 w-1/5 focus:border-black focus:ring-black rounded-md shadow-sm p-2 text-lg"
            >
              {Object.values(RITEM_CATEGORY).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Hidden status field remains as is */}

          <FormRow
            type="number"
            name="weight"
            label="Weight"
            className="border-gray-300 focus:border-black focus:ring-black rounded-md shadow-sm p-2 text-lg"
            labelClass="block text-gray-700 font-bold mb-2"
            defaulyValue={Ritem.rItem.weight}
          />

          <button
            disabled={isSubmitting}
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline   
disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default EditItems;
