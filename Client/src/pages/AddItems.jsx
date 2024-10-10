import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { RITEM_CATEGORY } from "../../../Utils/constants";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
  const fromData = await request.formData();
  const file = fromData.get("itemPhoto");

  if (file && file.size > 500000) {
    toast.error("File size should be less than 0.5mb");
    return null;
  }

  try {
    await customFetch.post("/RItems", fromData);
    toast.success("Item added successfully");
    return redirect("/dashboard/all-Items");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AddItems = () => {
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // Form values and errors state
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    Location: user?.location || "",
    phoneNo: "",
    weight: "",
    category: RITEM_CATEGORY[0] || "", // Default to the first category
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    Location: "",
    phoneNo: "",
    weight: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMsg = "";

    switch (name) {
      case "name":
        if (!value) errorMsg = "Name is required.";
        break;
      case "description":
        if (!value) errorMsg = "Description is required.";
        break;
      case "Location":
        if (!value) errorMsg = "Location is required.";
        break;
      case "phoneNo":
        if (!value) {
          errorMsg = "Phone Number is required.";
        } else if (!/^\d+$/.test(value)) {
          errorMsg = "Phone Number must be numeric.";
        } else if (!/^\d{10}$/.test(value)) {
          errorMsg = "Telephone number must be 10 digits.";
        }
        break;
      case "weight":
        if (!value) {
          errorMsg = "Weight is required.";
        } else if (value <= 0) {
          errorMsg = "Weight must be greater than zero.";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-6">
      <h4 className="font-mono mb-5 text-4xl font-bold text-center text-black">
        Add Waste Item
      </h4>

      <Form
        method="post"
        className="w-full max-w-lg p-8 bg-white shadow-md rounded-lg"
        encType="multipart/form-data"
      >
        <div className="space-y-6">
          <div>
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Waste item Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formValues.name}
              onChange={handleChange}
              className={`border-2 w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm p-2 text-lg ${
                errors.name ? "border-red" : ""
              }`}
            />
            {errors.name && <p className="text-red text-sm">{errors.name}</p>}
          </div>

          <div>
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={formValues.description}
              onChange={handleChange}
              className={`border-2 w-full h-20 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm p-2 text-lg ${
                errors.description ? "border-red" : ""
              }`}
            />
            {errors.description && (
              <p className="text-red text-sm">{errors.description}</p>
            )}
          </div>

          <div>
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="Location"
            >
              Location
            </label>
            <input
              type="text"
              name="Location"
              id="Location"
              value={formValues.Location}
              onChange={handleChange}
              className={`border-2 w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm p-2 text-lg ${
                errors.location ? "border-red" : ""
              }`}
            />
            {errors.location && (
              <p className="text-red text-sm">{errors.location}</p>
            )}
          </div>

          <div>
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="phoneNo"
            >
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNo"
              id="phoneNo"
              value={formValues.phoneNo}
              onChange={handleChange}
              className={`border-2 w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm p-2 text-lg ${
                errors.phoneNo ? "border-red" : ""
              }`}
            />
            {errors.phoneNo && (
              <p className="text-red text-sm">{errors.phoneNo}</p>
            )}
          </div>

          <div>
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="category"
            >
              Category
            </label>
            <select
              name="category"
              id="category"
              value={formValues.category}
              onChange={handleChange}
              className="border-2 border-gray-300 w-full focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm p-2 text-lg"
            >
              {Object.values(RITEM_CATEGORY).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="weight"
            >
              Weight (Kg)
            </label>
            <input
              type="number"
              name="weight"
              id="weight"
              value={formValues.weight}
              onChange={handleChange}
              className={`border-2 w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm p-2 text-lg ${
                errors.weight ? "border-red" : ""
              }`}
            />
            {errors.weight && (
              <p className="text-red text-sm">{errors.weight}</p>
            )}
          </div>

          <div>
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="itemPhoto"
            >
              Select Picture (max 0.5mb)
            </label>
            <input
              type="file"
              id="itemPhoto"
              name="itemPhoto"
              accept="image/*"
              className="border-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm p-2 text-lg w-full"
            />
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default AddItems;
