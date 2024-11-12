import React from 'react'
import Avatar from '@mui/joy/Avatar';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import CardActions from '@mui/joy/CardActions';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import axios from 'axios';     
import { Link } from 'react-router-dom'    

const ItemCard = ({item}) => {

  const onDeleteClick = (id)=>{
    axios.delete(`http://localhost:3000/api/items/${id}`).then(()=>{
      window.location.reload();
    }).catch((err)=>{
      console.log("Delete error", err);
    })
  }   
    return (              
          
                    
              <Card
                sx={{
                  width: 320,
                  maxWidth: '200%',
                  boxShadow: 'lg',
                }}>

                <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                  <Avatar src='https://img.icons8.com/fluency/2x/trash.png' sx={{ '--Avatar-size': '4rem' }} />
                  {/* <img src="https://img.freepik.com/free-photo/3d-cartoon-portrait-person-practicing-law-profession_23-2151419565.jpg?size=626&ext=jpg&ga=GA1.1.23783133.1695980855&semt=ais_user"
                  alt="" />  */}
                  
                  <Typography level="title-lg">{item.name}</Typography>
                  <Typography variant="body2" color='text.secondary' >
                    {item.limit}<br />
                    {item.description}
                  </Typography>
                  
                </CardContent>
                <CardOverflow sx={{ bgcolor: 'background.level1' }}>
                  <CardActions buttonFlex="1">
                    <ButtonGroup variant="outlined" sx={{ bgcolor: 'background.surface' }}>
                      <Button onClick={()=>onDeleteClick(item._id)}>Delete</Button>
                      
                    </ButtonGroup>

                    <Link className="btn btn-outline-warning float-right" to={`/itemdetails/${item._id}`}>Details</Link>


                  </CardActions>
                </CardOverflow>
              </Card>
            
          

  )
}

export default ItemCard
