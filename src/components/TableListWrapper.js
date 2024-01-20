import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import TableList from '../components/TableList'
import axios from 'axios';

function TableListWrapper({apiUrl, page}) {
  const [name, setName] = useState('');
  const [item, setItem] = useState({}); 
  const [itemsList, setItemsList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filteredItems, setFilteredItems] = useState(itemsList);

  const handleSearch = (value) => {
    const filteredItems = itemsList.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredItems(filteredItems);
  }
  
  const toggleModal = () => {
    if (name) setName('');
    if (item) setItem({});
    setShowModal(!showModal);
  }

  const getItems = () => {
    axios.get(apiUrl).then((response) => {
      setItemsList(response.data);
      setFilteredItems(response.data);
    })
  }
  useEffect(() => {
    getItems();
  }, []);


  const handleSave = () => {
    if (item.id) {
      axios.put(`${apiUrl}/${item.id}`, {'name':name}).then((response) => {
        if (response.status === 200) {
          item.name = name;
          setItem(item);
        }        
      }).catch((error) => {
        console.log(error);
      })
    } else {
      axios.post(apiUrl, {name}).then((response) => {
        if (response.status === 201) {
          getItems();
        }
      }).catch((error) => {
        console.log(error);
      })
    }    
    setName('');
    toggleModal();
  }

  const deleteItem = (item) => { 
    axios.delete(`${apiUrl}/${item.id}`).then((response) => {
      if (response.status === 200) {
        setFilteredItems(itemsList.filter((i) => i.id !== item.id));
      }
    })
  }

  let modalTitle = '';
  if (page === 'category') {
    modalTitle = item.id ? 'Edit Category' : 'Add Category';
  } else {
    modalTitle = item.id ? 'Edit Author' : 'Add Author';
  }

  const props = {
    'modalTitle': modalTitle,
    'showModal': showModal,
    'setShowModal': setShowModal,
    'toggleModal': toggleModal,
    'items': filteredItems,
    'name': name,
    'setName': setName,
    'item': item,
    'setItem': setItem,
    'handleSave': handleSave,
    'deleteItem': deleteItem,
  } 

  return (
    <>
      <div className="py-3">
        <Header openModal={toggleModal} onSearch={handleSearch}></Header>
      </div>
      <div className="categories-list">
        <TableList props={props}/>
      </div>
    </>
  )
}

export default TableListWrapper