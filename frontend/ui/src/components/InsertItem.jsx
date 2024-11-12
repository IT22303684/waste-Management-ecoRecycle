import React, { useState } from 'react'
import './InsertCompany.css'
import axios from 'axios'


const InsertItem = () => {
    //manage state
    const [itemData, setItemdata] = useState({
        name:"",
        limit:"",
        description:""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;    
        setItemdata({
           ...itemData,
            [name]: value,
        });
        console.log(itemData);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:3000/api/items",itemData).then(()=>{
            console.log("Item added successfully");
            setItemdata({
                name:"",
                limit:"",
                description:""
            });
        })
    };    

  return (
    <div className="centered-container">
       <form onSubmit={handleSubmit} class="form-container">
        <label for="name">Category:</label>
        <input type="text" id="name" name="name" onChange={handleChange} value={itemData.name} required/>

        <label for="limit">Item limit:</label>
        <input type="text" id="limit" name="limit" onChange={handleChange} value={itemData.limit} required/>

        <label for="description">Item description:</label>
        <input type="text" id="description" name="description" onChange={handleChange} value={itemData.description} required/>
        
        <button type="submit" class="full-width">Submit</button>
    </form>
    </div>
  )
}

export default InsertItem