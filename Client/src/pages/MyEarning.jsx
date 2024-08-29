// import React from "react";
// import { FormRow } from "../Components";
// import { useOutletContext } from "react-router-dom";
// import { RITEM_CATEGORY, RITEM_STATUS } from "../../../Utils/constants";
// import { Form, useNavigation, redirect } from "react-router-dom";
// import hero from "../assets/Images/account.jpg";
// import { toast } from "react-toastify";
// import customFetch from "../utils/customFetch";

// export const action = async ({ request }) => {
//     console.log("req",request)
//     const formData = await request.formData();
  
//     // Convert formData entries into an object
//     const formObject = Object.fromEntries(formData.entries());
  
//     console.log("Form Data as Object:", formObject); // This will print the form data as an object
  
    
  
//     try {
//       console.log("Form Data as Object:", formObject); // Print form data as object
//       await customFetch.post("/Bank", formObject);
//       toast.success("Bank Details added successfully");
//       return redirect("/dashboard/VBank-Details");
//     } catch (error) {
//       toast.error(error?.response?.data?.msg);
//       return error;
//     }
  
//     return null;
//   };
  

// const AddBankDetails = () => {
//   const { user } = useOutletContext();
//   const navigation = useNavigation();
//   const isSubmitting = navigation.state === "submitting";
//   return (
//     <div className="flex flex-col justify-center items-center">
//       <h3 className="font-mono mb-5 text-4xl font-bold text-center mt-4">
//         Add Bank Account Details
//       </h3>
//       <div>
//         <div className="flex flex-col items-center border p-4 w-[100%]">
//           <div className="mb-4">
//             <img
//               src={hero}
//               alt="profile"
//               className="w-48 h-48 rounded-full object-cover"
//             />
//           </div>
//         </div>
//       </div>
//       <div>
//         <Form method="post" className="border" encType="multipart/form-data">
//           <div className="border border-black flex  bg-DarkGunmetal space-x-4 space-y-10 flex-wrap rounded-xl p-4 shadow-2xl">
//             <FormRow
//               type="text"
//               name="Account Number"
//               label="accountnumber"
//               className="border mt-10   p-2 px-4 text-center text-white bg-zinc-600  border-zinc-600 placeholder:text-xs placeholder:text-center md:text-left placeholder:md:text-left focus:outline-none focus:bg-white focus:text-black"
//               labelClass="text-xl text-white font-bold ml-6 capitalize ml-2"
//             />
//             <FormRow
//               type="text"
//               name="Account Name"
//               label="accountname"
//               className="border p-2 px-4 text-center text-white bg-zinc-600  border-zinc-600 placeholder:text-xs placeholder:text-center md:text-left placeholder:md:text-left focus:outline-none focus:bg-white  focus:text-black"
//               labelClass="text-xl text-white font-bold capitalize ml-2"
//             />
//             <FormRow
//               type="text"
//               name="Bank Name"
//               label="bankname"
//               className="border  p-2 px-4 text-center text-white bg-zinc-600  border-zinc-600 placeholder:text-xs placeholder:text-center md:text-left placeholder:md:text-left focus:outline-none focus:bg-white  focus:text-black"
//               labelClass="text-xl text-white font-bold capitalize ml-2"
//             />
//             <FormRow
//               type="text"
//               name="Branch Code"
//               label="branchcode"
//               className="border p-2 px-4 text-center text-white bg-zinc-600  border-zinc-600 placeholder:text-xs placeholder:text-center md:text-left placeholder:md:text-left focus:outline-none focus:bg-white  focus:text-black"
//               labelClass="text-xl text-white font-bold capitalize ml-2"
//             />
//             {/* <div className="ml-4 ">
//               <button
//                 disabled={isSubmitting}
//                 type="submit"
//                 className="px-10  py-1 text-lg font-sans font-bold  rounded-md text-zinc-800 bg-lime-500 hover:bg-lime-700 hover:text-white duration-500 "
//                 onClick={() => {
//                       window.location.href = "/VBank-Details";
//                   }}
//               >
//                 {isSubmitting ? "Submitting..." : "View My Bank Details"}
//               </button>
//             </div> */}

//             <div className="ml-4 ">
//               <button
//                 disabled={isSubmitting}
//                 type="submit"
//                 className="px-10  py-1 text-lg font-sans font-bold  rounded-md text-zinc-800 bg-lime-500 hover:bg-lime-700 hover:text-white duration-500 "
//               >
//                 {isSubmitting ? "Submitting..." : "Submit"}
//               </button>
//             </div>
//           </div>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default AddBankDetails;
