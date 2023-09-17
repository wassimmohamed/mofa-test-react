import React, { useEffect } from 'react';
import axios from 'axios';
import TopNav from './Components/TopNav';
import Student from './Pages/Student';

function App() {
  return (
    <>
    <TopNav></TopNav>
    <Student></Student>
    </>
  );
}

export default App;
