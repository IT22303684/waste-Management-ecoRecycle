import React from "react";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();

  const userData = Object.fromEntries(formData.entries());

  try {
    await customFetch.post("/auth/register", userData);
    toast.success("User added successfully");
    return redirect("/AdminDashboard/user-management");
  } catch (error) {
    toast.error(error?.response?.data?.msg || "Error adding user");
    return error;
  }

  return null;
};

function Adduser() {
  const today = new Date().toISOString().split("T")[0];

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="bg-white w-full flex items-center justify-center flex-col min-h-screen mb-10">
      <div
        className="bg-white px-10 py-20 rounded w-2/3 overflow-auto"
        style={{ maxHeight: "90vh" }}
      >
        <h3 className="font-semibold text-sky-600 text-3xl text-center">
          ADD EMPLOYEE
        </h3>

        <Form method="post">
          {/* Name Field */}
          <div className="mt-8">
            <label className="text-lg font-medium">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1"
              placeholder="Name"
            />
          </div>

          {/* Last Name Field */}
          <div className="mt-8">
            <label className="text-lg font-medium">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1"
              placeholder="Last Name"
            />
          </div>

          {/* Email Field */}
          <div className="mt-8">
            <label className="text-lg font-medium">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1"
              placeholder="Email"
            />
          </div>

          {/* Password Field */}
          <div className="mt-8">
            <label className="text-lg font-medium">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1"
              placeholder="Password"
            />
          </div>

          {/* Location Field */}
          <div className="mt-8">
            <label className="text-lg font-medium">Location</label>
            <input
              type="text"
              name="location"
              id="location"
              className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1"
              placeholder="Location"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-4">
            <button
              type="submit"
              className="bg-sky-500 text-white font-bold py-4 rounded w-full hover:bg-sky-700"
            >
              Submit
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Adduser;
