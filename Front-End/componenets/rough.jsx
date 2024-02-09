// Table.jsx

// import React, { useEffect, useState } from "react";
// import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
// import axios from "axios";
// import "./Table.css";

// export const Table = ({ rows, deleteRow, editRow }) => {
//   const [users, setUsers] = useState([]);

//   const takeUsers = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/demo');
//       setUsers(response.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   useEffect(() => {
//     takeUsers();
//   }, []);

//   const renderRows = (data, indexOffset) => {
//     return data.map((row, idx) => (
//       <tr key={idx + indexOffset}>
//         <td>{row.name}</td>
//         <td>{row.email}</td>
//         <td>{row.number}</td>
//         <td><span className="expand">{row.message}</span></td>
//         <td>
//           <span className="actions">
//             <BsFillTrashFill className="delete-btn" onClick={() => deleteRow(idx + indexOffset)} />
//             <BsFillPencilFill onClick={() => editRow(idx + indexOffset)} />
//           </span>
//         </td>
//       </tr>
//     ));
//   };

//   return (
//     <div className="table-wrapper">
//       <table className="table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Number</th>
//             <th className="expand">Message</th>
//             <th>Manage</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rows && renderRows(rows, 0)}
//           {users && renderRows(users, rows.length)}
//         </tbody>
//       </table>
//     </div>
//   );
// };