import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { IoPersonAddSharp, IoBuild, IoTrashSharp } from "react-icons/io5";
import { Form } from "react-router-dom";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// Loader to fetch all users
export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/getAllusers");
    console.log(data);
    return { users: data.users }; // Return all users
  } catch (error) {
    toast.error(error?.response?.data?.msg || "Failed to load Users");
    return { users: [] }; // Return an empty list in case of error
  }
};

function UserManagement() {
  const { users } = useLoaderData(); // Load the user data
  const [userList, setUserList] = useState(users || []);

  // UseEffect to update state on data change
  useEffect(() => {
    setUserList(users);
  }, [users]);

  // Function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.text("Eco Recycle - All Users", 14, 10);

    doc.setFontSize(12);
    doc.text("All Users", 14, 16); // Title

    const tableColumn = [
      "User ID",
      "Name",
      "Last Name",
      "Email",
      "Location",
      "Role",
    ];
    const tableRows = [];

    userList.forEach((user) => {
      const userData = [
        user._id.slice(0, 6), // Shortened ID
        user.name,
        user.lastName,
        user.email,
        user.location,
        user.role,
      ];
      tableRows.push(userData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      styles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
      headStyles: {
        fillColor: [22, 160, 133],
        textColor: [255, 255, 255],
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240],
      },
      margin: { top: 30 },
    });

    doc.save("Users.pdf"); // Save the PDF
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <Link to={"../add-employee"}>
          <button className="bg-green-500 text-white px-4 py-2 hover:bg-green-600 rounded shadow-md outline-none border-none select-none flex items-center">
            <IoPersonAddSharp className="mr-2" />
            Add User
          </button>
        </Link>
        {/* Generate PDF Button */}
        <button
          className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 rounded shadow-md outline-none border-none select-none flex items-center"
          onClick={generatePDF}
        >
          Generate PDF
        </button>
      </div>
      <br />
      <div className="bg-white px-4 pb-4 rounded-sm border border-gray-200 w-full pt-3">
        <strong className="font-medium text-xl text-sky-600">All Users</strong>
        <div className="overflow-y-auto mt-3" style={{ maxHeight: "600px" }}>
          <table className="min-w-full text-gray-700">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Avatar</th>
                <th>Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Location</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user) => (
                <tr key={user._id}>
                  <td>{user._id.slice(0, 6)}</td> {/* Shortened ID */}
                  <td>
                    <img
                      src={user.avatar}
                      alt={`${user.name} ${user.lastName}`}
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.location}</td>
                  <td>{user.role}</td>
                  <td>
                    <div className="flex space-x-2">
                      <Link to={`../edit-user/${user._id}`}>
                        <button className="bg-sky-500 text-white px-4 py-2 hover:bg-sky-600 rounded shadow-md outline-none border-none select-none">
                          <IoBuild />
                        </button>
                      </Link>
                      <Form method="post" action={`../delete-user/${user._id}`}>
                        <button className="bg-red text-white px-4 py-2 hover:bg-red-600 rounded shadow-md outline-none border-none select-none">
                          <IoTrashSharp />
                        </button>
                      </Form>
                    </div>
                  </td>
                </tr>
              ))}
              {/* If no users are available */}
              {userList.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center text-red-500">
                    No Users Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default UserManagement;
