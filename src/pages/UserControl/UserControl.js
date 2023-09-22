// import React from 'react';
// import Navbar from '../../Navbar';
// import { Add, AddBoxOutlined, ArrowBack, CloseOutlined, DeleteOutline, Edit, Save, Close, Check } from '@mui/icons-material';
// import InputSearch from '../../components/InputSearch';
// import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
// import './styles.css'
// import { useState } from 'react';
// import users from './users.json'
// import UserOne from '../../components/UserOne';
// import UserCredentials from '../../components/UserCredentials';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

// function UserControl(props) {
//     const [filteredData, setFilteredData] = useState(users);
//     const [searchQuery, setSearchQuery] = useState('');

//     const handleSearch = (query) => {
//         setSearchQuery(query);
//         const filtered = users.filter((item) =>
//           item.firstName.toLowerCase().includes(query.toLowerCase()) ||
//           item.lastName.toLowerCase().includes(query.toLowerCase()) ||
//           item.id.toString().includes(query)
//         );
//         setFilteredData(filtered);
//         setCurrentPage(1); // Reset to first page when searching
//       };
      
//     const [addScreen, setAddScreen] = useState(false);
//     const [proceed, setProceed] = useState(false);
//     const [isVisible, setIsVisible] = useState(true);

//     const handleBack = () => {
//         setAddScreen(!addScreen);
//         setProceed(!proceed);
//     }
//     const [editingRow, setEditingRow] = useState(null);
//     const [deletingRow, setDeletingRow] = useState(null);

//     const handleEdit = (rowId) => {
//         setEditingRow(rowId);
//     };

//     const handleDelete = (rowId) => {
//         setDeletingRow(rowId);
//     };

//     const handleSave = () => {
//         // Logic to save changes here
//         setEditingRow(null);
//     };

//     const handleCheck = () => {
//         // Logic to confirm deletion here
//         setDeletingRow(null);
//     };

//     const handleCancelEdit = () => {
//         setEditingRow(null);
//     };

//     const handleCancelDelete = () => {
//         setDeletingRow(null);
//     };


//     const [currentPage, setCurrentPage] = useState(1);

//     const rowsPerPage = 7;

//     const lastRowIndex = currentPage * rowsPerPage;
//     const firstRowIndex = lastRowIndex - rowsPerPage;
//     const currentRows = filteredData.slice(firstRowIndex, lastRowIndex);
//     const totalPages = Math.ceil(filteredData.length / rowsPerPage);

//     const handlePageChange = (page) => {
//         setCurrentPage(page);
//     };

//     const offenseCountMap = {};
//     filteredData.forEach(item => {
//         if (offenseCountMap[item.name]) {
//             offenseCountMap[item.name]++;
//         } else {
//             offenseCountMap[item.name] = 1;
//         }
//     });






