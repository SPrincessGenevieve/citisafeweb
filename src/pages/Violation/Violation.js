import React, { useState, useEffect } from "react";
import Navbar from "../../Navbar";
import "./styles.css";
import { Edit, Close, Check, Search, Download } from "@mui/icons-material";
import StatusSelection from "../../components/StatusSelection";
import StatSelect from "./../../JSON/StatSelect.json";
import violationsData from "./../../JSON/violationsData.json";
import violationsSample from "./../../JSON/sampleViolation.json";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useSelector } from "react-redux";
import axios from '../../plugins/axios'

const styles = (theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalPaper: {
    outline: "none",
    background: "white",
    borderRadius: 10,
    padding: theme.spacing(3),
  },
});

const cellStylesHeader = {
  cell: {
    color: "black",
    width: 150,
    height: 30,
    textAlign: "center",
    fontWeight: "bold",
  },
};

const cellStylesBody = {
  cell: {
    color: "black",
    height: "auto",
    textAlign: "left",
    width: 150,
    height: 40,
    textAlign: "center",
  },
};

if (window.innerWidth <= 600) {
  cellStylesHeader.cell.width = 100;
  cellStylesBody.cell.width = 100;
}

function Violation({ navigation }) {


  // jayde 
  const [ticketData, setTicketData] = useState([])
  const Token = useSelector((state) => state.auth.token)

  // edit ticket status
  const [editTicketStatus, setEditTicketStatus] = useState('')
  
  const handleStatusChange = (newStatus) => {
    setEditTicketStatus(newStatus)
  };




  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(violationsData);
  const [filteredDatas, setFilteredDatas] = useState(violationsSample);
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState(false);
  const [table, setTable] = useState(true);
  const rowsPerPage = 6;
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [openModal, setOpenModal] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [editingRows, setEditingRows] = useState({});
  const [deletingRows, setDeletingRows] = useState({});
  const [activePerson, setActivePerson] = useState(null);
  const [activeTable, setActiveTable] = useState("personal");
  const lastRowIndex = currentPage * rowsPerPage;
  const firstRowIndex = lastRowIndex - rowsPerPage;
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const currentRows =
    selectedStatus.length === 0
      ? filteredData.slice(firstRowIndex, lastRowIndex)
      : filteredData
          .filter((item) => selectedStatus.includes(item.status))
          .slice(firstRowIndex, lastRowIndex);

  const handleOpenModal = (ticketNo) => {
    setSelectedTicket(ticketNo);
  };

  const handleCloseModal = () => {
    setSelectedTicket(null);
  };

  const handleSubmit = () => {
    handleCloseModal();
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = violationsData.filter(
      (item) =>
        item.ticket_no.includes(query) ||
        item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const offenseCountMap = {};
  filteredData.forEach((item) => {
    if (offenseCountMap[item.name]) {
      offenseCountMap[item.name]++;
    } else {
      offenseCountMap[item.name] = 1;
    }
  });

  {
    /*const formatRemainingTime = (remainingTime) => {
    if (remainingTime <= 0) {
      return "00:00:00";
    }

    const hours = Math.floor(remainingTime / (60 * 60 * 1000));
    const minutes = Math.floor(
      (remainingTime % (60 * 60 * 1000)) / (60 * 1000)
    );
    const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };*/
  }
  {
    /* */
  }
  const calculateRemainingTime = (date, status) => {
    if (status === "Cleared") {
      return 0;
    }

    const currentTime = new Date().getTime();
    const targetTime =
      new Date(Date.parse(date)).getTime() + 72 * 60 * 60 * 1000;
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

  const handleDownload = () => {
    window.alert("Downloaded successfully");
  };

  const handleTableClick = (table) => {
    setActiveTable(table);
  };

  const handleEdit = (rowId) => {
    setEditingRows((prevEditingRows) => ({
      ...prevEditingRows,
      [rowId]: true,
    }));
  };

  const handleDelete = (rowId) => {
    setDeletingRows((prevDeletingRows) => ({
      ...prevDeletingRows,
      [rowId]: true,
    }));
  };

  const handleSave = (rowId) => {
    setEditingRows((prevEditingRows) => ({
      ...prevEditingRows,
      [rowId]: false,
    }));
  };

  const handleCheck = (rowId) => {
    setDeletingRows((prevDeletingRows) => ({
      ...prevDeletingRows,
      [rowId]: false,
    }));
  };

  const handleCancelEdit = (rowId) => {
    setEditingRows((prevEditingRows) => ({
      ...prevEditingRows,
      [rowId]: false,
    }));
  };

  useEffect(() => {

    axios.get('ticket/register/', {
      headers: {
        Authorization: `token ${Token}`
      }
    }).then((response) => {
      console.log(response.data)
      setTicketData(response.data)
    }).catch((error) => {
      window.alert("Error Fetching")
    })


  }, [Token])

  return (
    <div className="violation-container">
      <div className="navbar-container">
        <Navbar></Navbar>
      </div>

      <div className="first-layer-violation">
        <div className="search-container-violation">
          <Search
            className="search-icon"
            style={{ position: "absolute", left: "3.5%", marginTop: 10 }}
          ></Search>
          <input
            value={searchQuery}
            onChange={(event) => handleSearch(event.target.value)}
            className="search-box"
          ></input>
          <Button
            onClick={handleDownload}
            className="add-user-btn"
            style={{
              backgroundColor: "#3E7C1F",
              borderRadius: 40,
              color: "white",
              paddingRight: 10,
              paddingLeft: 10,
              height: 40,
              marginLeft: 10,
            }}
          >
            <Download style={{}} />
            {window.innerWidth <= 600 ? null : "DOWNLOAD"}
          </Button>
        </div>
        <div className="table-conatiner-violation">
          {ticketData.map((item, index) => (
            <Dialog
              key={item.MFRTA_TCT_NO}
              open={selectedTicket === item.MFRTA_TCT_NO}
              onClose={handleCloseModal}
              sx={{
                "& .MuiDialog-paper": {
                  minWidth: "60%",
                  minHeight: "40%",
                },
              }}
            >
              <DialogTitle>{item.MFRTA_TCT_NO}</DialogTitle>
              <DialogContent>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <table>
                    <tr>
                      <td className="row-details">Name</td>
                      <td className="row-details-value">{item.driver_info.first_name} {item.driver_info.middle_initial}. {item.driver_info.last_name} </td>
                    </tr>
                    <tr>
                      <td className="row-details">Address</td>
                      <td className="row-details-value">{item.driver_info.address}</td>
                    </tr>
                    <tr>
                      <td className="row-details">License No.</td>
                      <td className="row-details-value">
                        {item.driver_info.license_number}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Type</td>
                      <td className="row-details-value">{item.classification}</td>
                    </tr>
                    <tr>
                      <td className="row-details">Date of Birth</td>
                      <td className="row-details-value">{item.driver_info.birthdate}</td>
                    </tr>
                    <tr>
                      <td className="row-details">Nationality</td>
                      <td className="row-details-value">{item.driver_info.nationality}</td>
                    </tr>
                    <tr>
                      <td className="row-details">Plate No.</td>
                      <td className="row-details-value">
                        {item.vehicle_info.plate_number}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Make</td>
                      <td className="row-details-value">{item.vehicle_info.make}</td>
                    </tr>
                    <tr>
                      <td className="row-details">Model</td>
                      <td className="row-details-value">{item.vehicle_info.vehicle_model}</td>
                    </tr>
                    <tr>
                      <td className="row-details">Color</td>
                      <td className="row-details-value">{item.vehicle_info.color}</td>
                    </tr>
                    <tr>
                      <td className="row-details">Class</td>
                      <td className="row-details-value">{item.vehicle_info.vehicle_class}</td>
                    </tr>
                    <tr>
                      <td className="row-details">Body Markings</td>
                      <td className="row-details-value">
                        {item.vehicle_info.body_markings}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Registered Owner</td>
                      <td className="row-details-value">
                        {item.vehicle_info.name}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Registered Owner Address</td>
                      <td className="row-details-value">
                        {item.vehicle_info.address}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Contact No.</td>
                      <td className="row-details-value">{item.vehicle_info.contact_number}</td>
                    </tr>
                    <tr>
                      <td className="row-details">Date & Time of Violation</td>
                      <td className="row-details-value">
                        {item.date_issued}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Place of Violation</td>
                      <td className="row-details-value">
                        {item.place_violation}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Apprehending Officer</td>
                      <td className="row-details-value">
                        {item.user_ID.first_name} {item.user_ID.middle_name} {item.user_ID.last_name}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Ticket Status</td>
                      <td className="row-details-value">{item.ticket_status}</td>
                    </tr>
                    <tr>
                      <td className="row-details">Penalty</td>
                      <td className="row-details-value">{item.penalty_amount}</td>
                    </tr>
                    <tr>
                      <td className="row-details">Violation</td>
                      <td className="row-details-value">
                        {item.violation_info.violations_info.map((violation, index) => (
                          <div key={index}>{violation}</div>
                        ))}
                      </td>
                    </tr>
                  </table>
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseModal} color="warning">
                  CLOSE
                </Button>
              </DialogActions>
            </Dialog>
          ))}

          <div className="tab-con-2">
            <TableContainer>
              <Table className="table">
                <TableHead>
                  <TableRow className="table-row">
                    <TableCell style={cellStylesHeader.cell}>
                      Tracking #
                    </TableCell>
                    <TableCell style={cellStylesHeader.cell}>Name</TableCell>
                    <TableCell style={cellStylesHeader.cell}>
                      Violation
                    </TableCell>
                    <TableCell style={cellStylesHeader.cell}>Date</TableCell>
                    <TableCell style={cellStylesHeader.cell}>Offense</TableCell>
                    <TableCell style={cellStylesHeader.cell}>
                      Apprehending Officer
                    </TableCell>
                    <TableCell style={cellStylesHeader.cell}>Penalty</TableCell>
                    <TableCell style={cellStylesHeader.cell}>Status</TableCell>
                    <TableCell style={cellStylesHeader.cell}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ticketData.map((item, index) => (
                    <TableRow
                      className={`table-body-row ${
                        index % 2 === 0 ? "even-row" : "odd-row"
                      }`}
                      key={index}
                    >
                      <TableCell style={cellStylesBody.cell}>
                        <a
                          className="ticket"
                          href="#"
                          onClick={() => handleOpenModal(item.MFRTA_TCT_NO)}
                        >
                          {item.MFRTA_TCT_NO}
                        </a>
                      </TableCell>
                      <TableCell style={cellStylesBody.cell}>
                        <a
                          className="ticket"
                          onClick={() =>
                            setTable(!table) & setActivePerson(item.name)
                          }
                          href="#"
                        >
                      {item.driver_info.first_name} {item.driver_info.middle_initial}. {item.driver_info.last_name}                        </a>
                      </TableCell>
                      <TableCell style={cellStylesBody.cell}>
                      {item.violation_info.violations_info.map((violation, index) => (
                          <div key={index}>{violation}</div>
                        ))}
                      </TableCell>
                      <TableCell style={cellStylesBody.cell}>
                        {item.date_issued}
                      </TableCell>
                      <TableCell style={cellStylesBody.cell}>
                        {item.driver_info.offenses_count}
                      </TableCell>

                      <TableCell style={cellStylesBody.cell}>
                      {item.user_ID.first_name} {item.user_ID.middle_name} {item.user_ID.last_name}                      </TableCell>
                      <TableCell style={cellStylesBody.cell}>
                        {item.penalty_amount}
                      </TableCell>
                      <TableCell style={cellStylesBody.cell}>
                        <div className="status-container">
                          <p
                            style={{
                              flex: 1,
                              backgroundColor:
                                item.ticket_status === "Overdue"
                                  ? "#FBE7E8"
                                  : item.ticket_status === "PAID"
                                  ? "#FEF2E5"
                                  : "#EBF9F1",
                              color:
                                item.ticket_status === "Overdue"
                                  ? "#A30D11"
                                  : item.ticket_status === "PAID"
                                  ? "#CD6200"
                                  : "#1F9254",
                              width: 100,
                              height: 15,
                              padding: 10,
                              textAlign: "center",
                              borderRadius: 20,
                            }}
                          >
                            {editingRows[item.MFRTA_TCT_NO] ? (
                              <div
                                className={
                                  index % 2 === 0 ? "even-row" : "odd-row"
                                }
                                style={{
                                  marginTop: -15,
                                  width: 200,
                                  marginLeft: -10,
                                }}
                              >
                                <StatusSelection
                                  label={"Select Status"}
                                  labelSelect={"Select Status"}
                                  json={StatSelect}
                                  width={150}
                                  onStatusChange={handleStatusChange}

                                ></StatusSelection>
                              </div>
                            ) : item.ticket_status === "Overdue" ? (
                              `Overdue`
                            ) : (
                              <span>{item.ticket_status}</span>
                            )}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell className="row" style={cellStylesBody.cell}>
                        {editingRows[item.MFRTA_TCT_NO] ? (
                          <div className="check-close">
                            <Button
                              variant="contained"
                              style={{
                                backgroundColor: "transparent",
                                boxShadow: "none",
                                color: "black",
                                marginLeft: 0,
                              }}
                              onClick={() => {
                                const formData = {
                                  MFRTA_TCT_NO: item.MFRTA_TCT_NO,
                                  ticket_status: editTicketStatus
                                };
                                console.log(formData)

                                axios.patch(`ticket/register/${item.MFRTA_TCT_NO}/`, formData, {
                                  headers: {
                                    Authorization: `token ${Token}`
                                  }
                                }).then((response) => {
                                  console.log(response.data)
                                  window.alert("Successfully Edit Penalty Status")
                                  handleSave(user.MFRTA_TCT_NO)
                                }).catch((error) => {
                                  window.alert("Unsuccessfully Edit Penalty Status")
                                  console.log(error)
                                })

                              }}
                            >
                              <Check style={{ height: 25 }} />
                            </Button>
                            <Button
                              variant="contained"
                              style={{
                                backgroundColor: "transparent",
                                boxShadow: "none",
                                color: "black",
                              }}
                              onClick={() => handleCancelEdit(item.MFRTA_TCT_NO)}
                            >
                              <Close style={{ height: 25 }} />
                            </Button>
                          </div>
                        ) : deletingRows[item.MFRTA_TCT_NO] ? (
                          <>
                            <Button
                              variant="contained"
                              style={{
                                backgroundColor: "transparent",
                                boxShadow: "none",
                                color: "black",
                                marginLeft: 10,
                              }}
                              onClick={() => handleCheck(item.MFRTA_TCT_NO)}
                            >
                              <Check style={{ height: 25 }} />
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              variant="contained"
                              style={{
                                backgroundColor: "transparent",
                                boxShadow: "none",
                                color: "black",
                                marginLeft: 10,
                              }}
                              onClick={() => handleEdit(item.MFRTA_TCT_NO)}
                            >
                              <Edit style={{ height: 25 }} />
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
        </div>
        <div className="pagination">
          <button
            style={{ backgroundColor: "transparent", border: 0 }}
            disabled={currentPage === 1}
            onClick={() => handlePageChange(1)}
          >
            <p>Previous</p>
          </button>
          {Array.from({ length: totalPages }, (_, index) => {
            if (
              totalPages <= 4 ||
              index + 1 === 1 ||
              index + 1 === totalPages ||
              Math.abs(currentPage - (index + 1)) <= 1
            ) {
              return (
                <button
                  style={{
                    border: 0,
                    marginRight: 10,
                    height: 40,
                    width: 40,
                    color: currentPage === index + 1 ? "white" : "black",
                    borderRadius: 10,
                    backgroundColor:
                      currentPage === index + 1 ? "#3e7c1f" : "#e0e0e0",
                    fontSize: 20,
                  }}
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={
                    currentPage === index + 1 ? "activePage" : "inactivePage"
                  }
                >
                  {index + 1}
                </button>
              );
            } else if (Math.abs(currentPage - (index + 1)) === 2) {
              return <span key={index}>...</span>;
            }
            return null;
          })}
          <button
            style={{ backgroundColor: "transparent", border: 0 }}
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(totalPages)}
          >
            <p>Next</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Violation;
