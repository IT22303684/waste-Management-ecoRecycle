import { useState } from 'react'
import './App.css'
import Navbar from './components/NavBar'
import Footer from './components/Footer'
import EmployeeList from './components/CompanyList'
import InsertEmployee from './components/InsertCompany'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CompanyDetails from './components/CompanyDetails';
import UpdateCompany from './components/UpdateCompany'
import ItemList from './components/ItemList'
import ItemDetails from './components/ItemDetails'
import UpdateItem from './components/UpdateItem'
import InsertItem from './components/InsertItem'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Navbar/>
        <Routes>
          <Route path='/' element={<EmployeeList/>} />
          <Route path='/insert' element={<InsertEmployee/>} />
          <Route path='/companydetails/:id' element={<CompanyDetails/>} />
          <Route path='/updatedetails/:id' element={<UpdateCompany/>} />
          <Route path='/itemlist' element={<ItemList/>} />
          <Route path='/insertitem' element={<InsertItem/>} />
          <Route path='/itemdetails/:id' element={<ItemDetails/>} />
          <Route path='/itemupdate/:id' element={<UpdateItem/>} />
        </Routes>  
      <Footer/>
    </Router> 
    </>
  )
}

export default App;
