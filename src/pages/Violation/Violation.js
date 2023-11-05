import React, { useState, useEffect } from "react";
import Navbar from "../../Navbar";
import "./styles.css";
import { Edit, Close, Check, Search, Download } from "@mui/icons-material";
import StatusSelection from "../../components/StatusSelection";
import StatSelect from "./../../JSON/StatSelect.json";
import violationsData from "./../../JSON/violationsData.json"; // Update the path accordingly
import violationsSample from "./../../JSON/sampleViolation.json"; // Update the path accordingly
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
  Fade,
  withStyles,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import DetailsFormat from "../../components/DetailsFormat";

const styles = (theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Set the overlay to a transparent black color
  },
  modalPaper: {
    outline: "none",
    background: "white", // Set the modal content background color
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
    setCurrentPage(1); // Reset to first page when searching
  };

  const lastRowIndex = currentPage * rowsPerPage;
  const firstRowIndex = lastRowIndex - rowsPerPage;
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const currentRows =
    selectedStatus.length === 0
      ? filteredData.slice(firstRowIndex, lastRowIndex) // Display all rows when nothing is checked
      : filteredData
          .filter((item) => selectedStatus.includes(item.status))
          .slice(firstRowIndex, lastRowIndex);

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

  const formatRemainingTime = (remainingTime) => {
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
  };

  const calculateRemainingTime = (date, status) => {
    if (status === "Cleared") {
      return 0; // Stop the countdown
    }

    const currentTime = new Date().getTime();
    const targetTime =
      new Date(Date.parse(date)).getTime() + 72 * 60 * 60 * 1000; // Adding 72 hours
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
  const [editingRows, setEditingRows] = useState({});
  const [deletingRows, setDeletingRows] = useState({});
  const [activePerson, setActivePerson] = useState(null);
  const [activeTable, setActiveTable] = useState("personal");

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
    // Logic to save changes here
    setEditingRows((prevEditingRows) => ({
      ...prevEditingRows,
      [rowId]: false,
    }));
  };

  const handleCheck = (rowId) => {
    // Logic to confirm deletion here
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
          {currentRows.map((item, index) => (
            <Dialog
              key={item.ticket_no}
              open={selectedTicket === item.ticket_no}
              onClose={handleCloseModal}
              sx={{
                "& .MuiDialog-paper": {
                  minWidth: "60%",
                  minHeight: "40%",
                },
              }}
            >
              <DialogTitle>{item.ticket_no}</DialogTitle>
              <DialogContent>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <table>
                    <tr>
                      <td className="row-details">Name</td>
                      <td className="row-details-value">{item.name}</td>
                    </tr>
                    <tr>
                      <td className="row-details">Date</td>
                      <td className="row-details-value">{item.date}</td>
                    </tr>
                    <tr>
                      <td className="row-details">Address</td>
                      <td className="row-details-value">{item.address}</td>
                    </tr>
                    <tr>
                      <td className="row-details">License No.</td>
                      <td className="row-details-value">
                        {item.driver_license_no}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Type</td>
                      <td className="row-details-value">{item.type}</td>
                    </tr>
                    <tr>
                      <td className="row-details">Date of Birth</td>
                      <td className="row-details-value">
                        {item.date_of_birth}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Nationality</td>
                      <td className="row-details-value">{item.nationality}</td>
                    </tr>
                    <tr>
                      <td className="row-details">Plate No.</td>
                      <td className="row-details-value">
                        {item.vehicle_plate_no}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Make</td>
                      <td className="row-details-value">{item.make}</td>
                    </tr>
                    <tr>
                      <td className="row-details">Model</td>
                      <td className="row-details-value">{item.model}</td>
                    </tr>
                    <tr>
                      <td className="row-details">Color</td>
                      <td className="row-details-value">{item.color}</td>
                    </tr>
                    <tr>
                      <td className="row-details">Class</td>
                      <td className="row-details-value">{item.class}</td>
                    </tr>
                    <tr>
                      <td className="row-details">Body Markings</td>
                      <td className="row-details-value">
                        {item.body_markings}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Registered Owner</td>
                      <td className="row-details-value">
                        {item.registered_owner}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Registered Owner Address</td>
                      <td className="row-details-value">
                        {item.registered_owner_address}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Contact No.</td>
                      <td className="row-details-value">{item.contact_no}</td>
                    </tr>
                    <tr>
                      <td className="row-details">Time of Violation</td>
                      <td className="row-details-value">
                        {item.time_of_violation}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Contact No.</td>
                      <td className="row-details-value">
                        {item.place_of_violation}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Apprehending Officer</td>
                      <td className="row-details-value">
                        {item.apprehending_officer}
                      </td>
                    </tr>
                    <tr>
                      <td className="row-details">Place of Violation</td>
                      <td className="row-details-value">{item.status}</td>
                    </tr>
                    <tr>
                      <td className="row-details">Penalty</td>
                      <td className="row-details-value">{item.penalty}</td>
                    </tr>
                    <tr>
                      <td className="row-details">Violation</td>
                      <td className="row-details-value">{item.violations}</td>
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
                    <TableCell style={cellStylesHeader.cell}>ID</TableCell>
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
                  {currentRows.map((item, index) => (
                    <TableRow
                      className={`table-body-row ${
                        index % 2 === 0 ? "even-row" : "odd-row"
                      }`}
                      key={index}
                    >
                      <TableCell style={cellStylesBody.cell}>
                        {item.id}
                      </TableCell>
                      <TableCell style={cellStylesBody.cell}>
                        <a
                          className="ticket"
                          href="#"
                          onClick={() => handleOpenModal(item.ticket_no)}
                        >
                          {item.ticket_no}
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
                          {item.name}
                        </a>
                      </TableCell>
                      <TableCell style={cellStylesBody.cell}>
                        {item.violations}
                      </TableCell>
                      <TableCell style={cellStylesBody.cell}>
                        {item.date}
                      </TableCell>

                      <TableCell style={cellStylesBody.cell}>
                        {offenseCountMap[item.name] === 3
                          ? "3rd"
                          : `${offenseCountMap[item.name]}${
                              offenseCountMap[item.name] === 1
                                ? "st"
                                : offenseCountMap[item.name] === 2
                                ? "nd"
                                : "th"
                            } Offense`}
                      </TableCell>
                      <TableCell style={cellStylesBody.cell}>
                        {item.apprehending_officer}
                      </TableCell>
                      <TableCell style={cellStylesBody.cell}>
                        {item.penalty}
                      </TableCell>
                      <TableCell style={cellStylesBody.cell}>
                        <div className="status-container">
                          <p
                            style={{
                              flex: 1,
                              backgroundColor:
                                item.status === "Overdue"
                                  ? "#FBE7E8"
                                  : item.status === "Cleared"
                                  ? "#FEF2E5"
                                  : "#EBF9F1",
                              color:
                                item.status === "Overdue"
                                  ? "#A30D11"
                                  : item.status === "Cleared"
                                  ? "#CD6200"
                                  : "#1F9254",
                              width: 100,
                              height: 15,
                              padding: 10,
                              textAlign: "center",
                              borderRadius: 20,
                            }}
                          >
                            {editingRows[item.id] ? (
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
                                ></StatusSelection>
                              </div>
                            ) : item.status === "Overdue" ? (
                              `Overdue`
                            ) : (
                              <span>{item.status}</span>
                            )}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell className="row" style={cellStylesBody.cell}>
                        {editingRows[item.id] ? (
                          <div className="check-close">
                            <Button
                              variant="contained"
                              style={{
                                backgroundColor: "transparent",
                                boxShadow: "none",
                                color: "black",
                                marginLeft: 0,
                              }}
                              onClick={() => handleSave(item.id)}
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
                              onClick={() => handleCancelEdit(item.id)}
                            >
                              <Close style={{ height: 25 }} />
                            </Button>
                          </div>
                        ) : deletingRows[item.id] ? (
                          <>
                            <Button
                              variant="contained"
                              style={{
                                backgroundColor: "transparent",
                                boxShadow: "none",
                                color: "black",
                                marginLeft: 10,
                              }}
                              onClick={() => handleCheck(item.id)}
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
                              onClick={() => handleEdit(item.id)}
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
                      currentPage === index + 1 ? "#3e7c1f" : "#e0e0e0", // Apply green for active, yellow for inactive
                    fontSize: 20,
                  }}
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={
                    currentPage === index + 1 ? "activePage" : "inactivePage"
                  } // Apply activePage class for active, inactivePage class for inactive
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
