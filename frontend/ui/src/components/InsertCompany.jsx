import React, { useState } from 'react'
import './InsertCompany.css'
import axios from 'axios'


const InsertCompany = () => {
    //manage state
    const [companyData, setCompanydata] = useState({
        name:"",
        email:"",
        phone:"",
        address:"",
        companytype:"",
        stocklimit:""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;    
        setCompanydata({
           ...companyData,
            [name]: value,
        });
        console.log(companyData);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:3000/api/companies",companyData).then(()=>{
            console.log("Company added successfully");
            setCompanydata({
                name:"",
                email:"",
                phone:"",
                address:"",
                companytype:"",
                stocklimit:""
            });
        })
    };    

  return (
    <div className="centered-container">
       <form onSubmit={handleSubmit} class="form-container">
        <label for="name">Company Name:</label>
        <input type="text" id="name" name="name" onChange={handleChange} value={companyData.name} required/>

        <label for="email">Company Email:</label>
        <input type="text" id="email" name="email" onChange={handleChange} value={companyData.email} required/>

        <label for="phone">Company Contact Number:</label>
        <input type="text" id="phone" name="phone" onChange={handleChange} value={companyData.phone} required/>

        <label for="address">Company Address:</label>
        <input type="text" id="address" name="address" onChange={handleChange} value={companyData.address} required/>

        <label for="companytype">Company Type:</label>
        <input type="text" id="companytype" name="companytype" onChange={handleChange} value={companyData.companytype} required/>

        <label for="stocklimit">Company Stock Limit:</label>
        <input type="text" id="stocklimit" name="stocklimit" onChange={handleChange} value={companyData.stocklimit} required/>

        <button type="submit" class="full-width">Submit</button>
    </form>
    </div>
  )
}

export default InsertCompany