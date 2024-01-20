import React from 'react'
import Navbar from '../components/Navbar'
import TableListWrapper from '../components/TableListWrapper';

function Authors() {
  const apiUrl = 'http://localhost:3000/api/v1/authors';
  
  return (
    <>
      <Navbar></Navbar>
      <div className="main">
        <div className="container">
          <TableListWrapper apiUrl={apiUrl} page="author"></TableListWrapper>
        </div>
      </div>
    </>
  )
}

export default Authors