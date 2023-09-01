import React, { useState, useEffect } from 'react';
import Navbar from '../../Navbar';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Select, MenuItem, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import violationsData from './../../JSON/violationsData.json'; // Update the path accordingly
import violationsSample from './../../JSON/sampleViolation.json'; // Update the path accordingly
import InputSearch from './../../components/InputSearch'
import './styles.css'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Driver from '../driver/driver';
import ConstButton from '../../components/ConstButton';
import IconButton from '@mui/material/IconButton';
import { AddBoxOutlined, ArrowBack, BackHandOutlined, Download, CloseOutlined, DeleteOutline, Edit, Save, Close, Check, Add } from '@mui/icons-material';
import * as XLSX from 'xlsx';
import StatusSelection from '../../components/StatusSelection';
import StatSelect from './../../JSON/StatSelect.json'
import CheckBox from '../../components/FilterComponent';
import { Sort } from '@mui/icons-material';
import { SortByAlpha } from '@mui/icons-material';
import FilterComponent from '../../components/FilterComponent';

const MenuProps = {
    PaperProps: {
      style: {
        width: 250,
        backgroundColor:"white"
      },
    },
  };


function Violation({navigation}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState(violationsData);
    const [filteredDatas, setFilteredDatas] = useState(violationsSample);
    const [currentPage, setCurrentPage] = useState(1);
    const [user, setUser] = useState(false)
    const [table, setTable] = useState(true)
    const rowsPerPage = 10;
    const [selectedStatus, setSelectedStatus] = useState([]);

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
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const currentRows = selectedStatus.length === 0
    ? filteredData.slice(firstRowIndex, lastRowIndex) // Display all rows when nothing is checked
    : filteredData
      .filter((item) => selectedStatus.includes(item.status))
      .slice(firstRowIndex, lastRowIndex);

  
  
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
        if (status === 'Cleared') {
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

    const handleDownload = () => {
        const headers = [
            'id',
            'Ticket No.',
            'Name',
            'Violation',
            'Date',
            'Apprehending Officer',
            'Status',
            'Offense',
        ];
    
        const data = currentRows.map((item) => [
            item.id,
            item.ticket_no,
            item.name,
            item.violations.map((violation) => violation.violation).join(', '),
            item.date,
            item.apprehending_officer,
            item.status,
            offenseCountMap[item.name] === 3
                ? '3rd Offense'
                : `${offenseCountMap[item.name]}${
                      offenseCountMap[item.name] === 1
                          ? 'st'
                          : offenseCountMap[item.name] === 2
                          ? 'nd'
                          : 'th'
                  } Offense`,
        ]);
    
        const worksheet = XLSX.utils.json_to_sheet([headers, ...data]);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Violations');
    
        XLSX.writeFile(workbook, 'violations.xlsx');
    };

    const [editingRows, setEditingRows] = useState({}); // Use an object to store editing state for each row
    const [deletingRows, setDeletingRows] = useState({}); // Use an object to store deleting state for each row
    const [editedStatus, setEditedStatus] = useState({});



    const handleEdit = (rowId) => {
        setEditingRows((prevEditingRows) => ({ ...prevEditingRows, [rowId]: true }));
    };
    
    const handleDelete = (rowId) => {
        setDeletingRows((prevDeletingRows) => ({ ...prevDeletingRows, [rowId]: true }));
    };
    
    const handleSave = (rowId) => {
        // Logic to save changes here
        setEditingRows((prevEditingRows) => ({ ...prevEditingRows, [rowId]: false }));
    };
    
    const handleCheck = (rowId) => {
        // Logic to confirm deletion here
        setDeletingRows((prevDeletingRows) => ({ ...prevDeletingRows, [rowId]: false }));
    };
    
    const handleCancelEdit = (rowId) => {
        setEditingRows((prevEditingRows) => ({ ...prevEditingRows, [rowId]: false }));
    };
    
    const handleCancelDelete = (rowId) => {
        setDeletingRows((prevDeletingRows) => ({ ...prevDeletingRows, [rowId]: false }));
    };

    const [nameSortOrder, setNameSortOrder] = useState('normal');


// Add these sorting functions in your Violation component
const sortByName = () => {
    // Check the current sorting order
    if (nameSortOrder === 'asc') {
      // Sort in descending order (Z-A)
      setFilteredData((prevData) => [...prevData.sort((a, b) => b.name.localeCompare(a.name))]);
      setNameSortOrder('desc');
    } else if (nameSortOrder === 'desc') {
      // Reset to the original order
      setFilteredData(violationsData); // Assuming violationsData contains the original data
      setNameSortOrder('normal');
    } else {
      // Sort in ascending order (A-Z)
      setFilteredData((prevData) => [...prevData.sort((a, b) => a.name.localeCompare(b.name))]);
      setNameSortOrder('asc');
    }
  };
  
  
  const sortByStatus = () => {
    // Logic to sort by status
    setFilteredData((prevData) => [...prevData.sort((a, b) => a.status.localeCompare(b.status))]);
  };
  




    return (
        <div className='violationContainer' style={{ display: "flex", flexDirection: "column", alignItems: "center",  height: "90vh", width:"100%", marginTop: "4rem" }}>
            <Navbar></Navbar>
            {table ? (
              <>
                <div className='searchbar' style={{ display: "flex", flexDirection:"row",  height: "10%", justifyContent:"space-between", width:"98%", alignItems:"center" }}>
                   <div style={{}}>
                        <InputSearch
                            className="inputSearch"
                            label="Search"
                            value={searchQuery}
                            onChange={(event) => handleSearch(event.target.value)}
                            width="25.3rem" />
                   </div>
                    
                    <div style={{display:"flex"}}>
                    <FilterComponent sortName={sortByName} sortStatus={sortByStatus} selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus}></FilterComponent>
                    </div>
                    <div>
                        <Button onClick={handleDownload} style={{ backgroundColor: "white", width: 200}}>
                            DOWNLOAD DATA
                            <Download style={{ marginLeft: 10 }} />
                        </Button>
                    </div>
                </div>


                <div className='tableContainer' style={{ width: "98%", height: "95%", display: "flex", justifyContent: "center", marginTop: 15}}>
                    <TableContainer>
                        <Table style={{ borderCollapse: "collapse", width: "100%" }}>
                            <TableHead>
                                <TableRow style={{ border: "1px solid white", display: "flex", justifyContent: "space-between" }}>
                                    <TableCell style={{ flex: 1, color:"white" }}>ID</TableCell>
                                    <TableCell style={{ flex: 1, color:"white" }}>Ticket No.</TableCell>
                                    <TableCell style={{ flex: 1, color:"white" }}>Name</TableCell>
                                    <TableCell style={{ flex: 1, color:"white" }}>Violation</TableCell>
                                    <TableCell style={{ flex: 1, color:"white" }}>Date</TableCell>
                                    <TableCell style={{ flex: 1, color:"white" }}>Apprehending Officer</TableCell>
                                    <TableCell style={{ flex: 1, color:"white" }}>Status</TableCell>
                                    <TableCell style={{ flex: 1, color:"white" }}>Offense</TableCell>
                                    <TableCell style={{ flex: 1, color:"white" }}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentRows.map((item, index) => (
                                    <TableRow key={index} style={{ display: "flex", borderLeft: "1px solid white", borderRight: "1px solid white", justifyContent: "space-between" }}>
                                        <TableCell style={{ flex: 1, color:"white" }}>
                                            <a className='ticket' href="#">{item.id}</a>
                                        </TableCell>
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
                                                color: item.status === 'Overdue' ? 'red' : (item.status === 'Cleared' ? 'white' : '#00D05E'),
                                            }}
                                        >
                                            {editingRows[item.id] ? (
                                                <StatusSelection label={"Select Status"} labelSelect={"Select Status"} json={StatSelect}></StatusSelection>
                                                
                                            ) : item.status === 'Overdue' ? (
                                                `Overdue -${formatRemainingTime(item.date, item.status)}`
                                            ) : (
                                                <span>{item.status}</span>
                                            )}
                                        </TableCell>

                                        <TableCell style={{ flex: 1, color:"white" }}>
                                            {offenseCountMap[item.name] === 3 ? "3rd" : `${offenseCountMap[item.name]}${offenseCountMap[item.name] === 1 ? "st" : offenseCountMap[item.name] === 2 ? "nd" : "th"} Offense`}
                                        </TableCell>


                                        <TableCell className='row' style={{ flexDirection: 'row', justifyContent: 'space-between', color: 'white' }}>
                                            {editingRows[item.id] ? (
                                                <>
                                                <Button
                                                    variant="contained"
                                                    style={{ backgroundColor: 'transparent', boxShadow: 'none', color: 'white', marginLeft: 10 }}
                                                    onClick={() => handleSave(item.id)}
                                                >
                                                    <Check style={{ height: 25 }} />
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    style={{ backgroundColor: 'transparent', boxShadow: 'none', color: 'white' }}
                                                    onClick={() => handleCancelEdit(item.id)}
                                                >
                                                    <Close style={{ height: 25 }} />
                                                </Button>
                                                </>
                                            ) : deletingRows[item.id] ? (
                                                <>
                                                <Button
                                                    variant="contained"
                                                    style={{ backgroundColor: 'transparent', boxShadow: 'none', color: 'white', marginLeft: 10 }}
                                                    onClick={() => handleCheck(item.id)}
                                                >
                                                    <Check style={{ height: 25 }} />
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    style={{ backgroundColor: 'transparent', boxShadow: 'none', color: 'white' }}
                                                    onClick={() => handleCancelDelete(item.id)}
                                                >
                                                    <Close style={{ height: 25 }} />
                                                </Button>
                                                </>
                                            ) : (
                                                <>
                                                <Button
                                                    variant="contained"
                                                    style={{ backgroundColor: 'transparent', boxShadow: 'none', color: 'white', marginLeft: 10 }}
                                                    onClick={() => handleEdit(item.id)}
                                                >
                                                    <Edit style={{ height: 25 }} />
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    style={{ backgroundColor: 'transparent', boxShadow: 'none', color: 'white' }}
                                                    onClick={() => handleDelete(item.id)}
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
            ) : 
                <></>
            }
        </div>
    );
}

export default Violation;
