import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Create from './components/Create'
import GetAllData from './components/GetAllData'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Create />} />
          <Route path="/GetData" element={<GetAllData />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