//     return (
//         <div className='container1'>
//             <Navbar />
//             {proceed ? (
//                 <div>
//                     <div style={{height: "77vh", width: "70%", backgroundColor:"white", position:"absolute", zIndex: 1, borderRadius: 20, marginTop: 40, marginLeft: "15%", padding: 30, flexDirection:"column"}}>
//                         <UserCredentials close={() => setProceed(!proceed)} create={() => setProceed(!proceed)} back={handleBack}></UserCredentials>
//                     </div>
//                     <div style={{backgroundColor:"black", height:"100vh", width: "900vh", marginTop: -10, marginLeft: -30, opacity: 0.5}}></div>
//                 </div>
//             ) : null}
//             {addScreen ? (
//                 <div>
//                     <div style={{height: "77vh", width: "70%", backgroundColor:"white", position:"absolute", zIndex: 1, borderRadius: 20, marginTop: 40, marginLeft: "15%", padding: 30, flexDirection:"column"}}>
//                        <UserOne close={() => setAddScreen(!addScreen)} proceed={() => setProceed(!proceed) & setAddScreen(!addScreen)} height={50} title={"PROCEED"}></UserOne>
//                     </div>
//                     <div style={{backgroundColor:"black", height:"100vh", width: "900vh", marginTop: -10, marginLeft: -30, opacity: 0.5}}></div>
//                 </div>
//             ) : null}
//             {isVisible ? (
//                 <>
//                     <div className='searchbar' style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "10%" }}>
//                         <Button onClick={ () => setAddScreen(!addScreen)} style={{ backgroundColor: "white" }}>
//                             CREATE USER
//                             <AddBoxOutlined style={{ marginLeft: 10 }} />
//                         </Button>
//                         <InputSearch
//                             className="inputSearch"
//                             label="Search"
//                             value={searchQuery}
//                             onChange={(event) => handleSearch(event.target.value)}
//                             width="25.3rem" />
//                     </div>
//                     <div className='container2'>
//                         <TableContainer>
//                             <Table style={{ borderCollapse: "collapse", width: "100%" }}>
//                                 <TableHead>
//                                     <TableRow style={{  border: "1px solid white", display: "flex", justifyContent: "space-between"  }}>
//                                         <TableCell style={{ flex: 1, color:"white" }}>ID</TableCell>
//                                         <TableCell style={{ flex: 1, color:"white" }}>First name</TableCell>
//                                         <TableCell style={{ flex: 1, color:"white" }}>Last name</TableCell>
//                                         <TableCell style={{ flex: 1, color:"white" }}>Gender</TableCell>
//                                         <TableCell style={{ flex: 1, color:"white" }}>Position</TableCell>
//                                         <TableCell style={{ flex: 1, color:"white" }}>Email</TableCell>
//                                         <TableCell style={{ flex: 1, color:"white" }}>Contact No.</TableCell>
//                                         <TableCell style={{ flex: 1, color:"white" }}>Role</TableCell>
//                                         <TableCell style={{ flex: 1, color:"white" }}>Username</TableCell>
//                                         <TableCell style={{ flex: 1, color:"white", textAlign:"center" }}>Action</TableCell>
//                                     </TableRow>
//                                 </TableHead>
//                                 <TableBody>
//                                     {currentRows.map(user => (
//                                         <TableRow key={user.id} style={{ display: "flex", borderLeft: "1px solid white", borderRight: "1px solid white", justifyContent: "space-between" }}>
//                                             <TableCell style={{ flex: 1, color:"white"}} className='row'>{user.id}</TableCell>
//                                             <TableCell style={{ flex: 1, color:"white"}} className='row'>{user.firstName}</TableCell>
//                                             <TableCell style={{ flex: 1, color:"white"}} className='row'>{user.lastName}</TableCell>
//                                             <TableCell style={{ flex: 1, color:"white"}} className='row'>{user.gender}</TableCell>
//                                             <TableCell style={{ flex: 1, color:"white"}} className='row'>{user.position}</TableCell>
//                                             <TableCell style={{ flex: 1, color:"white"}} className='row'>{user.email}</TableCell>
//                                             <TableCell style={{ flex: 1, color:"white"}} className='row'>{user.contact_no}</TableCell>
//                                             <TableCell style={{ flex: 1, color:"white"}} className='row'>{user.role}</TableCell>
//                                             <TableCell style={{ flex: 1, color:"white"}} className='row'>{user.username}</TableCell>
//                                             <TableCell className='row' style={{ flexDirection: 'row', justifyContent: 'space-between', color: 'white' }}>
//                                             {editingRow === user.id ? (
//                                                 <>
//                                                 <Button
//                                                     variant="contained"
//                                                     style={{ backgroundColor: 'transparent', boxShadow: 'none', color: 'white', marginLeft: 10 }}
//                                                     onClick={() => handleSave(user.id)}
//                                                 >
//                                                     <Check style={{ height: 25 }} />
//                                                 </Button>
//                                                 <Button
//                                                     variant="contained"
//                                                     style={{ backgroundColor: 'transparent', boxShadow: 'none', color: 'white' }}
//                                                     onClick={handleCancelEdit}
//                                                 >
//                                                     <Close style={{ height: 25 }} />
//                                                 </Button>
//                                                 </>
//                                             ) : deletingRow === user.id ? (
//                                                 <>
//                                                 <Button
//                                                     variant="contained"
//                                                     style={{ backgroundColor: 'transparent', boxShadow: 'none', color: 'white', marginLeft: 10 }}
//                                                     onClick={() => handleCheck(user.id)}
//                                                 >
//                                                     <Check style={{ height: 25 }} />
//                                                 </Button>
//                                                 <Button
//                                                     variant="contained"
//                                                     style={{ backgroundColor: 'transparent', boxShadow: 'none', color: 'white' }}
//                                                     onClick={handleCancelDelete}
//                                                 >
//                                                     <Close style={{ height: 25 }} />
//                                                 </Button>
//                                                 </>
//                                             ) : (
//                                                 <>
//                                                 <Button
//                                                     variant="contained"
//                                                     style={{ backgroundColor: 'transparent', boxShadow: 'none', color: 'white', marginLeft: 10 }}
//                                                     onClick={() => handleEdit(user.id)}
//                                                 >
//                                                     <Edit style={{ height: 25 }} />
//                                                 </Button>
//                                                 <Button
//                                                     variant="contained"
//                                                     style={{ backgroundColor: 'transparent', boxShadow: 'none', color: 'white' }}
//                                                     onClick={() => handleDelete(user.id)}
//                                                 >
//                                                     <DeleteOutline style={{ height: 25 }} />
//                                                 </Button>
//                                                 </>
//                                             )}
//                                             </TableCell>
//                                         </TableRow>
//                                     ))}
//                                 </TableBody>
//                             </Table>
//                         </TableContainer>
//                     </div>
//                     <div className="pagination" style={{justifyContent:"center", width:"100%", flex: 1, alignItems:"center", marginBottom: 50}}>
//                         <button
//                             style={{ backgroundColor: "transparent", border: 0 }}
//                             disabled={currentPage === 1}
//                             onClick={() => handlePageChange(1)}
//                         >
//                             <ArrowBackIosIcon />
//                         </button>
//                         {Array.from({ length: totalPages }, (_, index) => {
//                             if (totalPages <= 4 || (index + 1 === 1 || index + 1 === totalPages || Math.abs(currentPage - (index + 1)) <= 1)) {
//                                 return (
//                                     <button
//                                         style={{
//                                             border: 0,
//                                             backgroundColor: "transparent",
//                                             fontSize: 20,
//                                         }}
//                                         key={index}
//                                         onClick={() => handlePageChange(index + 1)}
//                                         className={currentPage === index + 1 ? 'activePage' : ''}
//                                     >
//                                         {index + 1}
//                                     </button>
//                                 );
//                             } else if (Math.abs(currentPage - (index + 1)) === 2) {
//                                 return (
//                                     <span key={index}>...</span>
//                                 );
//                             }
//                             return null;
//                         })}
//                         <button
//                             style={{ backgroundColor: "transparent", border: 0 }}
//                             disabled={currentPage === totalPages}
//                             onClick={() => handlePageChange(totalPages)} // Go to the last page
//                         >
//                             <ArrowForwardIosIcon />
//                         </button>
//                     </div>
//                 </>
//             ) : null}
            
