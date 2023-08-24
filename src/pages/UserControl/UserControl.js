import React from 'react';
import Navbar from '../../Navbar';
import { Add, AddBoxOutlined, ArrowBack, CloseOutlined, DeleteOutline, Edit, Save, Close, Check } from '@mui/icons-material';
import InputSearch from '../../components/InputSearch';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import './styles.css'
import { useState } from 'react';
import users from './users.json'
import UserOne from '../../components/UserOne';
import UserCredentials from '../../components/UserCredentials';

function UserControl(props) {
    const [filteredData, setFilteredData] = useState(users);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = users.filter(item =>
            item.firstName.toLowerCase().includes(query.toLowerCase()) ||
            item.lastName.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const [addScreen, setAddScreen] = useState(false);
    const [proceed, setProceed] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const handleBack = () => {
        setAddScreen(!addScreen);
        setProceed(!proceed);
    }
    const [editingRow, setEditingRow] = useState(null);
    const [deletingRow, setDeletingRow] = useState(null);

    const handleEdit = (rowId) => {
        setEditingRow(rowId);
    };

    const handleDelete = (rowId) => {
        setDeletingRow(rowId);
    };

    const handleSave = () => {
        // Logic to save changes here
        setEditingRow(null);
    };

    const handleCheck = () => {
        // Logic to confirm deletion here
        setDeletingRow(null);
    };

    const handleCancelEdit = () => {
        setEditingRow(null);
    };

    const handleCancelDelete = () => {
        setDeletingRow(null);
    };



    return (
        <div className='container1'>
            <Navbar />
            {proceed ? (
                <div>
                    <div style={{height: "77vh", width: "70%", backgroundColor:"white", position:"absolute", zIndex: 1, borderRadius: 20, marginTop: 40, marginLeft: "15%", padding: 30, flexDirection:"column"}}>
                        <UserCredentials close={() => setProceed(!proceed)} create={() => setProceed(!proceed)} back={handleBack}></UserCredentials>
                    </div>
                    <div style={{backgroundColor:"black", height:"100vh", width: "900vh", marginTop: -10, marginLeft: -30, opacity: 0.5}}></div>
                </div>
            ) : null}
            {addScreen ? (
                <div>
                    <div style={{height: "77vh", width: "70%", backgroundColor:"white", position:"absolute", zIndex: 1, borderRadius: 20, marginTop: 40, marginLeft: "15%", padding: 30, flexDirection:"column"}}>
                       <UserOne close={() => setAddScreen(!addScreen)} proceed={() => setProceed(!proceed) & setAddScreen(!addScreen)} height={50} title={"PROCEED"}></UserOne>
                    </div>
                    <div style={{backgroundColor:"black", height:"100vh", width: "900vh", marginTop: -10, marginLeft: -30, opacity: 0.5}}></div>
                </div>
            ) : null}
            {isVisible ? (
                <>
                    <div className='searchbar' style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "10%" }}>
                        <Button onClick={ () => setAddScreen(!addScreen)} style={{ backgroundColor: "white" }}>
                            CREATE USER
                            <AddBoxOutlined style={{ marginLeft: 10 }} />
                        </Button>
                        <InputSearch
                            className="inputSearch"
                            label="Search"
                            value={searchQuery}
                            onChange={(event) => handleSearch(event.target.value)}
                            width="25.3rem" />
                    </div>
                    <div className='container2'>
                        <TableContainer>
                            <Table style={{ borderCollapse: "collapse", width: "100%" }}>
                                <TableHead>
                                    <TableRow style={{  border: "1px solid white", display: "flex", justifyContent: "space-between"  }}>
                                        <TableCell style={{ flex: 1, color:"white" }}>ID</TableCell>
                                        <TableCell style={{ flex: 1, color:"white" }}>First name</TableCell>
                                        <TableCell style={{ flex: 1, color:"white" }}>Last name</TableCell>
                                        <TableCell style={{ flex: 1, color:"white" }}>Gender</TableCell>
                                        <TableCell style={{ flex: 1, color:"white" }}>Position</TableCell>
                                        <TableCell style={{ flex: 1, color:"white" }}>Email</TableCell>
                                        <TableCell style={{ flex: 1, color:"white" }}>Contact No.</TableCell>
                                        <TableCell style={{ flex: 1, color:"white" }}>Role</TableCell>
                                        <TableCell style={{ flex: 1, color:"white" }}>Username</TableCell>
                                        <TableCell style={{ flex: 1, color:"white", textAlign:"center" }}>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredData.map(user => (
                                        <TableRow key={user.id} style={{ display: "flex", borderLeft: "1px solid white", borderRight: "1px solid white", justifyContent: "space-between" }}>
                                            <TableCell style={{ flex: 1, color:"white"}} className='row'>{user.id}</TableCell>
                                            <TableCell style={{ flex: 1, color:"white"}} className='row'>{user.firstName}</TableCell>
                                            <TableCell style={{ flex: 1, color:"white"}} className='row'>{user.lastName}</TableCell>
                                            <TableCell style={{ flex: 1, color:"white"}} className='row'>{user.gender}</TableCell>
                                            <TableCell style={{ flex: 1, color:"white"}} className='row'>{user.position}</TableCell>
                                            <TableCell style={{ flex: 1, color:"white"}} className='row'>{user.email}</TableCell>
                                            <TableCell style={{ flex: 1, color:"white"}} className='row'>{user.contact_no}</TableCell>
                                            <TableCell style={{ flex: 1, color:"white"}} className='row'>{user.role}</TableCell>
                                            <TableCell style={{ flex: 1, color:"white"}} className='row'>{user.username}</TableCell>
                                            <TableCell className='row' style={{ flexDirection: 'row', justifyContent: 'space-between', color: 'white' }}>
                                            {editingRow === user.id ? (
                                                <>
                                                <Button
                                                    variant="contained"
                                                    style={{ backgroundColor: 'transparent', boxShadow: 'none', color: 'white', marginLeft: 20 }}
                                                    onClick={() => handleSave(user.id)}
                                                >
                                                    <Check style={{ height: 25 }} />
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    style={{ backgroundColor: 'transparent', boxShadow: 'none', color: 'white' }}
                                                    onClick={handleCancelEdit}
                                                >
                                                    <Close style={{ height: 25 }} />
                                                </Button>
                                                </>
                                            ) : deletingRow === user.id ? (
                                                <>
                                                <Button
                                                    variant="contained"
                                                    style={{ backgroundColor: 'transparent', boxShadow: 'none', color: 'white', marginLeft: 20 }}
                                                    onClick={() => handleCheck(user.id)}
                                                >
                                                    <Check style={{ height: 25 }} />
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    style={{ backgroundColor: 'transparent', boxShadow: 'none', color: 'white' }}
                                                    onClick={handleCancelDelete}
                                                >
                                                    <Close style={{ height: 25 }} />
                                                </Button>
                                                </>
                                            ) : (
                                                <>
                                                <Button
                                                    variant="contained"
                                                    style={{ backgroundColor: 'transparent', boxShadow: 'none', color: 'white', marginLeft: 20 }}
                                                    onClick={() => handleEdit(user.id)}
                                                >
                                                    <Edit style={{ height: 25 }} />
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    style={{ backgroundColor: 'transparent', boxShadow: 'none', color: 'white' }}
                                                    onClick={() => handleDelete(user.id)}
                                                >
                                                    <DeleteOutline style={{ height: 25 }} />
                                                </Button>
                                                </>
                                            )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </>
            ) : null}
            
        </div>
    );
}

export default UserControl;