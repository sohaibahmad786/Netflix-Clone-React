import React, { useState } from 'react'
import './Input_data.css'
import { Link } from 'react-router-dom'

const Input_data = () => {
  const [data, setdata] = useState({
    name:"",
    email:"",
    password:"",
  })

  const Onchange_handler=(e)=>{
    const {name,value}=e.target
    setdata({...data,[name]:value})
  }

  const Onsubmit_handler=(e)=>{
    e.preventDefault()
    if(data.name === "" || data.email === "" || data.password === ""){
      alert("Please fill all fields!")
      return
    }
    alert("Congratulations")
  }

  const isDisabled = data.name === "" || data.email === "" || data.password === ""

  return (
    <div className='data_container'>
      <form onSubmit={Onsubmit_handler}>
        <div className='full_control'>
          <div className='input_container'>
            <h1>Sign_in</h1>

            <div className='name'>
              <p>Enter Your Name</p>
              <input 
                type='text' 
                placeholder='Enter Your Name' 
                name='name' 
                value={data.name} 
                onChange={Onchange_handler}
              />
            </div>

            <div className='email'>
              <p>Enter Your Email</p>
              <input 
                type='email' 
                placeholder='Enter Your Email' 
                name='email' 
                value={data.email} 
                onChange={Onchange_handler}
              />
            </div>

            <div>
              <p>Enter Your Password</p>
              <input 
                type='password' 
                placeholder='Enter Your Password' 
                name='password' 
                value={data.password} 
                onChange={Onchange_handler}
              />
            </div>

            
            <div className='btn'>
              <button disabled={isDisabled}>
                <Link 
                  to={isDisabled ? "#" : "/home_page"} 
                  style={{textDecoration:"none", color:"black"}}
                >
                  Submit
                </Link>
              </button>
            </div>

          </div>
        </div>
      </form>
    </div>
  )
}

export default Input_data
