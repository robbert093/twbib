import React from 'react'

function Modal({ show, title, children, handleClose }) {

  return (
    <>
    <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button onClick={handleClose} type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>          
          {children}
        </div>
      </div>
    </div>
    <div onClick={handleClose} className={`modal-backdrop fade ${show ? 'd-block show' : 'd-none'}`}></div>
    </>
  )
}

export default Modal