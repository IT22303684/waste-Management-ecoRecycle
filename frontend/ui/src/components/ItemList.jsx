import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Make sure to import Link
import ItemCard from './ItemCard';
import './CompanyList.css';

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/items')
      .then((res) => {
        setItems(res.data);
        console.log(res.data);
      })
      .catch(() => {
        console.log('Error while getting data');
      });
  }, []);

  const itemsList = items.length === 0
    ? 'No items found!'
    : items.map((item, index) => (
        <ItemCard key={index} item={item} />
      ));

  return (
    <div className="Show_ItemList">
      <div className="container">
        <div className="list">{itemsList}</div>
      </div>
      
      <div className="button-container">
        <Link className="btn btn-outline-info btn-lg btn-block d-flex justify-content-center" to="/insertitem">Add</Link>
      </div>

    </div>
  );
};

export default ItemList;
