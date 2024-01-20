import React from 'react'
import Navbar from '../components/Navbar'
import TableListWrapper from '../components/TableListWrapper';

function Categories() {
  const apiUrl = 'http://localhost:3000/api/v1/categories';
  
  return (
    <>
      <Navbar></Navbar>
      <div className="main">
        <div className="container">
          <TableListWrapper apiUrl={apiUrl} page="category"></TableListWrapper>
        </div>
      </div>
    </>
  )
}

export default Categories