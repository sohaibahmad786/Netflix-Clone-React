import React, { useState } from 'react'
import Pic from "../Netflix_Project/Netflix_image.jpg"
import './Signin_page.css'
import { Link } from 'react-router-dom'

const Signin_page = () => {
  const [inputdata, setinputdata] = useState({
    email:"",
  })

  const Onchange_handler=(e)=>{
    const {name,value}=e.target
    setinputdata({...inputdata,[name]:value})
  }

  const submit_handler=(e)=>{
    e.preventDefault()
    if(inputdata.email=="")
    {
      alert("Please Enter Your Data")
    }
    else{
      alert("Wellcome To Netflix")
    }
    setinputdata({
      email:"",
    })
  }

  return (
    <div className='container'>
      <div className='head'>
        <div>
          <h1>NETFLIX</h1>
        </div>
        <div>
          <button>
            <Link to={'/input_data'} style={{textDecoration:"none", color:"white"}}>
              Sign In
            </Link>
          </button>
        </div>
      </div>

      <div className='mid'>
        <h1>Unlimited Movies,TV Shows</h1>
        <p>Ready to watch? Enter your Email to </p>
        <p style={{ marginTop: "5px" }}>Create a or restart your Membership </p>

        <form onSubmit={submit_handler}>
          <input 
            type='email' 
            placeholder='Enter Your Email' 
            name='email' 
            value={inputdata.email} 
            onChange={Onchange_handler}
          />
        </form>
      </div>

      
      <div className='start_btn'>
        <button 
          onClick={submit_handler} 
          disabled={inputdata.email === ""}
        >
          <Link 
            to={inputdata.email === "" ? "#" : "/home_page"} 
            style={{textDecoration:"none", color:"white"}}
          >
            Get Started
          </Link>
        </button>
      </div>
    </div>
  )
}

export default Signin_page
