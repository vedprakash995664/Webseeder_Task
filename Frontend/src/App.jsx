import React from "react"
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Signup from "./Component/Signup";
import Dashboard from "./Component/Dashboard";
import Login from "./Component/Login";
function App() {

  return (
    <>
        <Router>
          <Routes>
            <Route path="/" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
          </Routes>
        </Router>
    </>
  )
}

export default App
