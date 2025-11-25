import React from 'react'
import Signin_page from './Netflix_Project/Signin_page'
import Input_data from './Netflix_Project/Input_data'
import Home_page from './Netflix_Project/Home_page'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"

const App = () => {
  return (

    <>
      <Router>
        <Routes>
          <Route path='/' element={<Signin_page />} />
          <Route path='/input_data' element={<Input_data />}/>
          <Route path='/home_page' element={<Home_page />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
