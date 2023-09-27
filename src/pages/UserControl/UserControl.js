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
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Modal, Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from '../plugins/axios'
import { useEffect } from 'react';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function UserControl(props) {

    const token = useSelector(state => state.auth.token)

    // for storing in the info
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

    // for display on table
    const [users, setUsers] = useState([]);

    useEffect(() => {

        axios.get("accounts/users/", {
            headers: {
                Authorization: `token ${token}`
            }
        }).then(response => {
            setUsers(response.data)
        }).catch(error => {
            console.log(error.data)
        })

      }, [token]); 


    const handleAddUser = () => {

        axios.post("accounts/users/", user, {
            headers: {
                Authorization: `token ${token}`
            }
        }).then((response) => {
            console.log(response.data)

            setUser({
                email: '',
                role: '',
                position: '',
                first_name: '',
                middle_name: '',
                last_name: '',
                username: '',
                password: '',
            })
        }).catch((error) => {
            console.log(error)
            console.log(user)   
        })
    }

    const [modal, setModal] = useState(false)
    // create modal

    const handleOpenModal = () => {
        setModal(true)
    }

    const handleCloseModal = () => {
        setModal(false)
    }

    // edit modal
    const [editModal, setEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const handleEditUser = (user) => {
        setSelectedUser(user);
        setEditModal(true);
     };
     const handleUpdateUser = () => {
        axios.patch(`accounts/users/${selectedUser.id}/`, selectedUser, {
           headers: {
              Authorization: `token ${token}`
           }
        })
           .then((response) => {
              // Handle success
              console.log(response.data);
              // Close the edit modal
              setEditModal(false);
           })
           .catch((error) => {
              // Handle error
              console.log(error);
           });
     };
     const handleCloseEditModal = () => {
        setEditModal(false);
     };
          

    return(
        <div className='container'>
            <Navbar />

            <div className='create-user'>
                <Button onClick={handleOpenModal}>Open modal</Button>
            <Modal
                open={modal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <TextField 
                    placeholder='First Name'
                    value={user.first_name}
                    onChange={(e) => {
                        setUser({
                            ...user, first_name: e.target.value
                        })
                    }}
                    />
                    <TextField 
                    placeholder='Middle Name'
                    value={user.middle_name}
                    onChange={(e) => {
                        setUser({
                            ...user, middle_name: e.target.value
                        })
                    }}                    
                    />
                    <TextField 
                    placeholder='Last Name'
                    value={user.last_name}
                    onChange={(e) => {
                        setUser({
                            ...user, last_name: e.target.value
                        })
                    }}                    
                    />
                    <TextField 
                    placeholder='Username'
                    value={user.username}
                    onChange={(e) => {
                        setUser({
                            ...user, username: e.target.value
                        })
                    }}
                    />
                    <TextField 
                    placeholder='Password'
                    value={user.password}
                    onChange={(e) => {
                        setUser({
                            ...user, password: e.target.value
                        })
                    }}
                    />
                    <TextField placeholder='Email'
                    value={user.email}
                    onChange={(e) => {
                        setUser({
                            ...user, email: e.target.value
                        })
                    }}                    
                    />
                    {/* selection/choices method */}
                    <TextField placeholder='Role'
                    value={user.role}
                    onChange={(e) => {
                        setUser({
                            ...user, role: e.target.value
                        })
                    }}                    
                    />
                    {/* selection/choices method */}                    
                    <TextField placeholder='Position'
                    value={user.position}
                    onChange={(e) => {
                        setUser({
                            ...user, position: e.target.value
                        })
                    }}                    
                    />
                    <br />
                    <Button onClick={handleAddUser}>Register</Button>

                </Box>
            </Modal>
            </div>

            <div className='table-user'>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>User Name</TableCell>
                                <TableCell>First Name</TableCell>
                                <TableCell>Middle Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Position</TableCell>
                                <TableCell>Status</TableCell>

                                <TableCell>Action</TableCell>

                            </TableRow>
                        </TableHead>
                     <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.first_name}</TableCell>
                  <TableCell>{user.middle_name}</TableCell>
                  <TableCell>{user.last_name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.position}</TableCell>
                  <TableCell>{user.is_active ? 'Active' : 'Inactive'}</TableCell>
                  <TableCell>
                    <Button
                        title='Edit'
                        style={{ background: 'yellow', cursor: 'pointer' }}
                        onClick={() => handleEditUser(user)}
                    >
                        Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}                        
                    </TableBody>
                    </Table>
                </TableContainer>
                    <Modal
                        open={editModal}
                        onClose={handleCloseEditModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                    <Box sx={style}>
                    <TextField placeholder='Email'
                    value={selectedUser.email}
                    onChange={(e) => {
                        setSelectedUser({
                            ...selectedUser, email: e.target.value
                        })
                    }}                    
                    />
                    {/* selection/choices method */}
                    <TextField placeholder='Role'
                    value={selectedUser.role}
                    onChange={(e) => {
                        setSelectedUser({
                            ...selectedUser, role: e.target.value
                        })
                    }}                    
                    />
                    {/* selection/choices method */}                    
                    <TextField placeholder='Position'
                    value={selectedUser.position}
                    onChange={(e) => {
                        setSelectedUser({
                            ...selectedUser, position: e.target.value
                        })
                    }}                    
                    />
                    <TextField placeholder='Is Active'
                    value={selectedUser.is_active}
                    onChange={(e) => {
                        setSelectedUser({
                            ...selectedUser, is_active: e.target.value
                        })
                    }}                    
                    />                                        
                    <br />
                    <Button onClick={handleUpdateUser}>Edit User</Button>
                    </Box>
                    </Modal>
                
            </div>

        </div>
    )
}

export default UserControl;