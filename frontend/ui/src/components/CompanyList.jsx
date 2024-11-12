import React, { useState,useEffect } from 'react'
import axios from 'axios';
import CompanyCard from './CompanyCard'
import "./CompanyList.css";

const CompanyList = () => {

  const [companies, setCompanies] = useState([]);

  useEffect(() =>{
    axios.get("http://localhost:3000/api/companies")
   .then((res) =>{
    setCompanies(res.data);
     console.log(res.data);
   }).catch(() =>{
     console.log("Error while getting data");
   });
  }, []);

  const companiesList = 
  companies.length === 0 
      ? "no compnaies found !" 
      : companies.map((company, index) => (
          <CompanyCard key={index} company={company}/>)
    );

  return (
    <div className= "Show_CompanyList">
      <div className="container">
        <div className="list">{companiesList}</div>
        
      </div>

    </div>
  );
};

export default CompanyList;
