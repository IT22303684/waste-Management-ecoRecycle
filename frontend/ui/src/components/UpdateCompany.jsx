import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./UpdateCompany.css";

function UpdateCompany() {
  const [company, setCompanies] = useState({
    companyID: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    companytype: "",
    stocklimit: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/companies/${id}`)
      .then((res) => {
        setCompanies({
          companyID: res.data.companyid,
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone,
          address: res.data.address,
          companytype: res.data.companytype,
          stocklimit: res.data.stocklimit,
        });
      })
      .catch((err) => {
        console.log("Error from update company", err);
      });
  }, [id]);

  const onChange = (e) => {
    setCompanies({ ...company, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      companyID: company.companyID,
      name: company.name,
      email: company.email,
      phone: company.phone,
      address: company.address,
      companytype: company.companytype,
      stocklimit: company.stocklimit,
    };

    axios
      .put(`http://localhost:3000/api/companies/${id}`, data)
      .then((res) => {
        navigate(`/companydetails/${id}`);
      })
      .catch((err) => {
        console.log("Error from update company", err);
      });
  };

  return (
    <div className="UpdateCompany">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/" className="btn btn-outline-warning mb-3">
              Show Company List
            </Link>
            <div className="card">
              <h2>Update Company</h2>
              <form noValidate onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor="companyID" className="form-label">
                    Company ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="companyID"
                    placeholder="ID of Company"
                    value={company.companyID}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Company Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Name of Company"
                    value={company.name}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Company Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    placeholder="Email"
                    value={company.email}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    placeholder="Phone"
                    value={company.phone}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    placeholder="Address"
                    value={company.address}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="companytype" className="form-label">
                    Company Type
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="companytype"
                    placeholder="Company Type"
                    value={company.companytype}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="stocklimit" className="form-label">
                    Stock Limit
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="stocklimit"
                    placeholder="Stock Limit"
                    value={company.stocklimit}
                    onChange={onChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Update Company
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateCompany;