//         </div>
//     );
// }

// export default UserControl;



import React, { useState, } from 'react';
import Navbar from '../../Navbar';
import './styles.css';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from '../plugins/axios'
import { useEffect } from 'react';

function UserControl(props) {

    const token = useSelector(state => state.auth.token)

    const [user, setUser] = useState({
        email: '',
        role: '',
        position: '',
        first_name: '',
        middle_name: '',
        last_name: '',
        username: '',
        password: '',
    })


    const [users, setUsers] = useState([]);

    useEffect(() => {

        axios.get("accounts/users", {
            headers: {
                Authorization: `token ${token}`
            }
        }).then(response => {
            console.log(response.data)
        }).catch(error => {
            console.log(error.data)
        })

      }, [token]); 

    return(
        <div className='container'>
            <Navbar />

            <div className='create-user'>
                <h1>Create User</h1>
                <input placeholder='Email' />
                {/* selection */}
                <input placeholder='role' />
                <input placeholder='position' />
                {/* inputs */}
                <input placeholder='first_name' />
                <input placeholder='middle_name' />
                <input placeholder='last_name' />
                <input placeholder='username' />
                <input placeholder='password' />
                <button>Add User</button>
            </div>

            <div className='table-user'>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">User Name</TableCell>
                                <TableCell align="right">First Name</TableCell>
                                <TableCell align="right">Middle Name</TableCell>
                                <TableCell align="right">Last Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell align="right">Role</TableCell>
                                <TableCell align="right">Position</TableCell>
                                <TableCell align="right">Action</TableCell>

                            </TableRow>
                        </TableHead>
                     <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell align='right'>{user.username}</TableCell>
                  <TableCell align='right'>{user.first_name}</TableCell>
                  <TableCell align='right'>{user.middle_name}</TableCell>
                  <TableCell align='right'>{user.last_name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell align='right'>{user.role}</TableCell>
                  <TableCell align='right'>{user.position}</TableCell>
                  <TableCell align='right'>
                    {/* Action buttons for each user */}
                  </TableCell>
                </TableRow>
              ))}                        
                    </TableBody>
                    </Table>
                </TableContainer>
            </div>

        </div>
    )
}

export default UserControl;