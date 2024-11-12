import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./UpdateCompany.css";

function UpdateItem() {
  const [item, setItems] = useState({
    itemID: "",
    name: "",
    limit: "",
    description: "",
    
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/items/${id}`)
      .then((res) => {
        setItems({
            itemID: res.data.itemid,
          name: res.data.name,
          limit: res.data.limit,
          description: res.data.description,
        });
      })
      .catch((err) => {
        console.log("Error from update item", err);
      });
  }, [id]);

  const onChange = (e) => {
    setItems({ ...item, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      itemID: item.itemID,
      name: item.name,
      limit: item.limit,
      description: item.description,
    };

    axios
      .put(`http://localhost:3000/api/items/${id}`, data)
      .then((res) => {
        navigate(`/itemdetails/${id}`);
      })
      .catch((err) => {
        console.log("Error from update item", err);
      });
  };

  return (
    <div className="UpdateItem">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/" className="btn btn-outline-warning mb-3">
              Show Item List
            </Link>
            <div className="card">
              <h2>Update Item</h2>
              <form noValidate onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor="itemID" className="form-label">
                    Item ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="itemID"
                    placeholder="ID of Item"
                    value={item.itemID}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Item Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Name of Item"
                    value={item.name}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="limit" className="form-label">
                    Item limit
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="limit"
                    placeholder="limit"
                    value={item.limit}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description" className="form-label">
                    Item description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    placeholder="description"
                    value={item.description}
                    onChange={onChange}
                  />
                </div>
                
                <button type="submit" className="btn btn-primary btn-block">
                  Update item
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateItem;
