import React,{useState, useEffect} from 'react'
import {Link,useParams} from 'react-router-dom'
import axios from "axios";

function ItemDetails () {

    
      
    const [items, setItems] = useState([]);
    const { id } = useParams();
  
  
    useEffect(() => {
      axios
      .get(`http://localhost:3000/api/items/${id}`)
      .then((res) => {
        setItems(res.data);
      })
      .catch(() => {
        console.log("Error from itemdetails")
      });
    }, [id]);
  
  
    const TableItem = (
      <div>
        <table className="table table-hover table-dark">
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>ID</td>
              <td>{items.itemID}</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Item Name</td>
              <td>{items.name}</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Item limit</td>
              <td>{items.limit}</td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Item description</td>
              <td>{items.description}</td>
            </tr>
            
          </tbody>
        </table>
      </div>
    );
  
    return (
        <div className="showItemDetails">
            <div className="col-md-10 m-auto">
                <br />
            <Link to="/" className="btn btn-outline-danger float-right">Back to main</Link>
            </div>

            <br/>    
        
            <div className="col-md-8 m-auto">
                <h1 className="display-6-bold text-center">Item Detail</h1>
                <p className="text-center">This is full detail of items</p>
                    <hr />
                    <br />
            </div>

            <div className="col-md-10 m-auto">{TableItem}</div>
            
            <div className="col-md-6 m-auto">
                <Link to={`/itemupdate/${items._id}`}
                    className="btn btn-outline-info btn-lg btn-block d-flex justify-content-center">
                        Edit Details
                </Link>
            </div>

       </div> 
      ) 
  
}    

export default ItemDetails





