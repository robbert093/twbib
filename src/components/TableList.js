import React from 'react'
import Modal from './Modal'

function TableList({props}) {

  const openEditModal = (item) => {
    props.toggleModal();
    props.setItem(item);
    props.setName(item.name);
  }

  return (
    <>
      {props.items.length > 0 &&
        <div className="table-wrapper bg-white border rounded overflow-hidden">
          <table className="table table-striped mb-0">
            <thead>
              <tr>
                <th scope="col" width="25">#</th>
                <th scope="col">Name</th>
                <th scope="col" width="130">Books No.</th>
                <th scope="col" width="140"></th>
              </tr>
            </thead>
            <tbody>
              {
                props.items.map((item, index) => (
                  <tr key={index}>
                    <th className="border-0" scope="row">{index + 1}</th>
                    <td className="border-0 td-name">{item.name}</td>
                    <td className="border-0 td-books text-center">{item.Books.length}</td>
                    <td className="border-0 td-actions px-0">
                      <button className="btn btn-sm text-dark"
                        onClick={() => openEditModal(item)}>Edit</button>
                      <button className="btn btn-sm text-danger ms-3"
                        onClick={() => props.deleteItem(item)}>Delete</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      } 
      {
        props.items.length === 0 &&
        <div className="empty-list text-center py-5 my-5">
          <h2>No items found.</h2>
          <h5>Click on "Add new" button to add a new item.</h5>
        </div>
      }
      <Modal title={props.modalTitle} show={props.showModal} handleClose={props.toggleModal}>
        <>
          <div className="modal-body">
            <div className="form-group mb-3">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" name="name" 
                value={props.name} onChange={e => props.setName(e.target.value)}/>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" 
              onClick={props.toggleModal}>Cancel</button>
            <button type="button" className="btn btn-primary"
              onClick={() => props.handleSave()}>Save</button>
          </div>
        </>
      </Modal>
    </>
  )
}

export default TableList