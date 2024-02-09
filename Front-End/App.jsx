import { useState } from 'react';
import './App.css';
import { Modal } from './componenets/Modal';
import { Table } from './componenets/table';

function App() {
  const [modalOpen, setModalOpen] = useState(false)

  const [rows, setRows] = useState([
    { name: "Default", email: "Default@gmail.com", number: 1, message: "Hi Default hello Default ok Default" },
    
  ]);

  const [rowToEdit, setRowToEdit] = useState(null);


  const handleDeleteRow = (targetIndex) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex))
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null ?
      setRows([...rows, newRow]) :
      setRows(rows.map((currRow, idx) => {
        if (idx !== rowToEdit) return currRow;

        return newRow;
      }))
  };

  return <div className="App">
    <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
    <button className='btn' onClick={() => setModalOpen(true)}>
      Add
    </button>
{/* <p>{JSON.stringify(rows)}</p> */}

    {modalOpen &&
      <Modal
        closeModal={() => {
          setModalOpen(false);
          setRowToEdit(null);
        }}
        onSubmit={handleSubmit}
        defaultValue={rowToEdit !== null && rows[rowToEdit]}
      />}
  </div>
}
export default App