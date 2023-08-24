import React, { useState, useEffect } from 'react';
import Navbar from '../../Navbar';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import violationsData from './../../JSON/violationsData.json'; // Update the path accordingly
import violationsSample from './../../JSON/sampleViolation.json'; // Update the path accordingly
import InputSearch from './../../components/InputSearch'
import './styles.css'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Driver from '../driver/driver';
import ConstButton from '../../components/ConstButton';
import IconButton from '@mui/material/IconButton';
import { AddBoxOutlined, ArrowBack, BackHandOutlined, Download } from '@mui/icons-material';

function Violation({navigation}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState(violationsData);
    const [filteredDatas, setFilteredDatas] = useState(violationsSample);
    const [currentPage, setCurrentPage] = useState(1);
    const [user, setUser] = useState(false)
    const [table, setTable] = useState(true)
    const rowsPerPage = 10;

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = violationsData.filter(item =>
            item.ticket_no.includes(query) || item.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredData(filtered);
        setCurrentPage(1); // Reset to first page when searching
    };

    const lastRowIndex = currentPage * rowsPerPage;
    const firstRowIndex = lastRowIndex - rowsPerPage;
    const currentRows = filteredData.slice(firstRowIndex, lastRowIndex);
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const offenseCountMap = {};
    filteredData.forEach(item => {
        if (offenseCountMap[item.name]) {
            offenseCountMap[item.name]++;
        } else {
            offenseCountMap[item.name] = 1;
        }
    });

    const formatRemainingTime = (remainingTime) => {
        if (remainingTime <= 0) {
            return '00:00:00';
        }

        const hours = Math.floor(remainingTime / (60 * 60 * 1000));
        const minutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
        const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);

        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    };

    const calculateRemainingTime = (date, status) => {
        if (status === 'CLEARED') {
            return 0; // Stop the countdown
        }

        const currentTime = new Date().getTime();
        const targetTime = new Date(Date.parse(date)).getTime() + 72 * 60 * 60 * 1000; // Adding 72 hours
        let remainingTime = targetTime - currentTime;

        if (remainingTime < 0) {
            remainingTime = -remainingTime;
        }

        return remainingTime;
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setFilteredData((prevData) =>
                prevData.map((item) => ({
                    ...item,
                    remainingTime: calculateRemainingTime(item.date),
                }))
            );
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);
    

    useEffect(() => {
        const interval = setInterval(() => {
            setFilteredData((prevData) =>
                prevData.map((item) => ({
                    ...item,
                    remainingTime: calculateRemainingTime(item.date),
                }))
            );
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const [activeTable, setActiveTable] = useState('personal');

    const handleTableClick = (table) => {
        setActiveTable(table);
    };

    const [activePerson, setActivePerson] = useState(null);



    return (
        <div className='violationContainer' style={{ display: "flex", flexDirection: "column", alignItems: "center",  height: "90vh", width:"100%", marginTop: "4rem" }}>
            <Navbar></Navbar>
            {table ? (
              <>
                <div className='searchbar' style={{ display: "flex", alignItems: "center",  height: "10%" }}>
                   
                    <InputSearch
                        className="inputSearch"
                        label="Search"
                        value={searchQuery}
                        onChange={(event) => handleSearch(event.target.value)}
                        width="25.3rem" />
                    <Button style={{ backgroundColor: "white", marginLeft: 1300}}>
                        DOWNLOAD DATA
                        <Download style={{ marginLeft: 10 }} />
                    </Button>
                </div>
                <div className='tableContainer' style={{ width: "98%", height: "95%", display: "flex", justifyContent: "center", marginTop: 15}}>
                    <TableContainer>
                        <Table style={{ borderCollapse: "collapse", width: "100%" }}>
                            <TableHead>
                                <TableRow style={{ border: "1px solid white", display: "flex", justifyContent: "space-between" }}>
                                    <TableCell style={{ flex: 1, color:"white" }}>Ticket No.</TableCell>
                                    <TableCell style={{ flex: 1, color:"white" }}>Name</TableCell>
                                    <TableCell style={{ flex: 1, color:"white" }}>Violation</TableCell>
                                    <TableCell style={{ flex: 1, color:"white" }}>Date</TableCell>
                                    <TableCell style={{ flex: 1, color:"white" }}>Apprehending Officer</TableCell>
                                    <TableCell style={{ flex: 1, color:"white" }}>Status</TableCell>
                                    <TableCell style={{ flex: 1, color:"white" }}>Offense</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentRows.map((item, index) => (
                                    <TableRow key={index} style={{ display: "flex", borderLeft: "1px solid white", borderRight: "1px solid white", justifyContent: "space-between" }}>
                                        <TableCell style={{ flex: 1, color:"white" }}>
                                            <a className='ticket' href="#">{item.ticket_no}</a>
                                        </TableCell>
                                        <TableCell style={{ flex: 1, color: "white" }}>
                                            <a className='name' onClick={() => setTable(!table) & setActivePerson(item.name)} href="#">
                                                {item.name}
                                            </a>
                                        </TableCell>
                                        <TableCell style={{ flex: 1, color:"white" }}>
                                            {item.violations.map((violation, index) => (
                                                <span key={index}>{violation.violation}{index !== item.violations.length - 1 ? ', ' : ''}</span>
                                            ))}
                                        </TableCell>                                        <TableCell style={{ flex: 1, color:"white" }}>{item.date}</TableCell>
                                        <TableCell style={{ flex: 1, color:"white" }}>{item.apprehending_officer}</TableCell>
                                        <TableCell
                                            style={{
                                                flex: 1,
                                                color: item.status === 'OVERDUE' ? 'red' : (item.status === 'CLEARED' ? 'white' : '#00D05E'),
                                            }}
                                        >
                                            {item.status === 'OVERDUE'
                                                ? `OVERDUE -${formatRemainingTime(item.date, item.status)}`
                                                : (item.status === 'CLEARED' ? 'CLEARED' : `PENDING ${formatRemainingTime(item.date, item.status)}`)}
                                        </TableCell>

                                        <TableCell style={{ flex: 1, color:"white" }}>
                                            {offenseCountMap[item.name] === 3 ? "3rd" : `${offenseCountMap[item.name]}${offenseCountMap[item.name] === 1 ? "st" : offenseCountMap[item.name] === 2 ? "nd" : "th"} Offense`}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div className="pagination">
                    <button
                        style={{ backgroundColor: "transparent", border: 0 }}
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(1)}
                    >
                        <ArrowBackIosIcon />
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => {
                        if (totalPages <= 4 || (index + 1 === 1 || index + 1 === totalPages || Math.abs(currentPage - (index + 1)) <= 1)) {
                            return (
                                <button
                                    style={{
                                        border: 0,
                                        backgroundColor: "transparent",
                                        fontSize: 20,
                                    }}
                                    key={index}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={currentPage === index + 1 ? 'activePage' : ''}
                                >
                                    {index + 1}
                                </button>
                            );
                        } else if (Math.abs(currentPage - (index + 1)) === 2) {
                            return (
                                <span key={index}>...</span>
                            );
                        }
                        return null;
                    })}
                    <button
                        style={{ backgroundColor: "transparent", border: 0 }}
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(totalPages)} // Go to the last page
                    >
                        <ArrowForwardIosIcon />
                    </button>
                </div>
              </>  
            ) : 
                <div style={{ position: 'absolute', height: '85%', width: '95%', padding: 20 }}>
                    <div>
                        <IconButton onClick={() => setTable(!table) & setActivePerson(!activePerson)} style={{color:"white"}}><ArrowBack style={{color:"white", fontSize: 40}}></ArrowBack></IconButton>
                        <h1 style={{ textAlign: 'center', fontSize: 30, color: 'white', marginTop: -50 }}>JAYDE MIKE ENGRACIA DETAILS</h1>
                    </div>
                    <div>
                        <div style={{ flexDirection: 'row', position: 'absolute', width: '100%' }}>
                            <Button className='button' 
                                style={{
                                    backgroundColor: activeTable === 'personal' ? '#486EF5' : '#2743AA',
                                    width: '20%',
                                    color: 'white',
                                    marginRight: 20,
                                }}
                                onClick={() => handleTableClick('personal')}
                            >
                                Personal Information
                            </Button>
                            <Button className='button' 
                                style={{
                                    backgroundColor: activeTable === 'violation' ? '#486EF5' : '#2743AA',
                                    width: '20%',
                                    color: 'white',
                                    marginRight: 20,
                                }}
                                onClick={() => handleTableClick('violation')}
                            >
                                Violation Details
                            </Button>
                        </div>
                        {activeTable === 'personal' && (
                            <div className='tableContainer'>
                                
                                <h2>Personal Information</h2>
                                <TableContainer>
                                    <Table style={{ borderCollapse: "collapse", width: "100%", marginTop: 50 }}>
                                        <TableHead>
                                            <TableRow style={{ border: "1px solid white", display: "flex", justifyContent: "space-between" }}>
                                                <TableCell style={{ flex: 1, color:"white" }}>Name</TableCell>
                                                <TableCell style={{ flex: 1, color:"white" }}>Address</TableCell>
                                                <TableCell style={{ flex: 1, color:"white" }}>Driver's License No.</TableCell>
                                                <TableCell style={{ flex: 1, color:"white" }}>Type</TableCell>
                                                <TableCell style={{ flex: 1, color:"white" }}>Date of Birth</TableCell>
                                                <TableCell style={{ flex: 1, color:"white" }}>Nationality</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow style={{ display: "flex", borderLeft: "1px solid white", borderRight: "1px solid white", justifyContent: "space-between" }}>
                                                <TableCell style={{ flex: 1, color:"white" }}>Jayde Mike Engracia</TableCell>
                                                <TableCell style={{ flex: 1, color:"white" }}>Zone 6, Cugman, Cagayan de Oro</TableCell>
                                                <TableCell style={{ flex: 1, color:"white" }}>K03-12-10299</TableCell>
                                                <TableCell style={{ flex: 1, color:"white" }}>Driver's License</TableCell>
                                                <TableCell style={{ flex: 1, color:"white" }}>12/12/2000</TableCell>
                                                <TableCell style={{ flex: 1, color:"white" }}>PHL</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <h2 style={{color:"white"}}>Vehicle Information</h2>
                                <TableContainer>
                                    <Table style={{ borderCollapse: "collapse", width: "100%", }}>
                                        <TableHead>
                                            <TableRow style={{ border: "1px solid white", display: "flex", justifyContent: "space-between" }}>
                                                <TableCell style={{ flex: 1, color:"white" }}>Name</TableCell>
                                                <TableCell style={{ flex: 1, color:"white" }}>Address</TableCell>
                                                <TableCell style={{ flex: 1, color:"white" }}>Driver's License No.</TableCell>
                                                <TableCell style={{ flex: 1, color:"white" }}>Type</TableCell>
                                                <TableCell style={{ flex: 1, color:"white" }}>Date of Birth</TableCell>
                                                <TableCell style={{ flex: 1, color:"white" }}>Nationality</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow style={{ display: "flex", borderLeft: "1px solid white", borderRight: "1px solid white", justifyContent: "space-between" }}>
                                                <TableCell style={{ flex: 1, color:"white" }}>Jayde Mike Engracia</TableCell>
                                                <TableCell style={{ flex: 1, color:"white" }}>Zone 6, Cugman, Cagayan de Oro</TableCell>
                                                <TableCell style={{ flex: 1, color:"white" }}>K03-12-10299</TableCell>
                                                <TableCell style={{ flex: 1, color:"white" }}>Driver's License</TableCell>
                                                <TableCell style={{ flex: 1, color:"white" }}>12/12/2000</TableCell>
                                                <TableCell style={{ flex: 1, color:"white" }}>PHL</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        )}
                        {activeTable === 'violation' && activePerson !== null && (
                            <div style={{ height: "75vh", width: "100%", flexDirection: "row", marginTop: "5%", position: "absolute", display: "flex", flexWrap: "wrap" }} className='tableContainer'>
                                {currentRows.map((item, index) => {
                                    if (item.name === activePerson) {
                                        return (
                                            <div key={index} style={{ backgroundColor: "white", marginRight: 20, padding: 10, height: "40%", width: "20%", borderRadius: 20, marginBottom: "1rem", }}>
                                                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                                    <tbody>
                                                        <tr>
                                                            <td style={{  textAlign: "left", fontWeight: "bolder", height: 50 }}>Violation</td>
                                                            <td>
                                                                {item.violations.map((violation, vIndex) => (
                                                                    <div key={vIndex}>{violation.violation}</div>
                                                                ))}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: "left", fontWeight: "bolder", height: 50, }}>Date</td>
                                                            <td style={{}}>
                                                                {item.violations.map((violation, vIndex) => (
                                                                    <div key={vIndex}>{item.date}</div>
                                                                ))}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: "left", fontWeight: "bolder", height: 50, }}>Place of Violation</td>
                                                            <td>
                                                                {item.violations.map((violation, vIndex) => (
                                                                    <div key={vIndex}>{item.place_of_violation}</div>
                                                                ))}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: "left", fontWeight: "bolder", height: 50, }}>Apprehending Officer</td>
                                                            <td>
                                                                {item.violations.map((violation, vIndex) => (
                                                                    <div key={vIndex}>{item.apprehending_officer}</div>
                                                                ))}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: "left", fontWeight: "bolder", height: 50,  }}>Status</td>
                                                            <td>
                                                                {item.violations.map((violation, vIndex) => (
                                                                    <div key={vIndex}>{item.status}</div>
                                                                ))}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        );
                                    }
                                    return null;
                            })}
                            </div>

                        )}

                    </div>
                </div>
            }
        </div>
    );
}

export default Violation;
