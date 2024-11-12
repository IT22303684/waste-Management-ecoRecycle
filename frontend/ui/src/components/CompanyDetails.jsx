import React,{useState, useEffect} from 'react'
import {Link,useParams} from 'react-router-dom'
import axios from "axios";

function CompanyDetails () {

    
      
    const [companies, setCompanies] = useState([]);
    const { id } = useParams();
  
  
    useEffect(() => {
      axios
      .get(`http://localhost:3000/api/companies/${id}`)
      .then((res) => {
        setCompanies(res.data);
      })
      .catch(() => {
        console.log("Error from companydetails")
      });
    }, [id]);
  
  
    const TableItem = (
      <div>
        <table className="table table-hover table-dark">
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>ID</td>
              <td>{companies.companyID}</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Company Name</td>
              <td>{companies.name}</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Company Email</td>
              <td>{companies.email}</td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Company Contact Number</td>
              <td>{companies.phone}</td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>Company Address</td>
              <td>{companies.address}</td>
            </tr>
            <tr>
              <th scope="row">6</th>
              <td>Company Type</td>
              <td>{companies.companytype}</td>
            </tr>
            <tr>
              <th scope="row">7</th>
              <td>Stock Limit</td>
              <td>{companies.stocklimit}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  
    return (
        <div className="showCompanyDetails">
            <div className="col-md-10 m-auto">
                <br />
            <Link to="/" className="btn btn-outline-danger float-right">Back to main</Link>
            </div>

            <br/>    
        
            <div className="col-md-8 m-auto">
                <h1 className="display-6-bold text-center">Company Detail</h1>
                <p className="text-center">This is full detail of companies</p>
                    <hr />
                    <br />
            </div>

            <div className="col-md-10 m-auto">{TableItem}</div>
            
            <div className="col-md-6 m-auto">
                <Link to={`/updatedetails/${companies._id}`}
                    className="btn btn-outline-info btn-lg btn-block d-flex justify-content-center">
                        Edit Details
                </Link>
            </div>

       </div> 
      ) 
  
}    

export default CompanyDetails





