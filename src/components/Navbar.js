import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';


function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuClassName = (path) => { 
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  }
  
  return (
    <div>
      <nav className="navbar-default navbar navbar-expand-lg bg-white">
        <div className="container">
          <span className="navbar-brand" href="/" onClick={() => navigate('/')}>
            <img src="../logo_react.svg" alt=""/>
          </span>
          <button aria-controls="navbar-default" type="button" aria-label="Toggle navigation" className="navbar-toggler collapsed">
            <span className="icon-bar top-bar mt-0"></span>
            <span className="icon-bar middle-bar"></span>
            <span className="icon-bar bottom-bar"></span>
          </button>
          <div className="navbar-collapse collapse">
            <div className="ms-auto navbar-nav">
              <div className="nav-item pt-1">
                <span className={menuClassName('/')} 
                  onClick={() => navigate('/')}>Books</span>
              </div>
              <div className="nav-item pt-1">
                <span className={menuClassName('/authors')} 
                  onClick={() => navigate('/authors')}>Authors</span>
              </div>
              <div className="nav-item pt-1">
                <span className={menuClassName('/categories')} 
                  onClick={() => navigate('/categories')}>Categories</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar