import React from 'react';
import Navbar from '../../Navbar';
import { Add, AddBoxOutlined, CloseOutlined, DeleteOutline } from '@mui/icons-material';
import { Edit } from '@mui/icons-material';
import InputSearch from '../../components/InputSearch';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import './styles.css'
import { useState } from 'react';
import users from './users.json'
import InputS from './../../components/InputS'
import ConstButton from '../../components/ConstButton';

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


    return (
        <div className='container1'>
            <Navbar />
            {proceed ? (
                <div className='' style={{}}>
                    <div style={{height: "77vh", width: "70%", backgroundColor:"white", position:"absolute", zIndex: 1, borderRadius: 20, marginTop: 40, marginLeft: "15%", padding: 30, flexDirection:"column"}}>
                        <div style={{flexDirection:"row", flex: 1, alignItems: "center", justifyContent: "space-between" }}>
                            <Button style={{position:"absolute", right: 0, marginRight: 40}} onClick={() => setProceed(!proceed)}>
                                <CloseOutlined style={{}}></CloseOutlined>
                            </Button>
                            <h1>User Information</h1>
                        </div>
                        
                        <div style={{height:"80%", marginTop: 90}}>
                            <div style={{width: "100%", flexDirection:"column", display:"flex", alignItems:"center"}}>
                                <div style={{display:"flex"}}>
                                    <InputS label="Username"></InputS>
                                </div>
                                <div style={{marginTop: 40, display:"flex"}}>
                                    <InputS type={"password"} label="Password"></InputS>
                                </div>
                                <div style={{marginTop: 40, display:"flex"}}>
                                    <InputS  type={"password"} label="Confirm Password"></InputS>
                                </div>
                            </div>
                        </div>
                        <div style={{display:"flex", alignItems:"center", justifyContent:"center", marginTop: -200}}>
                            <div style={{width: "20%"}}>
                                <ConstButton onClick={() => setProceed(!proceed)} height={50} title={"CREATE USER"}></ConstButton>
                            </div>
                        </div>
                        
                    </div>
                    <div style={{backgroundColor:"black", height:"100vh", width: "900vh", marginTop: -10, marginLeft: -30, opacity: 0.5}}></div>
                </div>
            ) : null}
            {addScreen ? (
                <div className='' style={{}}>
                    <div style={{height: "77vh", width: "70%", backgroundColor:"white", position:"absolute", zIndex: 1, borderRadius: 20, marginTop: 40, marginLeft: "15%", padding: 30, flexDirection:"column"}}>
                        <div style={{flexDirection:"row", flex: 1, alignItems: "center", justifyContent: "space-between" }}>
                            <Button style={{position:"absolute", right: 0, marginRight: 40}} onClick={() => setAddScreen(!addScreen)}>
                                <CloseOutlined style={{}}></CloseOutlined>
                            </Button>
                            <h1>User Information</h1>
                        </div>
                        
                        <div style={{height:"80%", marginTop: 90}}>
                            <div style={{width: "100%", flexDirection:"row", display:"flex"}}>
                                <div style={{marginRight: 40, marginLeft: 40}}>
                                    <InputS label="First Name"></InputS>
                                </div>
                                <div style={{marginRight: 40, marginLeft: 40}}>
                                    <InputS label="Last Name"></InputS>
                                </div>
                                <div style={{marginRight: 40, marginLeft: 40}}>
                                    <InputS label="Gender"></InputS>
                                </div>
                            </div>
                            <div style={{width: "100%", flexDirection:"row", display:"flex", marginTop: 40}}>
                                <div style={{marginRight: 40, marginLeft: 40}}>
                                    <InputS label="Position"></InputS>
                                </div>
                                <div style={{marginRight: 40, marginLeft: 40}}>
                                    <InputS label="Email"></InputS>
                                </div>
                                <div style={{marginRight: 40, marginLeft: 40}}>
                                    <InputS label="User Role"></InputS>
                                </div>
                            </div>
                        </div>
                        <div style={{display:"flex", alignItems:"center", justifyContent:"center", marginTop: -200}}>
                            <div style={{width: "20%"}}>
                                <ConstButton onClick={() => setProceed(!proceed) & setAddScreen(!addScreen)} height={50} title={"PROCEED"}></ConstButton>
                            </div>
                        </div>
                        
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
                            width="25.3rem"
                        />
                        
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
                                            <TableCell style={{ flex: 1, color:"white"}} className='row'>{user.role}</TableCell>
                                            <TableCell style={{ flex: 1, color:"white"}} className='row'>{user.username}</TableCell>
                                            <TableCell className='row' style={{ flexDirection: "row", justifyContent: "space-between", color:"white"}}>
                                                <Button variant="contained" style={{ backgroundColor: "transparent", boxShadow: "none", color: "white", marginLeft: 40 }}><Edit style={{ height: 25 }} /></Button>
                                                <Button variant="contained" style={{ backgroundColor: "transparent", boxShadow: "none", color: "white"}}><DeleteOutline style={{ height: 25 }} /></Button>
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