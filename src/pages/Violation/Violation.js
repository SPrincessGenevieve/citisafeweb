import React, { useState, useEffect } from 'react';
import Navbar from '../../Navbar';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import violationsData from './../../JSON/violationsData.json'; // Update the path accordingly
import InputSearch from './../../components/InputSearch'
import './styles.css'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function Violation(props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState(violationsData);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = violationsData.filter(item =>
            item.ticketNo.includes(query) || item.name.toLowerCase().includes(query.toLowerCase())
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


    return (
        <div className='violationContainer' style={{ display: "flex", flexDirection: "column", alignItems: "center",  height: "90vh", width:"100%", marginTop: "4rem" }}>
            <Navbar></Navbar>
            <div className='searchbar' style={{ width:"98%", height:"10%"}}>
                <InputSearch
                    className="inputSearch"
                    label="Search"
                    value={searchQuery}
                    onChange={(event) => handleSearch(event.target.value)}
                    marginTop="1%"
                    width="25.3rem"
                />
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
                                    <TableCell style={{ flex: 1, color:"white" }}>{item.ticketNo}</TableCell>
                                    <TableCell style={{ flex: 1, color:"white" }}>{item.name}</TableCell>
                                    <TableCell style={{ flex: 1, color:"white" }}>{item.violation}</TableCell>
                                    <TableCell style={{ flex: 1, color:"white" }}>{item.date}</TableCell>
                                    <TableCell style={{ flex: 1, color:"white" }}>{item.officer}</TableCell>
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

        </div>
    );
}

export default Violation;
