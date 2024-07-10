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
    <div className="flex flex-col justify-center items-center">
      <h4 className="font-mono mb-5 text-4xl font-bold text-center mt-4">
        Edit Item
      </h4>
      <Form method="post" className="border">
        <div className="border border-black flex  bg-DarkGunmetal space-x-4 space-y-10 flex-wrap rounded-xl p-4 shadow-2xl">
          <FormRow
            type="text"
            name="name"
            label="Name"
            className="border mt-10   p-2 px-4 text-center text-black  border-zinc-600 placeholder:text-xs placeholder:text-center md:text-left placeholder:md:text-left focus:outline-none focus:bg-white focus:text-black"
            labelClass="text-xl text-white font-bold ml-6 capitalize ml-2"
            defaulyValue={Ritem.rItem.name}
          />
          <FormRow
            type="text"
            name="description"
            label="Description"
            className="border p-2 px-4 text-center text-black   border-zinc-600 placeholder:text-xs placeholder:text-center md:text-left placeholder:md:text-left focus:outline-none"
            labelClass="text-xl text-white font-bold capitalize ml-2"
            defaulyValue={Ritem.rItem.description}
          />
          <FormRow
            type="text"
            name="price"
            label="Price"
            className="border  p-2 px-4 text-center text-black bg-white  border-zinc-600 placeholder:text-xs placeholder:text-center md:text-left placeholder:md:text-left focus:outline-none"
            labelClass="text-xl text-white font-bold capitalize ml-2"
            defaulyValue={Ritem.rItem.price}
          />
          <FormRow
            type="text"
            name="Location"
            label="Location"
            className="border p-2 px-4 text-center text-black bg-white border-zinc-600 placeholder:text-xs placeholder:text-center md:text-left placeholder:md:text-left focus:outline-none focus:bg-white  focus:text-black"
            labelClass="text-xl text-white font-bold capitalize ml-2"
            defaulyValue={Ritem.rItem.Location}
          />

          <div>
            <label className="text-xl text-white font-bold capitalize ml-2">
              Category
            </label>
            <select name="category" className="text-xl ml-4 w-40 h-10">
              {Object.values(RITEM_CATEGORY).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="hidden">
            <label>Status</label>
            <select name="status">
              {Object.values(RITEM_STATUS).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <FormRow
            type="number"
            name="weight"
            label="Weight"
            className="border  p-2 px-4 text-center text-black bg-white  border-zinc-600 placeholder:text-xs placeholder:text-center md:text-left placeholder:md:text-left focus:outline-none focus:bg-white  focus:text-black"
            labelClass="text-xl text-white font-bold capitalize ml-2"
            defaulyValue={Ritem.rItem.weight}
          />
          <div className="ml-4 ">
            <button
              disabled={isSubmitting}
              type="submit"
              className="px-10  py-1 text-lg font-sans font-bold  rounded-md text-zinc-800 bg-lime-500 hover:bg-lime-700 hover:text-white duration-500 "
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default EditItems;
